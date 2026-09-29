import { type Doc, RAIZ } from '../model/tipos'
import { ancestrais, posicaoNoFio } from '../model/derivar'

export const cls = (...xs: (string | false | null | undefined)[]) => xs.filter(Boolean).join(' ')

export const corNivel = (n: number) => `var(--i${Math.max(1, Math.min(5, Math.round(n)))})`

/** Número hierárquico no fio (ex.: 3.2.1). null quando algum nível está fora do fio. */
export function numero(doc: Doc, id: string): string | null {
  const cadeia = [...ancestrais(doc, id).filter((a) => a.id !== RAIZ).map((a) => a.id), id]
  const partes: number[] = []
  for (const c of cadeia) {
    const p = posicaoNoFio(doc, c)
    if (p < 0) return null
    partes.push(p + 1)
  }
  return partes.join('.')
}

/** Curva suave (Catmull-Rom) por pontos, com os controles contidos numa faixa vertical. */
export function curvaSuave(pts: [number, number][], ymin: number, ymax: number): string {
  if (!pts.length) return ''
  const cl = (v: number) => Math.max(ymin, Math.min(ymax, v))
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] ?? p2
    const c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = cl(p1[1] + (p2[1] - p0[1]) / 6)
    const c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = cl(p2[1] - (p3[1] - p1[1]) / 6)
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`
  }
  return d
}

export function baixarArquivo(nome: string, conteudo: string, tipo = 'text/plain') {
  const url = URL.createObjectURL(new Blob([conteudo], { type: `${tipo};charset=utf-8` }))
  const a = document.createElement('a')
  a.href = url
  a.download = nome
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export const nomeArquivo = (s: string) =>
  (s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^\w]+/g, '-').replace(/^-|-$/g, '').toLowerCase() || 'roteiro')

export const editavel = (el: EventTarget | null) =>
  el instanceof HTMLElement && !!el.closest('input, textarea, select, [contenteditable="true"]')
