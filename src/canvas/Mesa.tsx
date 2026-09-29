import { useCallback, useEffect, useMemo, useRef } from 'react'
import {
  ReactFlow, Background, BackgroundVariant, MarkerType, useReactFlow, useNodesInitialized,
  type Node, type Edge, type NodeChange, type EdgeChange, type Connection, type OnConnectEnd,
} from '@xyflow/react'
import { useStore } from '../model/store'
import { RAIZ, LARGURA_IDEIA, PARTE_PAD, PARTE_CABECALHO, type Doc } from '../model/tipos'
import { descendentes, posAbs, profundidade, tamanhoParte } from '../model/derivar'
import * as op from '../model/operacoes'
import { IdeiaNo } from './IdeiaNo'
import { ParteNo } from './ParteNo'
import { Fio, Ligacao } from './Arestas'
import { faixaApi } from '../timeline/faixaApi'
import { editavel } from '../ui/util'
import { IcoAgrupar } from '../ui/icones'

const tiposNo = { ideia: IdeiaNo, parte: ParteNo }
const tiposAresta = { fio: Fio, ligacao: Ligacao }

function construirNos(doc: Doc, selecao: string[], alturas: Record<string, number>, foco: string): Node[] {
  const dentroDoFoco = foco === RAIZ ? null : new Set([foco, ...descendentes(doc, foco)])
  return Object.values(doc.nos)
    .filter((n) => n.id !== RAIZ)
    .map((n) => ({ n, prof: profundidade(doc, n.id) }))
    .sort((a, b) => a.prof - b.prof)
    .map(({ n }) => {
      const parentId = n.pai && n.pai !== RAIZ ? n.pai : undefined
      const apagado = dentroDoFoco && !dentroDoFoco.has(n.id) && !descendentes(doc, n.id).includes(foco)
      const comum = {
        id: n.id, type: n.tipo, parentId, position: { x: n.x, y: n.y }, data: {},
        selected: selecao.includes(n.id), className: apagado ? 'fora-do-foco' : undefined,
      }
      if (n.tipo === 'parte') {
        const t = tamanhoParte(doc, n.id, alturas)
        return { ...comum, dragHandle: '.parte-cabeca', style: { width: t.w, height: t.h }, width: t.w, height: t.h, measured: { width: t.w, height: t.h } }
      }
      // Tamanho provisório até a primeira medição: o cartão aparece (e recebe o cursor) na hora.
      return { ...comum, zIndex: 1, measured: { width: LARGURA_IDEIA, height: alturas[n.id] ?? 96 } }
    })
}

/** Fio entre ideias empilhadas sai por baixo e entra por cima; lado a lado, sai pela direita. */
function alcas(doc: Doc, a: string, b: string, alturas: Record<string, number>) {
  const na = doc.nos[a], nb = doc.nos[b]
  if (!na || !nb || na.pai !== nb.pai) return { sourceHandle: 's', targetHandle: 't' }
  const ha = na.tipo === 'parte' ? tamanhoParte(doc, a, alturas).h : (alturas[a] ?? 120)
  const empilhado = nb.y >= na.y + ha * 0.6 && Math.abs(nb.x - na.x) < LARGURA_IDEIA * 0.8
  return empilhado ? { sourceHandle: 'sb', targetHandle: 'tt' } : { sourceHandle: 's', targetHandle: 't' }
}

function construirArestas(doc: Doc, alturas: Record<string, number>): Edge[] {
  const out: Edge[] = []
  for (const r of Object.values(doc.nos)) {
    if (r.tipo !== 'parte') continue
    const seq = r.sequencia.filter((id) => doc.nos[id]?.pai === r.id)
    const nivel = r.id === RAIZ ? 0 : profundidade(doc, r.id) + 1
    for (let i = 0; i < seq.length - 1; i++) {
      out.push({
        id: `fio|${seq[i]}|${seq[i + 1]}`, source: seq[i], target: seq[i + 1], ...alcas(doc, seq[i], seq[i + 1], alturas),
        type: 'fio', data: { nivel }, zIndex: nivel === 0 ? 0 : 1000 + nivel,
        markerEnd: { type: MarkerType.ArrowClosed, width: 14, height: 14, color: 'var(--fio)' },
      })
    }
  }
  for (const l of doc.ligacoes) {
    out.push({
      id: `lig|${l.id}`, source: l.de, target: l.para, ...alcas(doc, l.de, l.para, alturas), type: 'ligacao',
      data: { tipo: l.tipo, ligId: l.id }, zIndex: 1100,
      markerEnd: { type: MarkerType.Arrow, width: 12, height: 12, color: 'var(--tinta-3)' },
    })
  }
  return out
}

/** Parte mais funda que contém o ponto (coordenadas do canvas), sem contar o próprio nó e seus filhos. */
function parteSob(doc: Doc, ponto: { x: number; y: number }, ignorar: Set<string>, alturas: Record<string, number>): string {
  let melhor = RAIZ, prof = -1
  for (const n of Object.values(doc.nos)) {
    if (n.tipo !== 'parte' || n.id === RAIZ || ignorar.has(n.id)) continue
    const a = posAbs(doc, n.id), t = tamanhoParte(doc, n.id, alturas)
    if (ponto.x >= a.x && ponto.x <= a.x + t.w && ponto.y >= a.y && ponto.y <= a.y + t.h) {
      const p = profundidade(doc, n.id)
      if (p > prof) { prof = p; melhor = n.id }
    }
  }
  return melhor
}

const ponteiro = (ev: MouseEvent | TouchEvent) => {
  const t = 'changedTouches' in ev ? ev.changedTouches[0] : ev
  return { clientX: t.clientX, clientY: t.clientY }
}

const sobreRet = (r: DOMRect | null, x: number, y: number) => !!r && x >= r.left && x <= r.right && y >= r.top && y <= r.bottom

export function Mesa() {
  const doc = useStore((s) => s.doc)
  const selecao = useStore((s) => s.selecao)
  const alturas = useStore((s) => s.alturas)
  const foco = useStore((s) => s.foco)
  const enquadrar = useStore((s) => s.enquadrar)
  const mudar = useStore((s) => s.mudar)
  const setUI = useStore((s) => s.setUI)
  const rf = useReactFlow()
  const ligacaoRef = useRef<Connection | null>(null)
  const inicioArraste = useRef<Record<string, { x: number; y: number }>>({})

  const nodes = useMemo(() => construirNos(doc, selecao, alturas, foco), [doc, selecao, alturas, foco])
  const iniciado = useNodesInitialized()
  const docEnquadrado = useRef<string | null>(null)
  // Ao abrir um roteiro, espera os cartões terem tamanho e enquadra a peça inteira.
  useEffect(() => {
    if (iniciado && docEnquadrado.current !== doc.id) {
      docEnquadrado.current = doc.id
      useStore.getState().focar(RAIZ)
    }
  }, [iniciado, doc.id])
  const edges = useMemo(() => construirArestas(doc, alturas), [doc, alturas])

  // Câmera: obedece aos pedidos de enquadrar (entrar numa parte, mostrar um nó),
  // descontando o espaço dos painéis que ficam por cima da mesa.
  useEffect(() => {
    if (!enquadrar) return
    const { id } = enquadrar
    const t = window.setTimeout(() => {
      const s = useStore.getState()
      const d = s.doc
      const caixa = document.querySelector('.mesa')?.getBoundingClientRect()
      if (!caixa) return
      const intencao = document.querySelector('.intencao:not(.intencao-recolhida)')?.getBoundingClientRect()
      const m = { top: 40, bottom: 40, left: intencao ? intencao.right - caixa.left + 32 : 48, right: s.painel === 'biblioteca' ? 452 : 48 }
      let ret: { x: number; y: number; width: number; height: number }
      let zMax = 1
      if (id === RAIZ || !d.nos[id]) {
        const nos = rf.getNodes()
        if (!nos.length) return
        ret = rf.getNodesBounds(nos)
      } else {
        const a = posAbs(d, id)
        const n = d.nos[id]
        const t2 = n.tipo === 'parte' ? tamanhoParte(d, id, s.alturas) : { w: LARGURA_IDEIA, h: s.alturas[id] ?? 140 }
        ret = { x: a.x, y: a.y, width: t2.w, height: t2.h }
        zMax = n.tipo === 'parte' ? 1.15 : Math.max(rf.getZoom(), 0.95)
      }
      const livreW = Math.max(200, caixa.width - m.left - m.right), livreH = Math.max(160, caixa.height - m.top - m.bottom)
      const z = Math.max(0.15, Math.min(zMax, livreW / ret.width, livreH / ret.height))
      const x = m.left + (livreW - ret.width * z) / 2 - ret.x * z
      const y = m.top + (livreH - ret.height * z) / 2 - ret.y * z
      rf.setViewport({ x, y, zoom: z }, { duration: 450 })
    }, 40)
    return () => window.clearTimeout(t)
  }, [enquadrar, rf])

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    const pos: Record<string, { x: number; y: number }> = {}
    const tamanhos: Record<string, { w: number; h: number }> = {}
    const novasAlturas: Record<string, number> = {}
    let sel: Set<string> | null = null
    const remover: string[] = []
    for (const c of changes) {
      if (c.type === 'position' && c.position) pos[c.id] = c.position
      else if (c.type === 'dimensions' && c.dimensions) {
        if (c.resizing) tamanhos[c.id] = { w: Math.round(c.dimensions.width), h: Math.round(c.dimensions.height) }
        else if (useStore.getState().doc.nos[c.id]?.tipo === 'ideia') novasAlturas[c.id] = Math.round(c.dimensions.height)
      } else if (c.type === 'select') {
        sel ??= new Set(useStore.getState().selecao)
        if (c.selected) sel.add(c.id)
        else sel.delete(c.id)
      } else if (c.type === 'remove') remover.push(c.id)
    }
    if (Object.keys(pos).length || Object.keys(tamanhos).length) {
      mudar((d) => {
        for (const [id, p] of Object.entries(pos)) {
          const n = d.nos[id]
          if (!n) continue
          n.x = Math.round(p.x)
          n.y = Math.round(p.y)
          if (n.pai && n.pai !== RAIZ) { n.x = Math.max(PARTE_PAD / 2, n.x); n.y = Math.max(PARTE_CABECALHO - 10, n.y) }
        }
        for (const [id, t] of Object.entries(tamanhos)) if (d.nos[id]) { d.nos[id].w = t.w; d.nos[id].h = t.h }
      })
    }
    if (Object.keys(novasAlturas).length) {
      const atual = useStore.getState().alturas
      if (Object.entries(novasAlturas).some(([id, h]) => atual[id] !== h)) setUI({ alturas: { ...atual, ...novasAlturas } })
    }
    if (sel) setUI({ selecao: [...sel] })
    if (remover.length) mudar((d) => op.apagar(d, remover))
  }, [mudar, setUI])

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    for (const c of changes) {
      if (c.type !== 'remove') continue
      const [tipo, a, b] = c.id.split('|')
      if (tipo === 'fio') mudar((d) => op.tirarDoFio(d, b))
      else if (tipo === 'lig') mudar((d) => op.desligar(d, a))
    }
  }, [mudar])

  const onConnect = useCallback((c: Connection) => { ligacaoRef.current = c }, [])

  const onConnectEnd: OnConnectEnd = useCallback((ev, estado) => {
    const e = 'changedTouches' in ev ? ev.changedTouches[0] : ev
    const c = ligacaoRef.current
    ligacaoRef.current = null
    if (c && c.source && c.target && c.source !== c.target) {
      setUI({ pendente: { de: c.source, para: c.target, x: e.clientX + 8, y: e.clientY + 8 } })
      return
    }
    // Soltou no vazio: cria a próxima ideia ali, já no fio.
    const alvo = ev.target as HTMLElement | null
    const de = estado.fromNode?.id
    if (!de || !alvo?.closest('.react-flow__pane')) return
    const p = rf.screenToFlowPosition({ x: e.clientX, y: e.clientY })
    let novo = ''
    mudar((d) => {
      const pai = d.nos[de]?.pai ?? RAIZ
      const base = pai === RAIZ ? { x: 0, y: 0 } : posAbs(d, pai)
      novo = op.criarIdeia(d, pai, p.x - base.x, p.y - base.y - 20, '', false)
      op.ligarDepois(d, de, novo)
    })
    setUI({ selecao: [novo], editando: novo })
  }, [mudar, setUI, rf])

  const onNodeDragStart = useCallback((_: unknown, __: Node, arrastados: Node[]) => {
    const d = useStore.getState().doc
    inicioArraste.current = Object.fromEntries(arrastados.map((n) => [n.id, { x: d.nos[n.id]?.x ?? 0, y: d.nos[n.id]?.y ?? 0 }]))
    setUI({ editando: null })
  }, [setUI])

  const onNodeDrag = useCallback((e: MouseEvent | TouchEvent, no: Node) => {
    const ev = ponteiro(e)
    const s = useStore.getState()
    const sobre = sobreRet(faixaApi.retangulo(), ev.clientX, ev.clientY)
    const p = rf.screenToFlowPosition({ x: ev.clientX, y: ev.clientY })
    const ignorar = new Set([no.id, ...descendentes(s.doc, no.id)])
    const alvo = sobre ? null : parteSob(s.doc, p, ignorar, s.alturas)
    const alvoSoltar = alvo && alvo !== RAIZ && alvo !== s.doc.nos[no.id]?.pai ? alvo : null
    if (s.sobreFaixa !== sobre || s.alvoSoltar !== alvoSoltar) setUI({ sobreFaixa: sobre, alvoSoltar })
  }, [rf, setUI])

  const onNodeDragStop = useCallback((e: MouseEvent | TouchEvent, _no: Node, arrastados: Node[]) => {
    const ev = ponteiro(e)
    const s = useStore.getState()
    setUI({ sobreFaixa: false, alvoSoltar: null })
    const ids = arrastados.map((n) => n.id).filter((id) => s.doc.nos[id])
    // Os que estão dentro de outro arrastado vão junto com ele.
    const raizes = ids.filter((id) => !ids.some((o) => o !== id && descendentes(s.doc, o).includes(id)))

    if (sobreRet(faixaApi.retangulo(), ev.clientX, ev.clientY)) {
      const indice = faixaApi.indice(ev.clientX)
      mudar((d) => {
        raizes.forEach((id, k) => {
          const volta = inicioArraste.current[id]
          if (volta) { d.nos[id].x = volta.x; d.nos[id].y = volta.y }
          op.inserirNoFio(d, s.foco, id, indice + k)
        })
      })
      return
    }
    const p = rf.screenToFlowPosition({ x: ev.clientX, y: ev.clientY })
    mudar((d) => {
      for (const id of raizes) {
        const ignorar = new Set([id, ...descendentes(d, id)])
        const alvo = parteSob(d, p, ignorar, s.alturas)
        if (alvo !== d.nos[id].pai) op.reparentar(d, id, alvo)
      }
    })
  }, [mudar, setUI, rf])

  // Dois cliques: na mesa cria uma ideia solta; dentro de uma parte, cria já no fio dela.
  const onDoubleClick = useCallback((e: React.MouseEvent) => {
    const t = e.target as HTMLElement
    if (t.closest('.react-flow__node-ideia, .parte-cabeca, .parte-intencao, .react-flow__edge, .aresta-rotulo')) return
    const naParte = t.closest('.react-flow__node-parte') as HTMLElement | null
    if (!naParte && !t.closest('.react-flow__pane')) return
    const p = rf.screenToFlowPosition({ x: e.clientX, y: e.clientY })
    let novo = ''
    mudar((d) => {
      const pai = naParte?.dataset.id && d.nos[naParte.dataset.id] ? naParte.dataset.id : RAIZ
      const base = pai === RAIZ ? { x: 0, y: 0 } : posAbs(d, pai)
      novo = op.criarIdeia(d, pai, p.x - base.x - LARGURA_IDEIA / 2, p.y - base.y - 24)
      if (pai !== RAIZ) { d.nos[novo].x = Math.max(PARTE_PAD, d.nos[novo].x); d.nos[novo].y = Math.max(PARTE_CABECALHO, d.nos[novo].y) }
    })
    setUI({ selecao: [novo], editando: novo })
  }, [mudar, rf, setUI])

  // Colar texto na mesa: cada parágrafo (ou item de lista) vira uma ideia.
  useEffect(() => {
    const colar = (e: ClipboardEvent) => {
      if (editavel(document.activeElement) || useStore.getState().painel === 'texto') return
      const txt = e.clipboardData?.getData('text/plain')?.trim()
      if (!txt) return
      e.preventDefault()
      let pedacos = txt.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean)
      if (pedacos.length === 1) pedacos = txt.split('\n').map((s) => s.replace(/^\s*([-*•]|\d+[.)])\s+/, '').trim()).filter(Boolean)
      const { foco } = useStore.getState()
      const el = document.querySelector('.mesa')?.getBoundingClientRect()
      const centro = rf.screenToFlowPosition({ x: (el?.left ?? 0) + (el?.width ?? 800) / 2, y: (el?.top ?? 0) + (el?.height ?? 600) / 3 })
      const novos: string[] = []
      mudar((d) => {
        const base = foco === RAIZ ? { x: 0, y: 0 } : posAbs(d, foco)
        const colunas = Math.min(4, pedacos.length)
        pedacos.forEach((t, i) => {
          const x = centro.x - base.x - (colunas * (LARGURA_IDEIA + 24)) / 2 + (i % colunas) * (LARGURA_IDEIA + 24)
          const y = centro.y - base.y + Math.floor(i / colunas) * 180
          novos.push(op.criarIdeia(d, foco, x, y, t))
        })
      })
      setUI({ selecao: novos })
    }
    window.addEventListener('paste', colar)
    return () => window.removeEventListener('paste', colar)
  }, [mudar, rf, setUI])

  const selecionadosMesmoPai = useMemo(() => {
    if (selecao.length < 2) return false
    const pais = new Set(selecao.map((id) => doc.nos[id]?.pai))
    return pais.size === 1
  }, [selecao, doc])

  const vazio = Object.keys(doc.nos).length === 1

  return (
    <div className="mesa">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={tiposNo}
        edgeTypes={tiposAresta}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectEnd={onConnectEnd}
        onNodeDragStart={onNodeDragStart}
        onNodeDrag={onNodeDrag}
        onNodeDragStop={onNodeDragStop}
        onDoubleClick={onDoubleClick}
        onPaneClick={() => setUI({ selecao: [], editando: null })}
        connectionMode={'loose' as never}
        zoomOnDoubleClick={false}
        deleteKeyCode={['Delete', 'Backspace']}
        multiSelectionKeyCode={['Shift', 'Meta', 'Control']}
        selectionOnDrag
        panOnDrag={[1, 2]}
        panOnScroll
        selectionMode={'partial' as never}
        minZoom={0.15}
        maxZoom={2}
        connectionRadius={36}
        connectionLineStyle={{ stroke: 'var(--fio)', strokeWidth: 2, strokeDasharray: '5 5' }}
        defaultEdgeOptions={{ interactionWidth: 16 }}
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={1.4} />
      </ReactFlow>

      {selecionadosMesmoPai && (
        <div className="barra-grupo">
          <span>{selecao.length} selecionados</span>
          <button className="barra-btn" onClick={() => {
            let g: string | null = null
            mudar((d) => { g = op.agrupar(d, selecao) })
            if (g) setUI({ selecao: [g] })
          }}><IcoAgrupar /> Agrupar em parte</button>
        </div>
      )}

      {vazio && (
        <div className="mesa-vazia">
          <p className="mesa-vazia-titulo">Comece jogando as ideias na mesa.</p>
          <p>Dê dois cliques em qualquer lugar para escrever, ou cole uma lista: cada item vira uma ideia. A ordem vem depois.</p>
        </div>
      )}
    </div>
  )
}
