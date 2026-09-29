import { useEffect, useRef, useState } from 'react'
import { useStore } from '../model/store'
import { RAIZ } from '../model/tipos'
import * as op from '../model/operacoes'
import { ESTRUTURAS } from '../biblioteca/estruturas'
import { useAutoAltura } from '../ui/useAutoAltura'
import { cls } from '../ui/util'
import { IcoCima } from '../ui/icones'
import { useVariante } from '../lab/refinamento'

/**
 * Intenção → Estrutura do nível em foco.
 * Fechada, é uma linha: a intenção que orienta tudo. Aberta, mostra a quem ela serve,
 * o papel na estrutura e as etapas. Fecha sozinha quando você volta para a mesa.
 */
export function Intencao() {
  const doc = useStore((s) => s.doc)
  const foco = useStore((s) => s.foco)
  const mudar = useStore((s) => s.mudar)
  const setUI = useStore((s) => s.setUI)
  const mostrar = useStore((s) => s.mostrar)
  const modo = useVariante('intencao')
  const [abertaLocal, setAberta] = useState(false)
  const aberta = modo === 'painel' || abertaLocal
  const caixa = useRef<HTMLElement>(null)
  const ref = useRef<HTMLTextAreaElement>(null)

  const n = doc.nos[foco] ?? doc.nos[RAIZ]
  const pai = n.pai ? doc.nos[n.pai] : null
  const estrutura = ESTRUTURAS.find((e) => e.id === n.estruturaId)
  const etapa = n.etapa ? ESTRUTURAS.find((e) => e.id === n.etapa!.estruturaId)?.etapas.find((et) => et.chave === n.etapa!.chave) : undefined
  const ehRaiz = n.id === RAIZ
  const texto = n.intencao.trim()

  useAutoAltura(ref, [n.intencao, aberta, foco])

  // Trocar de nível fecha o painel; clicar fora dele também.
  useEffect(() => { setAberta(false) }, [foco])
  useEffect(() => {
    if (!abertaLocal || modo === 'painel') return
    const fora = (e: PointerEvent) => { if (!caixa.current?.contains(e.target as Node)) setAberta(false) }
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') { e.stopPropagation(); setAberta(false) } }
    window.addEventListener('pointerdown', fora, true)
    window.addEventListener('keydown', esc, true)
    return () => { window.removeEventListener('pointerdown', fora, true); window.removeEventListener('keydown', esc, true) }
  }, [abertaLocal, modo])

  const abrir = () => {
    setAberta(true)
    requestAnimationFrame(() => { const t = ref.current; if (t) { t.focus(); t.setSelectionRange(t.value.length, t.value.length) } })
  }

  const pergunta = ehRaiz ? 'O que esta peça precisa provocar em quem assiste?' : (etapa?.pergunta ?? 'O que esta parte precisa provocar?')

  // Faixa: a intenção fica escrita sob o topo, sempre editável, com as etapas ao lado.
  if (modo === 'faixa') {
    return (
      <div className="intencao-faixa" data-lab="2">
        <span className="intencao-ponto" aria-hidden="true" />
        <textarea ref={ref} className="intencao-faixa-campo" rows={1} value={n.intencao} aria-label={pergunta} placeholder={pergunta}
          onChange={(e) => { const v = e.target.value; mudar((d) => op.editar(d, n.id, { intencao: v })) }} />
        {estrutura ? (
          <button className="intencao-faixa-estrutura" onClick={() => setUI({ painel: 'biblioteca' })} title={`${estrutura.nome} · trocar`}>
            {estrutura.etapas.map((et) => et.nome).join(' → ')}
          </button>
        ) : texto ? <button className="botao-link" onClick={() => setUI({ painel: 'biblioteca' })}>Escolher estrutura</button> : null}
      </div>
    )
  }

  if (!aberta) {
    return (
      <button data-lab="2" className={cls('intencao-linha', !texto && 'vazia')} onClick={abrir} aria-label="Abrir intenção e estrutura">
        <span className="intencao-ponto" aria-hidden="true" />
        <span className="intencao-linha-texto">{texto || pergunta}</span>
        {estrutura && <span className="intencao-linha-estrutura">{estrutura.etapas.length} etapas</span>}
      </button>
    )
  }

  const vagas = n.sequencia.filter((id) => doc.nos[id]?.etapa?.estruturaId === n.estruturaId)

  return (
    <aside ref={caixa} className="intencao" aria-label="Intenção e estrutura" data-lab="2">
      <div className="intencao-topo">
        {ehRaiz ? <span className="intencao-titulo-fixo">Intenção da peça</span> : (
          <input className="intencao-titulo" value={n.titulo} placeholder={etapa?.nome ?? 'Parte sem nome'} aria-label="Nome da parte"
            onChange={(e) => { const v = e.target.value; mudar((d) => op.editar(d, n.id, { titulo: v })) }} />
        )}
        {modo !== 'painel' && <button className="icone-btn" onClick={() => setAberta(false)} aria-label="Fechar"><IcoCima tamanho={14} /></button>}
      </div>

      <textarea id="intencao-campo" ref={ref} className="intencao-campo" rows={2} value={n.intencao}
        aria-label={pergunta} placeholder={pergunta}
        onChange={(e) => { const v = e.target.value; mudar((d) => op.editar(d, n.id, { intencao: v })) }} />

      {pai && pai.intencao.trim() && (
        <p className="intencao-serve"><span>Serve a</span>“{pai.intencao.trim()}”</p>
      )}
      {etapa && <p className="intencao-papel"><span>Papel na estrutura</span>{etapa.funcao}</p>}

      <div className="intencao-estrutura">
        {estrutura ? (
          <>
            <ol className="intencao-etapas">
              {estrutura.etapas.map((et, i) => {
                const vaga = vagas.find((v) => doc.nos[v]?.etapa?.chave === et.chave)
                return (
                  <li key={et.chave}>
                    <button className={cls('etapa-chip', !vaga && 'sem-vaga')} disabled={!vaga}
                      onClick={() => { if (vaga) { mostrar(vaga); setAberta(false) } }} title={et.funcao}>
                      <b>{i + 1}</b> {et.nome}
                    </button>
                  </li>
                )
              })}
            </ol>
            <button className="botao-link discreto" onClick={() => setUI({ painel: 'biblioteca' })}>{estrutura.nome} · trocar</button>
          </>
        ) : (
          <button className="botao-link" onClick={() => setUI({ painel: 'biblioteca' })} disabled={!texto}
            title={texto ? undefined : 'Escreva a intenção primeiro: a estrutura serve a ela.'}>
            {texto ? 'Escolher estrutura' : 'Escolher estrutura depois da intenção'}
          </button>
        )}
      </div>
    </aside>
  )
}
