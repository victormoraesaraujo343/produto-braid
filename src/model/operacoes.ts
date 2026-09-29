// Operações sobre o documento. Cada uma recebe um rascunho (cópia) e altera ele.
// O store faz a cópia; aqui só vivem as regras.
import { nanoid } from 'nanoid'
import { type Doc, type No, type Ligacao, type TipoLigacao, RAIZ, LARGURA_IDEIA, PARTE_MIN, PARTE_CABECALHO, PARTE_PAD } from './tipos'
import { descendentes, filhos, posAbs, tamanhoParte } from './derivar'
import type { Estrutura, ModeloCurva } from '../biblioteca/tipos'

export const novoId = () => nanoid(10)

export function noBase(p: Partial<No> & Pick<No, 'tipo' | 'pai'>): No {
  return {
    id: novoId(), x: 0, y: 0, texto: '', intensidade: 3, titulo: '', intencao: '', sequencia: [],
    ...p,
  }
}

export function docVazio(titulo = ''): Doc {
  const agora = Date.now()
  return {
    id: novoId(), ritmo: 150, ligacoes: [], criadoEm: agora, editadoEm: agora,
    nos: { [RAIZ]: noBase({ id: RAIZ, tipo: 'parte', pai: null, titulo }) },
  }
}

const tirarDe = (lista: string[], id: string) => {
  const i = lista.indexOf(id)
  if (i >= 0) lista.splice(i, 1)
  return i
}

export function criarIdeia(d: Doc, pai: string, x: number, y: number, texto = '', noFio = pai !== RAIZ): string {
  const n = noBase({ tipo: 'ideia', pai, x: Math.round(x), y: Math.round(y), texto })
  d.nos[n.id] = n
  if (noFio) d.nos[pai].sequencia.push(n.id)
  return n.id
}

export function criarParte(d: Doc, pai: string, x: number, y: number, titulo = '', extra: Partial<No> = {}): string {
  const n = noBase({ tipo: 'parte', pai, x: Math.round(x), y: Math.round(y), titulo, w: PARTE_MIN.w, h: PARTE_MIN.h, ...extra })
  d.nos[n.id] = n
  d.nos[pai].sequencia.push(n.id)
  return n.id
}

export function editar(d: Doc, id: string, patch: Partial<No>) {
  const n = d.nos[id]
  if (n) Object.assign(n, patch)
}

/** Muda o nó de recipiente, mantendo o lugar dele na tela. */
export function reparentar(d: Doc, id: string, novoPai: string): boolean {
  const n = d.nos[id]
  if (!n || !n.pai || n.pai === novoPai || id === novoPai) return false
  if (descendentes(d, id).includes(novoPai)) return false
  if (d.nos[novoPai]?.tipo !== 'parte') return false
  const abs = posAbs(d, id)
  const base = novoPai === RAIZ ? { x: 0, y: 0 } : posAbs(d, novoPai)
  tirarDe(d.nos[n.pai].sequencia, id)
  n.pai = novoPai
  n.x = Math.round(abs.x - base.x)
  n.y = Math.round(abs.y - base.y)
  // Dentro de uma parte, o conteúdo entra no fio. Na mesa (raiz), ideia solta continua solta.
  if (novoPai !== RAIZ || n.tipo === 'parte') d.nos[novoPai].sequencia.push(id)
  // Nunca deixa o conteúdo em cima do cabeçalho da parte.
  if (novoPai !== RAIZ) {
    n.x = Math.max(PARTE_PAD, n.x)
    n.y = Math.max(PARTE_CABECALHO, n.y)
  }
  return true
}

/** "B vem depois de A". Só vale entre nós do mesmo recipiente. */
export function ligarDepois(d: Doc, a: string, b: string): boolean {
  const na = d.nos[a], nb = d.nos[b]
  if (!na || !nb || a === b || na.pai !== nb.pai || !na.pai) return false
  const seq = d.nos[na.pai].sequencia
  tirarDe(seq, b)
  let i = seq.indexOf(a)
  if (i < 0) { seq.push(a); i = seq.length - 1 }
  seq.splice(i + 1, 0, b)
  return true
}

export function tirarDoFio(d: Doc, id: string) {
  const n = d.nos[id]
  if (n?.pai) tirarDe(d.nos[n.pai].sequencia, id)
}

export function inserirNoFio(d: Doc, pai: string, id: string, indice: number) {
  const n = d.nos[id]
  if (!n) return
  if (n.pai !== pai) {
    if (!reparentar(d, id, pai)) return
  }
  const seq = d.nos[pai].sequencia
  tirarDe(seq, id)
  seq.splice(Math.max(0, Math.min(indice, seq.length)), 0, id)
}

export function reordenar(d: Doc, pai: string, ordem: string[]) {
  d.nos[pai].sequencia = ordem.filter((id) => d.nos[id]?.pai === pai)
}

export function ligar(d: Doc, de: string, para: string, tipo: TipoLigacao): string | null {
  if (de === para || !d.nos[de] || !d.nos[para]) return null
  const existe = d.ligacoes.find((l) => l.tipo === tipo && ((l.de === de && l.para === para) || (l.de === para && l.para === de)))
  if (existe) return existe.id
  const l: Ligacao = { id: novoId(), de, para, tipo }
  d.ligacoes.push(l)
  return l.id
}

export function desligar(d: Doc, id: string) {
  d.ligacoes = d.ligacoes.filter((l) => l.id !== id)
}

export function apagar(d: Doc, ids: string[]) {
  const todos = new Set<string>()
  for (const id of ids) {
    if (id === RAIZ || !d.nos[id]) continue
    todos.add(id)
    descendentes(d, id).forEach((x) => todos.add(x))
  }
  for (const id of todos) {
    const n = d.nos[id]
    if (n?.pai && !todos.has(n.pai)) tirarDe(d.nos[n.pai].sequencia, id)
  }
  for (const id of todos) delete d.nos[id]
  d.ligacoes = d.ligacoes.filter((l) => !todos.has(l.de) && !todos.has(l.para))
}

/** "Essas duas ideias podem virar uma só": B entra no fim de A e deixa de existir. */
export function juntar(d: Doc, a: string, b: string): boolean {
  const na = d.nos[a], nb = d.nos[b]
  if (!na || !nb || na.tipo !== 'ideia' || nb.tipo !== 'ideia' || a === b) return false
  na.texto = [na.texto.trim(), nb.texto.trim()].filter(Boolean).join('\n\n')
  na.intensidade = Math.max(na.intensidade, nb.intensidade)
  d.ligacoes = d.ligacoes
    .filter((l) => !((l.de === a && l.para === b) || (l.de === b && l.para === a)))
    .map((l) => ({ ...l, de: l.de === b ? a : l.de, para: l.para === b ? a : l.para }))
  // Se A estava fora do fio e B dentro, A assume o lugar de B.
  if (nb.pai && na.pai === nb.pai) {
    const seq = d.nos[nb.pai].sequencia
    const ib = seq.indexOf(b)
    if (ib >= 0 && !seq.includes(a)) seq[ib] = a
  }
  apagar(d, [b])
  return true
}

/** Junta nós soltos numa parte nova, no lugar deles. */
export function agrupar(d: Doc, ids: string[], titulo = ''): string | null {
  const nos = ids.map((id) => d.nos[id]).filter(Boolean) as No[]
  if (!nos.length) return null
  const pai = nos[0].pai!
  const grupo = nos.filter((n) => n.pai === pai)
  const seqPai = d.nos[pai].sequencia
  const x0 = Math.min(...grupo.map((n) => n.x)) - PARTE_PAD
  const y0 = Math.min(...grupo.map((n) => n.y)) - PARTE_CABECALHO
  const primeiraPos = Math.min(...grupo.map((n) => seqPai.indexOf(n.id)).filter((i) => i >= 0), Infinity)
  const parte = criarParte(d, pai, x0, y0, titulo)
  tirarDe(seqPai, parte)
  const ordenados = [...grupo].sort((a, b) => {
    const ia = seqPai.indexOf(a.id), ib = seqPai.indexOf(b.id)
    if (ia >= 0 && ib >= 0) return ia - ib
    if (ia >= 0) return -1
    if (ib >= 0) return 1
    return a.x - b.x || a.y - b.y
  })
  for (const n of ordenados) {
    tirarDe(seqPai, n.id)
    n.pai = parte
    n.x -= x0
    n.y -= y0
    d.nos[parte].sequencia.push(n.id)
  }
  seqPai.splice(Number.isFinite(primeiraPos) ? Math.min(primeiraPos, seqPai.length) : seqPai.length, 0, parte)
  const t = tamanhoParte(d, parte)
  d.nos[parte].w = t.w
  d.nos[parte].h = t.h
  return parte
}

/** Uma ideia que cresceu vira parte: ganha intenção, estrutura e interior próprio. */
export function virarParte(d: Doc, id: string): string | null {
  const n = d.nos[id]
  if (!n || n.tipo !== 'ideia' || !n.pai) return null
  const pai = n.pai
  const seq = d.nos[pai].sequencia
  const i = seq.indexOf(id)
  const parte = criarParte(d, pai, n.x, n.y, '', { w: LARGURA_IDEIA + PARTE_PAD * 2 + 40 })
  tirarDe(seq, parte)
  if (i >= 0) seq[i] = parte
  else if (pai !== RAIZ) seq.push(parte)
  n.pai = parte
  n.x = PARTE_PAD
  n.y = PARTE_CABECALHO
  d.nos[parte].sequencia = [id]
  d.ligacoes = d.ligacoes.map((l) => ({ ...l, de: l.de === id ? parte : l.de, para: l.para === id ? parte : l.para }))
  return parte
}

/** Desfaz a parte: o conteúdo volta para o recipiente de cima, na mesma ordem. */
export function desfazerParte(d: Doc, id: string) {
  const p = d.nos[id]
  if (!p || p.tipo !== 'parte' || id === RAIZ || !p.pai) return
  const pai = p.pai
  const seq = d.nos[pai].sequencia
  const i = seq.indexOf(id)
  const internos = p.sequencia.filter((f) => d.nos[f]?.pai === id)
  for (const f of filhos(d, id)) {
    f.pai = pai
    f.x += p.x
    f.y += p.y
  }
  if (i >= 0) seq.splice(i, 1, ...internos)
  delete d.nos[id]
  d.ligacoes = d.ligacoes.filter((l) => l.de !== id && l.para !== id)
}

/**
 * Aplica uma estrutura a um recipiente: cria uma vaga (parte vazia) por etapa,
 * que vira o novo fio daquele nível. O que já existia fica solto ao lado,
 * esperando ser arrastado para dentro das vagas. Também sugere a curva-alvo.
 */
export function aplicarEstrutura(d: Doc, recipiente: string, e: Estrutura, origem: { x: number; y: number }): string[] {
  const r = d.nos[recipiente]
  if (!r || r.tipo !== 'parte') return []
  r.estruturaId = e.id
  // Vagas de uma estrutura anterior que ficaram vazias saem de cena.
  const antigas = filhos(d, recipiente).filter((f) => f.etapa && f.etapa.estruturaId !== e.id && descendentes(d, f.id).length === 0)
  apagar(d, antigas.map((f) => f.id))
  r.sequencia = []
  const gap = 36, w = 340, h = 240
  const ids = e.etapas.map((et, i) => {
    const id = criarParte(d, recipiente, origem.x + i * (w + gap), origem.y, et.nome, {
      etapa: { estruturaId: e.id, chave: et.chave }, w, h,
    })
    return id
  })
  r.alvo = { pontos: curvaDaEstrutura(e), origem: e.id }
  return ids
}

/** Curva sugerida por uma estrutura: um ponto no meio de cada etapa, pelo peso de cada uma. */
export function curvaDaEstrutura(e: Estrutura): [number, number][] {
  const total = e.etapas.reduce((s, et) => s + et.peso, 0) || 1
  let acc = 0
  return e.etapas.map((et) => {
    const meio = (acc + et.peso / 2) / total
    acc += et.peso
    return [Number(meio.toFixed(4)), et.intensidade] as [number, number]
  })
}

export function aplicarCurva(d: Doc, recipiente: string, m: ModeloCurva) {
  const r = d.nos[recipiente]
  if (r) r.alvo = { pontos: m.pontos.map(([p, v]) => [p, v]), origem: m.id }
}
