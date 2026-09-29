import { useEffect, useMemo, useRef, useState } from 'react'
import { useStore } from '../model/store'
import { RAIZ, type Doc } from '../model/tipos'
import {
  DURACAO_MIN, alvoEm, analisarRitmo, duracaoIdeia, filhos, fmtTempo, leitura, rotulo, trechos, type AvisoRitmo,
} from '../model/derivar'
import * as op from '../model/operacoes'
import { FUNCOES } from '../biblioteca/funcoes'
import { ESTRUTURAS } from '../biblioteca/estruturas'
import { CURVAS } from '../biblioteca/curvas'
import { Medidor } from '../canvas/IdeiaNo'
import { faixaApi } from './faixaApi'
import { cls, corNivel, curvaSuave } from '../ui/util'
import { IcoAviso, IcoBaixo, IcoCima, IcoLapis } from '../ui/icones'

const H = 112          // altura da área da curva
const PAD_Y = 14
const PAD_X = 16
const VAGA_VAZIA = DURACAO_MIN * 2
const AMOSTRAS = 48

const yNivel = (n: number) => PAD_Y + ((5 - n) / 4) * (H - PAD_Y * 2)
const nivelY = (y: number) => 5 - ((y - PAD_Y) / (H - PAD_Y * 2)) * 4

interface Item { id: string; tipo: 'ideia' | 'parte'; v0: number; v1: number; vazio: boolean; folhas: Folha[] }
interface Folha { id: string; v0: number; v1: number; t0: number; dur: number; intensidade: number; funcao?: string }

function montar(doc: Doc, foco: string) {
  const r = doc.nos[foco]
  const itens: Item[] = []
  const folhas: Folha[] = []
  let v = 0, t = 0
  for (const id of r?.sequencia ?? []) {
    const n = doc.nos[id]
    if (!n || n.pai !== foco) continue
    const ids = n.tipo === 'ideia' ? [id] : leitura(doc, id)
    const v0 = v
    const minhas: Folha[] = []
    for (const f of ids) {
      const nf = doc.nos[f]
      const dur = duracaoIdeia(doc, nf)
      const dv = Math.max(dur, DURACAO_MIN)
      const folha = { id: f, v0: v, v1: v + dv, t0: t, dur, intensidade: nf.intensidade, funcao: nf.funcao }
      minhas.push(folha)
      folhas.push(folha)
      v += dv
      t += dur
    }
    if (!ids.length) v += VAGA_VAZIA
    itens.push({ id, tipo: n.tipo, v0, v1: v, vazio: !ids.length, folhas: minhas })
  }
  return { itens, folhas, totalV: v, totalT: t }
}

export function Faixa() {
  const doc = useStore((s) => s.doc)
  const foco = useStore((s) => s.foco)
  const aberta = useStore((s) => s.faixaAberta)
  const selecao = useStore((s) => s.selecao)
  const sobreFaixa = useStore((s) => s.sobreFaixa)
  const desenho = useStore((s) => s.desenhoAlvo)
  const mudar = useStore((s) => s.mudar)
  const setUI = useStore((s) => s.setUI)
  const mostrar = useStore((s) => s.mostrar)
  const focar = useStore((s) => s.focar)

  const rolagem = useRef<HTMLDivElement>(null)
  const trilha = useRef<HTMLDivElement>(null)
  const [largura, setLargura] = useState(800)
  const [arraste, setArraste] = useState<{ id: string; indice: number; fora: boolean } | null>(null)
  const [avisoAtivo, setAvisoAtivo] = useState<AvisoRitmo | null>(null)

  useEffect(() => {
    const el = rolagem.current
    if (!el) return
    const ro = new ResizeObserver(() => setLargura(el.clientWidth))
    ro.observe(el)
    setLargura(el.clientWidth)
    return () => ro.disconnect()
  }, [aberta])

  const r = doc.nos[foco] ?? doc.nos[RAIZ]
  const { itens, folhas, totalV, totalT } = useMemo(() => montar(doc, r.id), [doc, r.id])
  const escala = totalV ? Math.min(90, Math.max(3, (largura - PAD_X * 2) / totalV)) : 4
  const W = Math.max(totalV * escala, 0)
  const larguraConteudo = Math.max(W + PAD_X * 2, largura)
  const xv = (v: number) => PAD_X + v * escala

  const xTempo = (t: number) => {
    for (const f of folhas) if (t <= f.t0 + f.dur) return xv(f.v0 + (f.dur ? ((t - f.t0) / f.dur) * (f.v1 - f.v0) : 0))
    return xv(totalV)
  }

  const avisos = useMemo(() => analisarRitmo(trechos(doc, r.id)), [doc, r.id])
  const soltas = useMemo(() => filhos(doc, r.id).filter((f) => !r.sequencia.includes(f.id)), [doc, r])
  const alvo = r.alvo?.pontos ?? null
  const origemAlvo = r.alvo?.origem
  const nomeAlvo = origemAlvo === 'desenho' ? 'desenhada por você'
    : ESTRUTURAS.find((e) => e.id === origemAlvo)?.nome ?? CURVAS.find((c) => c.id === origemAlvo)?.nome

  // A mesa usa isto para soltar ideias na faixa.
  useEffect(() => {
    faixaApi.retangulo = () => trilha.current?.getBoundingClientRect() ?? document.querySelector('.faixa-fechada')?.getBoundingClientRect() ?? null
    faixaApi.indice = (clientX, ignorar) => {
      const el = rolagem.current
      if (!el) return itens.length
      const x = clientX - el.getBoundingClientRect().left + el.scrollLeft
      return itens.filter((i) => i.id !== ignorar && xv((i.v0 + i.v1) / 2) < x).length
    }
  })

  const folhaSel = selecao.length === 1 ? folhas.find((f) => f.id === selecao[0]) : undefined
  const noSel = folhaSel ? doc.nos[folhaSel.id] : undefined

  // ---------- gestos ----------
  const arrastarClipe = (e: React.PointerEvent, item: Item) => {
    if (e.button !== 0) return
    const sx = e.clientX, sy = e.clientY
    let ativo = false
    const topo = trilha.current?.getBoundingClientRect().top ?? 0
    const mv = (ev: PointerEvent) => {
      if (!ativo && Math.hypot(ev.clientX - sx, ev.clientY - sy) < 5) return
      ativo = true
      const fora = ev.clientY < topo - 30
      setArraste({ id: item.id, indice: faixaApi.indice(ev.clientX, item.id), fora })
    }
    const up = (ev: PointerEvent) => {
      window.removeEventListener('pointermove', mv)
      window.removeEventListener('pointerup', up)
      setArraste(null)
      if (!ativo) { mostrar(item.id); return }
      if (ev.clientY < topo - 30) { mudar((d) => op.tirarDoFio(d, item.id)); return }
      const i = faixaApi.indice(ev.clientX, item.id)
      mudar((d) => op.inserirNoFio(d, r.id, item.id, i))
    }
    window.addEventListener('pointermove', mv)
    window.addEventListener('pointerup', up)
  }

  const arrastarPonto = (e: React.PointerEvent, f: Folha) => {
    e.stopPropagation()
    const svg = (e.currentTarget as SVGElement).ownerSVGElement!
    const topo = svg.getBoundingClientRect().top
    let moveu = false
    const mv = (ev: PointerEvent) => {
      const n = Math.max(1, Math.min(5, Math.round(nivelY(ev.clientY - topo))))
      if (n !== useStore.getState().doc.nos[f.id]?.intensidade) {
        moveu = true
        mudar((d) => op.editar(d, f.id, { intensidade: n }))
      }
    }
    const up = () => {
      window.removeEventListener('pointermove', mv)
      window.removeEventListener('pointerup', up)
      if (!moveu) mostrar(f.id)
      else setUI({ selecao: [f.id] })
    }
    window.addEventListener('pointermove', mv)
    window.addEventListener('pointerup', up)
  }

  const desenhar = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!desenho || !W) return
    e.preventDefault()
    const ret = e.currentTarget.getBoundingClientRect()
    const base: number[] = Array.from({ length: AMOSTRAS }, (_, i) => alvo ? alvoEm(alvo, i / (AMOSTRAS - 1)) ?? 3 : 3)
    let ult: [number, number] | null = null
    const marcar = (ev: PointerEvent | React.PointerEvent) => {
      const x = Math.max(0, Math.min(W, ev.clientX - ret.left - PAD_X))
      const v = Math.max(1, Math.min(5, nivelY(ev.clientY - ret.top)))
      const i = Math.round((x / W) * (AMOSTRAS - 1))
      if (ult) {
        const [i0, v0] = ult, passo = i > i0 ? 1 : -1
        for (let k = i0; k !== i; k += passo) base[k] = v0 + (v - v0) * ((k - i0) / (i - i0))
      }
      base[i] = v
      ult = [i, v]
      const pontos = base.map((val, k) => [Number((k / (AMOSTRAS - 1)).toFixed(4)), Number(val.toFixed(2))] as [number, number])
      mudar((d) => { d.nos[r.id].alvo = { pontos, origem: 'desenho' } })
    }
    marcar(e)
    const up = () => { window.removeEventListener('pointermove', marcar); window.removeEventListener('pointerup', up) }
    window.addEventListener('pointermove', marcar)
    window.addEventListener('pointerup', up)
  }

  // ---------- desenho ----------
  const pts: [number, number][] = folhas.map((f) => [xv((f.v0 + f.v1) / 2), yNivel(f.intensidade)])
  const linha = pts.length ? curvaSuave([[xv(0), pts[0][1]], ...pts, [xv(totalV), pts[pts.length - 1][1]]], PAD_Y - 4, H - PAD_Y + 4) : ''
  const alvoPath = alvo && W ? curvaSuave(alvo.map(([p, v]) => [xv(p * totalV), yNivel(v)]), PAD_Y - 4, H - PAD_Y + 4) : ''
  const passos = [5, 10, 15, 30, 60, 120, 300, 600]
  const passo = passos.find((p) => p * escala >= 70) ?? 900
  const marcas: number[] = []
  for (let t = 0; t <= totalT && folhas.length; t += passo) marcas.push(t)

  const titulo = r.id === RAIZ ? 'A peça inteira' : rotulo(r)

  if (!aberta) {
    return (
      <section className={cls('faixa faixa-fechada', sobreFaixa && 'receber')} aria-label="Timeline (fechada)">
        <button className="faixa-alternar" onClick={() => setUI({ faixaAberta: true })} aria-label="Abrir timeline"><IcoCima /></button>
        <span className="faixa-titulo">Timeline <span className="faixa-nivel">{titulo}</span></span>
        <svg className="faixa-mini" viewBox={`0 0 ${Math.max(larguraConteudo, 1)} ${H}`} preserveAspectRatio="none" aria-hidden="true">
          {linha && <path d={linha} className="curva-real" vectorEffect="non-scaling-stroke" />}
        </svg>
        <span className="faixa-total">{fmtTempo(totalT)}</span>
      </section>
    )
  }

  return (
    <section className={cls('faixa', sobreFaixa && 'receber')} aria-label="Timeline">
      <header className="faixa-cabeca">
        <button className="faixa-alternar" onClick={() => setUI({ faixaAberta: false })} aria-label="Fechar timeline"><IcoBaixo /></button>
        <span className="faixa-titulo">Timeline <span className="faixa-nivel">{titulo}</span></span>
        <span className="faixa-total" title="Duração estimada pelo número de palavras">{fmtTempo(totalT)}</span>

        {noSel && folhaSel ? (
          <div className="faixa-sel">
            <span className="faixa-sel-nome">{rotulo(noSel, 30)}</span>
            <Medidor valor={noSel.intensidade} onChange={(v) => mudar((d) => op.editar(d, noSel.id, { intensidade: v }))} />
            <select className="barra-select" aria-label="Função no ritmo" value={noSel.funcao ?? ''}
              onChange={(e) => { const v = e.target.value || undefined; mudar((d) => op.editar(d, noSel.id, { funcao: v })) }}>
              <option value="">Função no ritmo…</option>
              {FUNCOES.map((f) => <option key={f.id} value={f.id}>{f.nome}</option>)}
            </select>
          </div>
        ) : avisos.length ? (
          <button className="faixa-aviso" onMouseEnter={() => setAvisoAtivo(avisos[0])} onMouseLeave={() => setAvisoAtivo(null)}
            onFocus={() => setAvisoAtivo(avisos[0])} onBlur={() => setAvisoAtivo(null)}>
            <IcoAviso tamanho={14} /> {avisos[0].texto}{avisos.length > 1 ? ` (+${avisos.length - 1})` : ''}
          </button>
        ) : <span className="faixa-dica">Arraste um ponto da curva para mudar a intensidade. Arraste um trecho para mudar a ordem.</span>}

        <div className="faixa-alvo">
          {alvo ? <span className="faixa-alvo-nome" title="Curva-alvo: a intenção de ritmo, para comparar com o texto">Alvo: {nomeAlvo ?? 'curva'}</span> : null}
          <button className={cls('botao-mini', desenho && 'ativo')} aria-pressed={desenho}
            title="Desenhe por cima da curva o ritmo que você quer" onClick={() => setUI({ desenhoAlvo: !desenho })}>
            <IcoLapis tamanho={13} /> {desenho ? 'Desenhando' : 'Desenhar alvo'}
          </button>
          {alvo && <button className="botao-mini" onClick={() => mudar((d) => { delete d.nos[r.id].alvo })}>Limpar</button>}
          <label className="faixa-ritmo">
            <span>Ritmo</span>
            <select value={doc.ritmo} onChange={(e) => { const v = Number(e.target.value); mudar((d) => { d.ritmo = v }) }}
              title="Palavras por minuto: define a duração estimada">
              <option value={120}>120 p/min (pausado)</option>
              <option value={150}>150 p/min (fala)</option>
              <option value={180}>180 p/min (rápido)</option>
              <option value={230}>230 p/min (leitura)</option>
            </select>
          </label>
        </div>
      </header>

      <div className="faixa-rolagem" ref={rolagem}>
        <div className="faixa-conteudo" style={{ width: larguraConteudo }}>
          <div className="faixa-regua" aria-hidden="true">
            {marcas.map((t) => <span key={t} style={{ left: xTempo(t) }}>{fmtTempo(t)}</span>)}
          </div>

          <svg className={cls('faixa-curva', desenho && 'desenhando')} width={larguraConteudo} height={H} onPointerDown={desenhar}
            role="img" aria-label="Curva de intensidade ao longo do tempo">
            <defs>
              <linearGradient id="energia" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" style={{ stopColor: 'var(--i5)', stopOpacity: 0.26 }} />
                <stop offset="0.5" style={{ stopColor: 'var(--i3)', stopOpacity: 0.14 }} />
                <stop offset="1" style={{ stopColor: 'var(--i1)', stopOpacity: 0.06 }} />
              </linearGradient>
              <pattern id="hachura" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="6" style={{ stroke: 'var(--aviso)', strokeWidth: 1.2, strokeOpacity: 0.35 }} />
              </pattern>
            </defs>
            {[1, 3, 5].map((n) => <line key={n} className="curva-guia" x1={0} x2={larguraConteudo} y1={yNivel(n)} y2={yNivel(n)} />)}
            <text className="curva-guia-rot" x={4} y={yNivel(5) - 4}>pico</text>
            <text className="curva-guia-rot" x={4} y={yNivel(1) + 11}>vale</text>
            {avisoAtivo && avisoAtivo.tipo !== 'sem-vale' && (
              <rect x={xTempo(avisoAtivo.de)} y={0} width={Math.max(4, xTempo(avisoAtivo.ate) - xTempo(avisoAtivo.de))} height={H} fill="url(#hachura)" />
            )}
            {itens.map((i) => i.tipo === 'parte' && (
              <line key={i.id} className="curva-divisa" x1={xv(i.v0)} x2={xv(i.v0)} y1={0} y2={H} />
            ))}
            {linha && <path d={`${linha} L${xv(totalV)},${H} L${xv(0)},${H} Z`} fill="url(#energia)" />}
            {alvoPath && <path d={alvoPath} className="curva-alvo" />}
            {linha && <path d={linha} className="curva-real" />}
            {alvo && folhas.map((f) => {
              const a = alvoEm(alvo, ((f.v0 + f.v1) / 2) / (totalV || 1))
              if (a == null || Math.abs(a - f.intensidade) < 1.5) return null
              const x = xv((f.v0 + f.v1) / 2)
              return <line key={`d${f.id}`} className="curva-desvio" x1={x} x2={x} y1={yNivel(f.intensidade)} y2={yNivel(a)}>
                <title>O texto está em {f.intensidade}; o alvo aqui é {a.toFixed(1)}.</title>
              </line>
            })}
            {folhas.map((f) => {
              const x = xv((f.v0 + f.v1) / 2), y = yNivel(f.intensidade)
              const sel = selecao.includes(f.id)
              const fn = FUNCOES.find((k) => k.id === f.funcao)
              return (
                <g key={f.id} className={cls('curva-ponto', sel && 'sel')} onPointerDown={(e) => arrastarPonto(e, f)}>
                  <title>{rotulo(doc.nos[f.id])} · intensidade {f.intensidade}{fn ? ` · ${fn.nome}` : ''}. Arraste para cima ou para baixo.</title>
                  <circle cx={x} cy={y} r={14} className="curva-ponto-alvo" />
                  <circle cx={x} cy={y} r={sel ? 6.5 : 5} className="curva-ponto-vis" style={{ stroke: corNivel(f.intensidade) }} />
                  {fn && (f.v1 - f.v0) * escala > 58 && <text x={x} y={H - 3} textAnchor="middle" className="curva-funcao">{fn.nome}</text>}
                </g>
              )
            })}
          </svg>

          <div className="faixa-trilha" ref={trilha}>
            {!itens.length && (
              <div className="faixa-vazia">
                {r.id === RAIZ
                  ? 'Nada no fio ainda. Ligue ideias com “vem depois”, crie partes, ou arraste ideias da mesa para cá.'
                  : 'Esta parte ainda não tem nada no fio. Arraste ideias para dentro dela ou para cá.'}
              </div>
            )}
            {itens.map((i, k) => {
              const n = doc.nos[i.id]
              const x0 = xv(i.v0), w = Math.max((i.v1 - i.v0) * escala - 3, 10)
              const media = i.folhas.length ? i.folhas.reduce((s, f) => s + f.intensidade, 0) / i.folhas.length : 3
              return (
                <div key={i.id}
                  className={cls('clipe', `clipe-${i.tipo}`, i.vazio && 'clipe-vazio', selecao.includes(i.id) && 'sel', arraste?.id === i.id && 'arrastando')}
                  style={{ left: x0 + 1, width: w, ['--iN' as string]: corNivel(media) }}
                  tabIndex={0}
                  title={`${rotulo(n)} · começa em ${fmtTempo(i.folhas[0]?.t0 ?? 0)} · ${fmtTempo(i.folhas.reduce((s, f) => s + f.dur, 0))}${i.tipo === 'parte' ? ' · dois cliques para entrar' : ''}`}
                  onPointerDown={(e) => arrastarClipe(e, i)}
                  onDoubleClick={() => i.tipo === 'parte' && focar(i.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') { if (i.tipo === 'parte') focar(i.id); else mostrar(i.id) }
                    if (e.altKey && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
                      e.preventDefault()
                      mudar((d) => op.inserirNoFio(d, r.id, i.id, k + (e.key === 'ArrowLeft' ? -1 : 1)))
                    }
                  }}
                >
                  <span className="clipe-nome"><b>{k + 1}</b> {rotulo(n)}</span>
                  <span className="clipe-dur">{i.vazio ? 'vaga vazia' : fmtTempo(i.folhas.reduce((s, f) => s + f.dur, 0))}</span>
                  {i.tipo === 'parte' && i.folhas.length > 0 && (
                    <span className="clipe-dna" aria-hidden="true">
                      {i.folhas.map((f) => <i key={f.id} style={{ flexGrow: f.v1 - f.v0, background: corNivel(f.intensidade) }} />)}
                    </span>
                  )}
                </div>
              )
            })}
            {arraste && !arraste.fora && (
              <div className="faixa-marcador" style={{ left: (() => {
                const lista = itens.filter((i) => i.id !== arraste.id)
                if (!lista.length) return xv(0)
                if (arraste.indice >= lista.length) return xv(lista[lista.length - 1].v1)
                return xv(lista[arraste.indice].v0)
              })() - 1 }} />
            )}
          </div>
        </div>
      </div>

      {(arraste?.fora || soltas.length > 0) && (
        <footer className="faixa-pe">
          {arraste?.fora ? <span className="faixa-pe-aviso">Solte para tirar do fio. A ideia continua na mesa.</span> : (
            <button className="botao-mini" onClick={() => setUI({ selecao: soltas.map((s) => s.id) })}>
              {soltas.length} {soltas.length === 1 ? 'ideia' : 'ideias'} {r.id === RAIZ ? 'na mesa' : 'nesta parte'} fora do fio · mostrar
            </button>
          )}
        </footer>
      )}
    </section>
  )
}
