import { useRef, useState } from 'react'
import { useStore } from '../model/store'
import { RAIZ } from '../model/tipos'
import { rotulo } from '../model/derivar'
import * as op from '../model/operacoes'
import { ESTRUTURAS } from '../biblioteca/estruturas'
import { useAutoAltura } from '../ui/useAutoAltura'
import { cls } from '../ui/util'
import { IcoBaixo, IcoCima } from '../ui/icones'

/**
 * Intenção → Estrutura do nível em foco. Fica sempre à vista, porque a estrutura
 * existe a serviço da intenção, e a parte existe a serviço da intenção de cima.
 */
export function Intencao() {
  const doc = useStore((s) => s.doc)
  const foco = useStore((s) => s.foco)
  const mudar = useStore((s) => s.mudar)
  const setUI = useStore((s) => s.setUI)
  const mostrar = useStore((s) => s.mostrar)
  const [recolhido, setRecolhidoEstado] = useState(() => { try { return localStorage.getItem('montagem:intencao-recolhida') === '1' } catch { return false } })
  const setRecolhido = (v: boolean) => { setRecolhidoEstado(v); try { localStorage.setItem('montagem:intencao-recolhida', v ? '1' : '0') } catch { /* ok */ } }
  const ref = useRef<HTMLTextAreaElement>(null)

  const n = doc.nos[foco] ?? doc.nos[RAIZ]
  const pai = n.pai ? doc.nos[n.pai] : null
  const estrutura = ESTRUTURAS.find((e) => e.id === n.estruturaId)
  const etapa = n.etapa ? ESTRUTURAS.find((e) => e.id === n.etapa!.estruturaId)?.etapas.find((et) => et.chave === n.etapa!.chave) : undefined
  const ehRaiz = n.id === RAIZ

  useAutoAltura(ref, [n.intencao, recolhido, foco])

  if (recolhido) {
    return (
      <button className="intencao intencao-recolhida" onClick={() => setRecolhido(false)} aria-label="Mostrar intenção">
        <span className="intencao-rot">{ehRaiz ? 'Intenção da peça' : rotulo(n, 24)}</span>
        <span className="intencao-resumo">{n.intencao.trim() || 'ainda não escrita'}</span>
        <IcoBaixo tamanho={14} />
      </button>
    )
  }

  const vagas = n.sequencia.filter((id) => doc.nos[id]?.etapa?.estruturaId === n.estruturaId)

  return (
    <aside className="intencao" aria-label="Intenção e estrutura">
      <div className="intencao-topo">
        {ehRaiz ? (
          <span className="intencao-titulo intencao-titulo-fixo">Intenção da peça</span>
        ) : (
          <input className="intencao-titulo" value={n.titulo} placeholder={etapa?.nome ?? 'Parte sem nome'} aria-label="Nome da parte"
            onChange={(e) => { const v = e.target.value; mudar((d) => op.editar(d, n.id, { titulo: v })) }} />
        )}
        <button className="icone-btn" onClick={() => setRecolhido(true)} aria-label="Recolher"><IcoCima tamanho={14} /></button>
      </div>

      {pai && (
        <p className="intencao-serve">
          <span>Serve a</span> {pai.intencao.trim() ? `“${pai.intencao.trim()}”` : rotulo(pai)}
        </p>
      )}
      {etapa && <p className="intencao-papel"><span>Papel na estrutura</span> {etapa.funcao}</p>}

      <label className="intencao-rot" htmlFor="intencao-campo">
        {ehRaiz ? 'O que ela precisa provocar em quem assiste?' : 'O que esta parte precisa provocar?'}
      </label>
      <textarea id="intencao-campo" ref={ref} className="intencao-campo" rows={2} value={n.intencao}
        placeholder={etapa?.pergunta ?? (ehRaiz ? 'Ex.: levar o público de uma crença a outra.' : 'Ex.: fazer o público duvidar do que parecia óbvio.')}
        onChange={(e) => { const v = e.target.value; mudar((d) => op.editar(d, n.id, { intencao: v })) }} />

      <div className="intencao-estrutura">
        <span className="intencao-rot">Estrutura</span>
        {estrutura ? (
          <>
            <ol className="intencao-etapas">
              {estrutura.etapas.map((et, i) => {
                const vaga = vagas.find((v) => doc.nos[v]?.etapa?.chave === et.chave)
                return (
                  <li key={et.chave}>
                    <button className={cls('etapa-chip', !vaga && 'sem-vaga')} disabled={!vaga}
                      onClick={() => vaga && mostrar(vaga)} title={et.funcao}>
                      <b>{i + 1}</b> {et.nome}
                    </button>
                  </li>
                )
              })}
            </ol>
            <button className="botao-link" onClick={() => setUI({ painel: 'biblioteca' })}>{estrutura.nome} · trocar</button>
          </>
        ) : (
          <button className="botao-link" onClick={() => setUI({ painel: 'biblioteca' })}>
            {n.intencao.trim() ? 'Escolher uma estrutura para esta intenção' : 'Escolher estrutura (depois de escrever a intenção)'}
          </button>
        )}
      </div>
    </aside>
  )
}
