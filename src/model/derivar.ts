// Leituras do documento: funções puras, sem efeito colateral.
import { type Doc, type No, RAIZ, LARGURA_IDEIA, PARTE_MIN, PARTE_PAD, PARTE_CABECALHO } from './tipos'

export const DURACAO_MIN = 2

export function palavras(texto: string): number {
  const m = texto.trim().match(/\S+/g)
  return m ? m.length : 0
}

export function filhos(doc: Doc, id: string): No[] {
  return Object.values(doc.nos).filter((n) => n.pai === id)
}

export function ehRecipiente(n: No | undefined): boolean {
  return !!n && n.tipo === 'parte'
}

/** Ancestrais do nó, da raiz até o pai (sem o próprio nó). */
export function ancestrais(doc: Doc, id: string): No[] {
  const out: No[] = []
  let cur = doc.nos[id]?.pai
  while (cur) {
    const n = doc.nos[cur]
    if (!n) break
    out.unshift(n)
    cur = n.pai
  }
  return out
}

export function profundidade(doc: Doc, id: string): number {
  return ancestrais(doc, id).length
}

export function descendentes(doc: Doc, id: string): string[] {
  const out: string[] = []
  const pilha = [id]
  while (pilha.length) {
    const cur = pilha.pop()!
    for (const f of filhos(doc, cur)) {
      out.push(f.id)
      pilha.push(f.id)
    }
  }
  return out
}

/** Ideias na ordem final de leitura dentro de um recipiente (a montagem). */
export function leitura(doc: Doc, id: string = RAIZ, visto = new Set<string>()): string[] {
  const n = doc.nos[id]
  if (!n || visto.has(id)) return []
  visto.add(id)
  if (n.tipo === 'ideia') return [id]
  const out: string[] = []
  for (const f of n.sequencia) {
    if (doc.nos[f]?.pai !== id) continue
    out.push(...leitura(doc, f, visto))
  }
  return out
}

/** Segundos para falar a ideia, pelo número de palavras e o ritmo do documento. */
export function duracaoIdeia(doc: Doc, n: No): number {
  return palavras(n.texto) / doc.ritmo * 60
}

export function duracao(doc: Doc, id: string): number {
  return leitura(doc, id).reduce((s, f) => s + duracaoIdeia(doc, doc.nos[f]), 0)
}

/** Duração usada para desenhar: ideias vazias ainda ocupam um espaço mínimo. */
export function duracaoVisual(doc: Doc, id: string): number {
  const n = doc.nos[id]
  if (!n) return 0
  if (n.tipo === 'ideia') return Math.max(duracaoIdeia(doc, n), DURACAO_MIN)
  const itens = n.sequencia.filter((f) => doc.nos[f]?.pai === id)
  if (!itens.length) return DURACAO_MIN * 2
  return itens.reduce((s, f) => s + duracaoVisual(doc, f), 0)
}

/** Nome curto para mostrar em timeline, breadcrumb e texto final. */
export function rotulo(n: No | undefined, max = 44): string {
  if (!n) return ''
  if (n.id === RAIZ) return n.titulo.trim() || 'Roteiro sem título'
  if (n.tipo === 'parte') return n.titulo.trim() || 'Parte sem nome'
  const linha = n.texto.trim().split('\n')[0] ?? ''
  if (!linha) return 'Ideia vazia'
  return linha.length > max ? linha.slice(0, max - 1).trimEnd() + '…' : linha
}

/** Posição da parte (pai) na sequência do seu pai; -1 quando está fora do fio. */
export function posicaoNoFio(doc: Doc, id: string): number {
  const n = doc.nos[id]
  if (!n?.pai) return -1
  return doc.nos[n.pai]?.sequencia.indexOf(id) ?? -1
}

export function estaNoFio(doc: Doc, id: string): boolean {
  return posicaoNoFio(doc, id) >= 0
}

/** Posição absoluta no canvas. */
export function posAbs(doc: Doc, id: string): { x: number; y: number } {
  let x = 0, y = 0
  let cur: No | undefined = doc.nos[id]
  while (cur && cur.id !== RAIZ) {
    x += cur.x
    y += cur.y
    cur = cur.pai ? doc.nos[cur.pai] : undefined
  }
  return { x, y }
}

/** Tamanho de uma parte: o salvo ou o suficiente para caber os filhos. */
export function tamanhoParte(doc: Doc, id: string, alturas: Record<string, number> = {}): { w: number; h: number } {
  const n = doc.nos[id]
  let w = Math.max(n?.w ?? PARTE_MIN.w, PARTE_MIN.w)
  let h = Math.max(n?.h ?? PARTE_MIN.h, PARTE_MIN.h)
  for (const f of filhos(doc, id)) {
    const fw = f.tipo === 'parte' ? tamanhoParte(doc, f.id, alturas).w : LARGURA_IDEIA
    const fh = f.tipo === 'parte' ? tamanhoParte(doc, f.id, alturas).h : (alturas[f.id] ?? 120)
    w = Math.max(w, f.x + fw + PARTE_PAD)
    h = Math.max(h, f.y + fh + PARTE_PAD)
  }
  return { w, h: Math.max(h, PARTE_CABECALHO + 60) }
}

export interface Trecho {
  id: string
  inicio: number
  dur: number
  durVisual: number
  intensidade: number
}

export function trechos(doc: Doc, id: string = RAIZ): Trecho[] {
  let t = 0
  return leitura(doc, id).map((f) => {
    const n = doc.nos[f]
    const d = duracaoIdeia(doc, n)
    const tr = { id: f, inicio: t, dur: d, durVisual: Math.max(d, DURACAO_MIN), intensidade: n.intensidade }
    t += d
    return tr
  })
}

export interface AvisoRitmo {
  tipo: 'alto-demais' | 'plano' | 'sem-vale'
  de: number
  ate: number
  texto: string
}

/**
 * Lê a modulação da curva. Não mede "retenção": aponta onde falta contraste,
 * porque pico sem vale não se destaca e vale sem fim vira monotonia.
 */
export function analisarRitmo(ts: Trecho[]): AvisoRitmo[] {
  const total = ts.reduce((s, t) => s + t.dur, 0)
  if (total < 30 || ts.length < 3) return []
  const avisos: AvisoRitmo[] = []
  const limite = Math.max(45, total * 0.3)

  const corridas = (teste: (t: Trecho) => boolean) => {
    const out: { de: number; ate: number; n: number }[] = []
    let ini = -1
    ts.forEach((t, i) => {
      if (teste(t)) { if (ini < 0) ini = i }
      else if (ini >= 0) { out.push({ de: ini, ate: i - 1, n: i - ini }); ini = -1 }
    })
    if (ini >= 0) out.push({ de: ini, ate: ts.length - 1, n: ts.length - ini })
    return out
  }
  const segundos = (c: { de: number; ate: number }) => ts[c.ate].inicio + ts[c.ate].dur - ts[c.de].inicio

  for (const c of corridas((t) => t.intensidade >= 4)) {
    if (c.n >= 2 && segundos(c) >= limite) {
      avisos.push({ tipo: 'alto-demais', de: ts[c.de].inicio, ate: ts[c.ate].inicio + ts[c.ate].dur,
        texto: `${fmtTempo(segundos(c))} seguidos no alto. Sem um vale antes, o próximo pico perde força.` })
    }
  }
  for (let v = 1; v <= 5; v++) {
    for (const c of corridas((t) => Math.round(t.intensidade) === v)) {
      if (c.n >= 3 && segundos(c) >= limite && v < 4) {
        avisos.push({ tipo: 'plano', de: ts[c.de].inicio, ate: ts[c.ate].inicio + ts[c.ate].dur,
          texto: `${fmtTempo(segundos(c))} no mesmo nível. Uma variação aqui ajuda a marcar a passagem.` })
      }
    }
  }
  if (total >= 60 && !ts.some((t) => t.intensidade <= 2)) {
    avisos.push({ tipo: 'sem-vale', de: 0, ate: total,
      texto: 'Nenhum vale na peça. Os vales dão tempo para entender e preparam os picos.' })
  }
  return avisos
}

export function fmtTempo(s: number): string {
  const r = Math.round(s)
  return `${Math.floor(r / 60)}:${String(r % 60).padStart(2, '0')}`
}

/** Valor da curva-alvo numa posição 0..1 (interpolação linear). */
export function alvoEm(pontos: [number, number][], p: number): number | null {
  if (!pontos.length) return null
  if (p <= pontos[0][0]) return pontos[0][1]
  for (let i = 1; i < pontos.length; i++) {
    const [x0, y0] = pontos[i - 1], [x1, y1] = pontos[i]
    if (p <= x1) return x1 === x0 ? y1 : y0 + (y1 - y0) * ((p - x0) / (x1 - x0))
  }
  return pontos[pontos.length - 1][1]
}

// ---------- texto final ----------

export type Formato = 'corrido' | 'tempos' | 'markdown'

export interface OpcoesTexto {
  formato: Formato
  titulosPartes: boolean
  intencoes: boolean
}

export interface Secao {
  id: string
  nivel: number
  titulo: string
  intencao: string
  inicio: number
}

export interface BlocoTexto {
  tipo: 'titulo' | 'intencao' | 'texto'
  nivel: number
  texto: string
  tempo: number
  id: string
}

export interface Compilado {
  texto: string
  blocos: BlocoTexto[]
  secoes: Secao[]
  palavras: number
  duracao: number
  vagasVazias: string[]
  foraDoFio: string[]
}

export function compilar(doc: Doc, o: OpcoesTexto): Compilado {
  const raiz = doc.nos[RAIZ]
  const linhas: string[] = []
  const secoes: Secao[] = []
  const vagasVazias: string[] = []
  const blocos: BlocoTexto[] = []
  let t = 0
  let pal = 0

  const cab = (nivel: number, titulo: string) => {
    if (o.formato === 'markdown') return `${'#'.repeat(Math.min(nivel + 1, 6))} ${titulo}`
    if (o.formato === 'tempos') return `[${fmtTempo(t)}] ${titulo.toUpperCase()}`
    return titulo
  }
  const nota = (s: string) => o.formato === 'markdown' ? `> Intenção: ${s}` : `(Intenção: ${s})`

  const visitar = (id: string, nivel: number) => {
    const n = doc.nos[id]
    if (!n) return
    if (n.tipo === 'ideia') {
      const txt = n.texto.trim()
      if (!txt) return
      if (o.formato === 'tempos' && !o.titulosPartes) linhas.push(`[${fmtTempo(t)}]`)
      linhas.push(txt)
      blocos.push({ tipo: 'texto', nivel, texto: txt, tempo: t, id })
      pal += palavras(txt)
      t += duracaoIdeia(doc, n)
      return
    }
    const itens = n.sequencia.filter((f) => doc.nos[f]?.pai === id)
    if (id !== RAIZ) {
      secoes.push({ id, nivel, titulo: rotulo(n), intencao: n.intencao.trim(), inicio: t })
      if (!leitura(doc, id).some((f) => doc.nos[f].texto.trim())) vagasVazias.push(id)
      if (o.titulosPartes) { linhas.push(cab(nivel, rotulo(n))); blocos.push({ tipo: 'titulo', nivel, texto: rotulo(n), tempo: t, id }) }
      if (o.intencoes && n.intencao.trim()) { linhas.push(nota(n.intencao.trim())); blocos.push({ tipo: 'intencao', nivel, texto: n.intencao.trim(), tempo: t, id }) }
    }
    itens.forEach((f) => visitar(f, nivel + 1))
  }

  if (o.formato === 'markdown') linhas.push(`# ${rotulo(raiz)}`)
  else if (o.titulosPartes) linhas.push(rotulo(raiz).toUpperCase())
  if (o.intencoes && raiz.intencao.trim()) {
    linhas.push(nota(raiz.intencao.trim()))
    blocos.push({ tipo: 'intencao', nivel: 0, texto: raiz.intencao.trim(), tempo: 0, id: RAIZ })
  }
  visitar(RAIZ, 0)

  const noFio = new Set<string>()
  const marcar = (id: string) => {
    const n = doc.nos[id]
    if (!n) return
    noFio.add(id)
    if (n.tipo === 'parte') n.sequencia.filter((f) => doc.nos[f]?.pai === id).forEach(marcar)
  }
  marcar(RAIZ)
  const foraDoFio = Object.values(doc.nos).filter((n) => n.tipo === 'ideia' && !noFio.has(n.id) && n.texto.trim()).map((n) => n.id)

  return { texto: linhas.join('\n\n') + '\n', blocos, secoes, palavras: pal, duracao: t, vagasVazias, foraDoFio }
}
