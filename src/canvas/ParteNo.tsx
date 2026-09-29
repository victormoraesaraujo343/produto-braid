import { memo, useRef } from 'react'
import { Handle, NodeResizer, NodeToolbar, Position, type NodeProps } from '@xyflow/react'
import { useStore } from '../model/store'
import { duracao, filhos, fmtTempo } from '../model/derivar'
import { PARTE_MIN } from '../model/tipos'
import * as op from '../model/operacoes'
import { ESTRUTURAS } from '../biblioteca/estruturas'
import { useAutoAltura } from '../ui/useAutoAltura'
import { avisar } from '../ui/Toasts'
import { cls, numero } from '../ui/util'
import { IcoEntrar, IcoLixo } from '../ui/icones'

function ParteNoBase({ id, selected }: NodeProps) {
  const n = useStore((s) => s.doc.nos[id])
  const num = useStore((s) => numero(s.doc, id))
  const dur = useStore((s) => duracao(s.doc, id))
  const vazia = useStore((s) => filhos(s.doc, id).length === 0)
  const emFoco = useStore((s) => s.foco === id)
  const alvo = useStore((s) => s.alvoSoltar === id)
  const unico = useStore((s) => s.selecao.length === 1)
  const mudar = useStore((s) => s.mudar)
  const focar = useStore((s) => s.focar)
  const setUI = useStore((s) => s.setUI)
  const ref = useRef<HTMLTextAreaElement>(null)

  useAutoAltura(ref, [n?.intencao], 66)

  if (!n) return null
  const estrutura = ESTRUTURAS.find((e) => e.id === n.estruturaId)
  const etapa = n.etapa ? ESTRUTURAS.find((e) => e.id === n.etapa!.estruturaId)?.etapas.find((et) => et.chave === n.etapa!.chave) : undefined

  return (
    <div data-lab="4" className={cls('parte', selected && 'sel', alvo && 'alvo', emFoco && 'em-foco', !!n.etapa && 'vaga', vazia && 'vazia')}>
      <NodeResizer isVisible={selected} minWidth={PARTE_MIN.w} minHeight={PARTE_MIN.h}
        lineClassName="parte-resize-linha" handleClassName="parte-resize-alca" />
      <Handle type="target" position={Position.Left} id="t" className="alca alca-parte" />
      <div className="parte-cabeca">
        {num && <span className="parte-num">{num}</span>}
        <input
          className="parte-titulo nodrag"
          value={n.titulo}
          placeholder={etapa?.nome ?? 'Nome da parte'}
          aria-label="Nome da parte"
          onChange={(e) => { const v = e.target.value; mudar((d) => op.editar(d, id, { titulo: v })) }}
        />
        <span className="parte-dur" title="Duração estimada do que está no fio desta parte">{fmtTempo(dur)}</span>
        <button className="parte-entrar nodrag" title="Entrar nesta parte (intenção, estrutura e timeline próprias)"
          aria-label="Entrar nesta parte" onClick={() => focar(id)}>
          <IcoEntrar />
        </button>
      </div>
      <textarea
        ref={ref}
        className="parte-intencao nodrag nowheel"
        rows={1}
        value={n.intencao}
        placeholder={etapa?.pergunta ?? 'O que esta parte precisa provocar?'}
        aria-label="Intenção da parte"
        onChange={(e) => { const v = e.target.value; mudar((d) => op.editar(d, id, { intencao: v })) }}
      />
      {estrutura && (
        <div className="parte-estrutura" title={`Estrutura: ${estrutura.nome}`}>
          {estrutura.etapas.map((et) => et.nome).join('  →  ')}
        </div>
      )}
      {vazia && (
        <div className="parte-vazia">
          {etapa ? <span>{etapa.funcao}</span> : null}
          <span className="parte-vazia-acao">Arraste ideias para cá ou dê dois cliques para escrever.</span>
        </div>
      )}
      <Handle type="source" position={Position.Right} id="s" className="alca alca-parte" />
      <Handle type="source" position={Position.Bottom} id="sb" className="alca-v" isConnectable={false} />
      <Handle type="target" position={Position.Top} id="tt" className="alca-v" isConnectable={false} />

      <NodeToolbar isVisible={selected && unico} position={Position.Top} offset={10} className="barra-no">
        <button className="barra-btn" onClick={() => focar(id)}><IcoEntrar /> Entrar</button>
        <button className="barra-btn" title="Tirar a moldura e devolver as ideias para o nível de cima"
          onClick={() => { mudar((d) => op.desfazerParte(d, id), true); setUI({ selecao: [] }); avisar('Parte desfeita. As ideias voltaram para o nível de cima.') }}>
          Desfazer parte
        </button>
        <button className="barra-btn perigo" title="Apagar a parte e tudo dentro dela" aria-label="Apagar parte"
          onClick={() => { mudar((d) => op.apagar(d, [id]), true); setUI({ selecao: [] }); avisar('Parte apagada, com tudo o que tinha dentro.') }}>
          <IcoLixo />
        </button>
      </NodeToolbar>
    </div>
  )
}

export const ParteNo = memo(ParteNoBase)
