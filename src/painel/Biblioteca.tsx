import { useMemo, useState } from 'react'
import { useStore } from '../model/store'
import { RAIZ, PARTE_CABECALHO, PARTE_PAD, type Doc } from '../model/tipos'
import { filhos, rotulo, tamanhoParte } from '../model/derivar'
import * as op from '../model/operacoes'
import { ESTRUTURAS } from '../biblioteca/estruturas'
import { CURVAS } from '../biblioteca/curvas'
import { FUNCOES } from '../biblioteca/funcoes'
import type { Estrutura, Fonte, ModeloCurva } from '../biblioteca/tipos'
import { avisar } from '../ui/Toasts'
import { cls, curvaSuave } from '../ui/util'
import { IcoFechar, IcoVoltar } from '../ui/icones'

const MINI_W = 120, MINI_H = 36

function MiniCurva({ pontos, grande = false }: { pontos: [number, number][]; grande?: boolean }) {
  const w = grande ? 360 : MINI_W, h = grande ? 96 : MINI_H, pad = grande ? 10 : 4
  const y = (v: number) => pad + ((5 - v) / 4) * (h - pad * 2)
  const pts = pontos.map(([p, v]) => [pad + p * (w - pad * 2), y(v)] as [number, number])
  const d = curvaSuave(pts, pad - 2, h - pad + 2)
  return (
    <svg className={cls('mini-curva', grande && 'grande')} viewBox={`0 0 ${w} ${h}`} width={w} height={h} aria-hidden="true">
      {grande && [1, 3, 5].map((n) => <line key={n} x1={0} x2={w} y1={y(n)} y2={y(n)} className="curva-guia" />)}
      <path d={`${d} L${pts.at(-1)?.[0] ?? w},${h} L${pts[0]?.[0] ?? 0},${h} Z`} className="mini-area" />
      <path d={d} className="mini-linha" />
    </svg>
  )
}

const curvaDe = (e: Estrutura) => op.curvaDaEstrutura(e)

function Fontes({ fontes }: { fontes: Fonte[] }) {
  if (!fontes.length) return null
  return (
    <ul className="bib-fontes">
      {fontes.map((f, i) => (
        <li key={i}>
          {f.url ? <a href={f.url} target="_blank" rel="noreferrer">{f.titulo}</a> : <span>{f.titulo}</span>}
          {(f.autor || f.ano) && <span className="bib-fonte-autor"> · {[f.autor, f.ano].filter(Boolean).join(', ')}</span>}
        </li>
      ))}
    </ul>
  )
}

/** Onde colocar as vagas: logo abaixo do que já existe no recipiente. */
function origemVagas(doc: Doc, recipiente: string, alturas: Record<string, number>) {
  const fs = filhos(doc, recipiente)
  const topo = recipiente === RAIZ ? 0 : PARTE_CABECALHO + 24
  if (!fs.length) return { x: recipiente === RAIZ ? 0 : PARTE_PAD, y: topo }
  const fundo = Math.max(...fs.map((f) => f.y + (f.tipo === 'parte' ? tamanhoParte(doc, f.id, alturas).h : (alturas[f.id] ?? 140))))
  const esquerda = Math.min(...fs.map((f) => f.x))
  return { x: recipiente === RAIZ ? esquerda : PARTE_PAD, y: fundo + (recipiente === RAIZ ? 120 : 32) }
}

function DetalheEstrutura({ e, voltar }: { e: Estrutura; voltar: () => void }) {
  const doc = useStore((s) => s.doc)
  const foco = useStore((s) => s.foco)
  const mudar = useStore((s) => s.mudar)
  const focar = useStore((s) => s.focar)
  const alvo = doc.nos[foco]
  const temFio = alvo.sequencia.length > 0
  const [confirmar, setConfirmar] = useState(false)

  const usar = () => {
    if (temFio && !confirmar) { setConfirmar(true); return }
    mudar((d) => op.aplicarEstrutura(d, foco, e, origemVagas(d, foco, useStore.getState().alturas)), true)
    setConfirmar(false)
    focar(foco)
    avisar(`${e.etapas.length} vagas criadas. Arraste as ideias para dentro delas.`)
  }

  return (
    <div className="bib-detalhe">
      <button className="botao-link bib-voltar" onClick={voltar}><IcoVoltar tamanho={14} /> Todas as estruturas</button>
      <h3 className="bib-nome">{e.nome}</h3>
      <p className="bib-serve">{e.serve}</p>
      <p className="bib-texto">{e.logica}</p>

      <MiniCurva pontos={curvaDe(e)} grande />

      <ol className="bib-etapas">
        {e.etapas.map((et) => {
          const f = FUNCOES.find((x) => x.id === et.ritmo)
          return (
            <li key={et.chave}>
              <div className="bib-etapa-cabeca">
                <b>{et.nome}</b>
                <span className="bib-etapa-nivel" title="Intensidade típica">{'▮'.repeat(Math.round(et.intensidade))}<span>{'▮'.repeat(5 - Math.round(et.intensidade))}</span></span>
              </div>
              <p>{et.funcao}</p>
              <p className="bib-pergunta">{et.pergunta}</p>
              {f && <p className="bib-ritmo">No ritmo: {f.nome.toLowerCase()}</p>}
            </li>
          )
        })}
      </ol>

      <h4>O mesmo esqueleto pode virar</h4>
      <ul className="bib-realizacoes">{e.realizacoes.map((r, i) => <li key={i}>{r}</li>)}</ul>

      <h4>Quando vira clichê</h4>
      <p className="bib-texto">{e.armadilha}</p>

      <h4>De onde vem</h4>
      <p className="bib-texto">{e.origem}</p>
      <Fontes fontes={e.fontes} />

      <div className="bib-rodape">
        {confirmar && <p className="bib-confirmar">O fio atual de “{rotulo(alvo, 30)}” vira estas {e.etapas.length} vagas. As ideias continuam lá, soltas, para você arrastar para dentro delas.</p>}
        <button className="botao botao-primario" onClick={usar}>
          {confirmar ? 'Confirmar' : `Usar em “${rotulo(alvo, 26)}”`}
        </button>
      </div>
    </div>
  )
}

function DetalheCurva({ c, voltar }: { c: ModeloCurva; voltar: () => void }) {
  const foco = useStore((s) => s.foco)
  const doc = useStore((s) => s.doc)
  const mudar = useStore((s) => s.mudar)
  const setUI = useStore((s) => s.setUI)
  return (
    <div className="bib-detalhe">
      <button className="botao-link bib-voltar" onClick={voltar}><IcoVoltar tamanho={14} /> Todas as curvas</button>
      <h3 className="bib-nome">{c.nome}</h3>
      <p className="bib-serve">{c.serve}</p>
      <MiniCurva pontos={c.pontos} grande />
      {c.marcos?.length ? (
        <ol className="bib-marcos">{c.marcos.map((m, i) => <li key={i}><span>{Math.round(m.em * 100)}%</span> {m.nome}</li>)}</ol>
      ) : null}
      <p className="bib-texto">{c.logica}</p>
      <h4>Quando fica mecânico</h4>
      <p className="bib-texto">{c.armadilha}</p>
      <h4>De onde vem</h4>
      <Fontes fontes={c.fontes} />
      <div className="bib-rodape">
        <p className="bib-nota">Entra como curva-alvo tracejada na timeline. Não muda o seu texto; serve para comparar e ajustar.</p>
        <button className="botao botao-primario" onClick={() => { mudar((d) => op.aplicarCurva(d, foco, c), true); setUI({ faixaAberta: true }); avisar('Curva-alvo aplicada na timeline.') }}>
          Usar como alvo em “{rotulo(doc.nos[foco], 24)}”
        </button>
      </div>
    </div>
  )
}

export function Biblioteca() {
  const aberto = useStore((s) => s.painel === 'biblioteca')
  const doc = useStore((s) => s.doc)
  const foco = useStore((s) => s.foco)
  const setUI = useStore((s) => s.setUI)
  const [aba, setAba] = useState<'estruturas' | 'curvas'>('estruturas')
  const [escala, setEscala] = useState<'todas' | 'macro' | 'micro'>('todas')
  const [sel, setSel] = useState<string | null>(null)

  const alvo = doc.nos[foco]
  const lista = useMemo(() => ESTRUTURAS.filter((e) => escala === 'todas' || e.escala === escala || e.escala === 'ambas'), [escala])

  if (!aberto) return null
  const eSel = aba === 'estruturas' ? ESTRUTURAS.find((e) => e.id === sel) : undefined
  const cSel = aba === 'curvas' ? CURVAS.find((c) => c.id === sel) : undefined

  return (
    <aside className="biblioteca" aria-label="Biblioteca de estruturas e curvas" data-lab="10">
      <header className="bib-cabeca">
        <div className="segmentado" role="tablist">
          <button role="tab" aria-selected={aba === 'estruturas'} className={cls(aba === 'estruturas' && 'on')} onClick={() => { setAba('estruturas'); setSel(null) }}>Estruturas</button>
          <button role="tab" aria-selected={aba === 'curvas'} className={cls(aba === 'curvas' && 'on')} onClick={() => { setAba('curvas'); setSel(null) }}>Curvas de ritmo</button>
        </div>
        <button className="icone-btn" onClick={() => setUI({ painel: null })} aria-label="Fechar biblioteca"><IcoFechar /></button>
      </header>

      <div className="bib-contexto">
        <span className="bib-contexto-rot">Para “{rotulo(alvo, 32)}”</span>
        {alvo.intencao.trim()
          ? <p className="bib-contexto-intencao">{alvo.intencao.trim()}</p>
          : <p className="bib-contexto-falta">Sem intenção escrita ainda. A estrutura serve a uma intenção: vale escrever a intenção primeiro, no painel da esquerda.</p>}
      </div>

      <div className="bib-corpo">
        {eSel ? <DetalheEstrutura e={eSel} voltar={() => setSel(null)} /> :
          cSel ? <DetalheCurva c={cSel} voltar={() => setSel(null)} /> :
            aba === 'estruturas' ? (
              <>
                <p className="bib-intro">Esqueletos, não fórmulas. Cada um é uma lógica para chegar a uma intenção, e o mesmo esqueleto pode virar uma frase ou um vídeo inteiro.</p>
                <div className="segmentado pequeno" role="radiogroup" aria-label="Escala">
                  {([['todas', 'Todas'], ['macro', 'Peça inteira'], ['micro', 'Dentro de uma parte']] as const).map(([v, t]) => (
                    <button key={v} role="radio" aria-checked={escala === v} className={cls(escala === v && 'on')} onClick={() => setEscala(v)}>{t}</button>
                  ))}
                </div>
                <ul className="bib-lista">
                  {lista.map((e) => (
                    <li key={e.id}>
                      <button className="bib-item" onClick={() => setSel(e.id)}>
                        <span className="bib-item-texto">
                          <b>{e.nome}</b>
                          <span className="bib-item-serve">{e.serve}</span>
                          <span className="bib-item-etapas">{e.etapas.map((et) => et.nome).join(' → ')}</span>
                        </span>
                        <MiniCurva pontos={curvaDe(e)} />
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <p className="bib-intro">Referências de ritmo para comparar com o seu texto. Picos só aparecem porque existem vales; nenhuma curva é “mais intensa é melhor”.</p>
                <ul className="bib-lista">
                  {CURVAS.map((c) => (
                    <li key={c.id}>
                      <button className="bib-item" onClick={() => setSel(c.id)}>
                        <span className="bib-item-texto">
                          <b>{c.nome}</b>
                          <span className="bib-item-serve">{c.serve}</span>
                        </span>
                        <MiniCurva pontos={c.pontos} />
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
      </div>
    </aside>
  )
}
