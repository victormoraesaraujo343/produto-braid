import { memo, useEffect, useRef } from 'react'
import { Handle, NodeToolbar, Position, type NodeProps } from '@xyflow/react'
import { useStore } from '../model/store'
import { RAIZ } from '../model/tipos'
import { fmtTempo, palavras, estaNoFio } from '../model/derivar'
import * as op from '../model/operacoes'
import { FUNCOES } from '../biblioteca/funcoes'
import { useAutoAltura } from '../ui/useAutoAltura'
import { Seletor } from '../ui/Seletor'
import { avisar } from '../ui/Toasts'
import { cls, corNivel, numero } from '../ui/util'
import { IcoLixo, IcoParte } from '../ui/icones'

const NIVEIS = ['', 'vale', 'baixo', 'médio', 'alto', 'pico']

export const Medidor = ({ valor, onChange, rotulo = 'Intensidade' }: { valor: number; onChange: (n: number) => void; rotulo?: string }) => (
  <div className="medidor" role="radiogroup" aria-label={rotulo} title={`${rotulo}: ${NIVEIS[Math.round(valor)]}`}>
    {[1, 2, 3, 4, 5].map((n) => (
      <button key={n} type="button" role="radio" aria-checked={Math.round(valor) === n}
        aria-label={`${rotulo} ${n} de 5 (${NIVEIS[n]})`}
        className={cls('medidor-barra', n <= Math.round(valor) && 'on')}
        style={{ ['--h' as string]: `${5 + n * 3}px`, ['--c' as string]: corNivel(n) }}
        onClick={(e) => { e.stopPropagation(); onChange(n) }} />
    ))}
  </div>
)

export const OPCOES_FUNCAO = FUNCOES.map((f) => ({
  valor: f.id, rotulo: f.nome, detalhe: f.descricao,
  marca: <span className="lista-faixa" style={{ ['--c' as string]: corNivel((f.faixa[0] + f.faixa[1]) / 2) }} />,
}))

function IdeiaNoBase({ id, selected }: NodeProps) {
  const n = useStore((s) => s.doc.nos[id])
  const num = useStore((s) => numero(s.doc, id))
  const noFio = useStore((s) => estaNoFio(s.doc, id))
  const ritmo = useStore((s) => s.doc.ritmo)
  const editando = useStore((s) => s.editando === id)
  const unico = useStore((s) => s.selecao.length === 1)
  const mudar = useStore((s) => s.mudar)
  const setUI = useStore((s) => s.setUI)
  const ref = useRef<HTMLTextAreaElement>(null)

  useAutoAltura(ref, [n?.texto, editando])

  // O cartão recém-criado só fica visível depois de medido; tenta focar até conseguir.
  useEffect(() => {
    if (!editando) return
    let tentativas = 0, raf = 0
    const focar = () => {
      const t = ref.current
      if (t) {
        t.focus()
        if (document.activeElement === t) { t.setSelectionRange(t.value.length, t.value.length); return }
      }
      if (++tentativas < 30) raf = requestAnimationFrame(focar)
    }
    focar()
    return () => cancelAnimationFrame(raf)
  }, [editando])

  if (!n) return null
  const p = palavras(n.texto)
  const funcao = FUNCOES.find((f) => f.id === n.funcao)

  const novaDepois = () => {
    let novo = ''
    mudar((d) => {
      const pai = d.nos[id].pai ?? RAIZ
      const altura = useStore.getState().alturas[id] ?? 120
      novo = op.criarIdeia(d, pai, d.nos[id].x, d.nos[id].y + altura + 28, '', false)
      if (d.nos[pai].sequencia.includes(id) || pai !== RAIZ) op.ligarDepois(d, id, novo)
    }, true)
    setUI({ editando: novo, selecao: [novo] })
  }

  return (
    <div
      data-lab="3"
      className={cls('ideia', selected && 'sel', !noFio && 'solta', editando && 'editando', !n.texto.trim() && 'vazia')}
      style={{ ['--iN' as string]: corNivel(n.intensidade) }}
      // Barra e menus são desenhados fora do cartão, mas os eventos deles sobem pela árvore do React até aqui.
      onDoubleClick={(e) => { if (!e.currentTarget.contains(e.target as Node)) return; e.stopPropagation(); setUI({ editando: id }) }}
      onClick={(e) => { if (e.currentTarget.contains(e.target as Node) && selected && !editando) setUI({ editando: id }) }}
    >
      <Handle type="target" position={Position.Left} id="t" className="alca" />
      {(num || funcao) && (
        <div className="ideia-topo">
          {num && <span className="ideia-num" title="Posição na ordem de leitura">{num}</span>}
          {funcao && <span className="ideia-funcao">{funcao.nome}</span>}
        </div>
      )}
      {editando ? (
        <textarea
          ref={ref}
          className="ideia-texto nodrag nowheel"
          value={n.texto}
          rows={1}
          placeholder="Escreva a ideia…"
          aria-label="Texto da ideia"
          onChange={(e) => { const v = e.target.value; mudar((d) => op.editar(d, id, { texto: v })) }}
          onBlur={() => setUI({ editando: null })}
          onKeyDown={(e) => {
            if (e.key === 'Escape') { e.preventDefault(); (e.target as HTMLTextAreaElement).blur() }
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); novaDepois() }
          }}
        />
      ) : (
        <p className={cls('ideia-texto', !n.texto.trim() && 'placeholder')}>{n.texto.trim() || 'Ideia vazia'}</p>
      )}
      <div className="ideia-rodape">
        <span className="ideia-nivel" aria-hidden="true">
          {[1, 2, 3, 4, 5].map((k) => <i key={k} className={k <= n.intensidade ? 'on' : ''} />)}
        </span>
        <span className="ideia-meta">{p} {p === 1 ? 'palavra' : 'palavras'} · {fmtTempo(p / ritmo * 60)}</span>
      </div>
      <Handle type="source" position={Position.Right} id="s" className="alca" />
      <Handle type="source" position={Position.Bottom} id="sb" className="alca-v" isConnectable={false} />
      <Handle type="target" position={Position.Top} id="tt" className="alca-v" isConnectable={false} />

      <NodeToolbar isVisible={selected && unico && !editando} position={Position.Top} offset={10} className="barra-no">
        <Medidor valor={n.intensidade} onChange={(v) => mudar((d) => op.editar(d, id, { intensidade: v }), true)} />
        <span className="barra-sep" />
        <Seletor rotulo="Função no ritmo" vazio="Função no ritmo" valor={n.funcao} opcoes={OPCOES_FUNCAO} permitirLimpar
          onMudar={(v) => mudar((d) => op.editar(d, id, { funcao: v }), true)} />
        <span className="barra-sep" />
        <button className="barra-btn" title="Transformar em parte, com intenção e estrutura próprias"
          onClick={() => {
            let np: string | null = null
            mudar((d) => { np = op.virarParte(d, id) }, true)
            if (np) { setUI({ selecao: [np] }); avisar('Virou parte. Dê um nome e uma intenção.') }
          }}>
          <IcoParte /> Virar parte
        </button>
        <button className="barra-btn perigo" title="Apagar ideia" aria-label="Apagar ideia"
          onClick={() => { mudar((d) => op.apagar(d, [id]), true); setUI({ selecao: [] }); avisar('Ideia apagada.') }}>
          <IcoLixo />
        </button>
      </NodeToolbar>
    </div>
  )
}

export const IdeiaNo = memo(IdeiaNoBase)
