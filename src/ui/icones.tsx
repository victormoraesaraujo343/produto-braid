import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement> & { tamanho?: number }

const base = ({ tamanho = 16, ...p }: P) => ({
  width: tamanho, height: tamanho, viewBox: '0 0 16 16', fill: 'none',
  stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
  'aria-hidden': true, ...p,
})

export const IcoDesfazer = (p: P) => <svg {...base(p)}><path d="M5.5 4 2.5 7l3 3" /><path d="M2.5 7h7a4 4 0 0 1 0 8H8" /></svg>
export const IcoRefazer = (p: P) => <svg {...base(p)}><path d="M10.5 4l3 3-3 3" /><path d="M13.5 7h-7a4 4 0 0 0 0 8H8" /></svg>
export const IcoEntrar = (p: P) => <svg {...base(p)}><path d="M3 3h4M3 3v4M3 3l4.5 4.5" /><path d="M13 13H9M13 13V9M13 13 8.5 8.5" /></svg>
export const IcoFechar = (p: P) => <svg {...base(p)}><path d="M4 4l8 8M12 4l-8 8" /></svg>
export const IcoSeta = (p: P) => <svg {...base(p)}><path d="M6 3.5 10.5 8 6 12.5" /></svg>
export const IcoVoltar = (p: P) => <svg {...base(p)}><path d="M10 3.5 5.5 8 10 12.5" /></svg>
export const IcoBaixo = (p: P) => <svg {...base(p)}><path d="M3.5 6 8 10.5 12.5 6" /></svg>
export const IcoCima = (p: P) => <svg {...base(p)}><path d="M3.5 10 8 5.5 12.5 10" /></svg>
export const IcoLixo = (p: P) => <svg {...base(p)}><path d="M3 4.5h10M6.5 4.5V3h3v1.5M4.5 4.5l.6 8.5h5.8l.6-8.5" /></svg>
export const IcoParte = (p: P) => <svg {...base(p)}><rect x="2" y="2.5" width="12" height="11" rx="2" /><path d="M2 6h12" /></svg>
export const IcoAgrupar = (p: P) => <svg {...base(p)}><rect x="1.5" y="1.5" width="13" height="13" rx="2" strokeDasharray="2 2" /><rect x="4" y="4.5" width="4" height="3" rx=".8" /><rect x="8" y="8.5" width="4" height="3" rx=".8" /></svg>
export const IcoCopiar = (p: P) => <svg {...base(p)}><rect x="5" y="5" width="8.5" height="8.5" rx="1.5" /><path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-6A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5" /></svg>
export const IcoBaixar = (p: P) => <svg {...base(p)}><path d="M8 2.5v8M4.5 7 8 10.5 11.5 7M3 13.5h10" /></svg>
export const IcoLapis = (p: P) => <svg {...base(p)}><path d="M10.5 2.5l3 3L6 13H3v-3z" /></svg>
export const IcoBiblioteca = (p: P) => <svg {...base(p)}><path d="M2.5 2.5v11M5.5 2.5v11M8.5 3l3.5 10.5M8.5 3l2.5-.8L14.5 12.7l-2.5.8" /></svg>
export const IcoTexto = (p: P) => <svg {...base(p)}><path d="M3 3.5h10M3 6.5h10M3 9.5h10M3 12.5h6" /></svg>
export const IcoAviso = (p: P) => <svg {...base(p)}><path d="M8 2.5 14 13H2z" /><path d="M8 6.5v3M8 11.2v.1" /></svg>
export const IcoMais = (p: P) => <svg {...base(p)}><path d="M8 3v10M3 8h10" /></svg>
export const IcoMenu = (p: P) => <svg {...base(p)}><path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11" /></svg>

/** Marca: três trechos sob uma curva — a mesma narrativa no espaço e no tempo. */
export const Marca = ({ tamanho = 22 }: { tamanho?: number }) => (
  <svg width={tamanho} height={tamanho * 0.8} viewBox="0 0 25 20" aria-hidden="true">
    <path d="M1.5 12.5C5 12.5 6 7 9.5 7s4.5 5 7.5 5 4-9 6.5-10.5" fill="none" stroke="var(--fio)" strokeWidth="2" strokeLinecap="round" />
    <rect x="1" y="15" width="6.5" height="4" rx="1.2" fill="var(--i1)" />
    <rect x="9" y="15" width="5" height="4" rx="1.2" fill="var(--i3)" />
    <rect x="15.5" y="15" width="8.5" height="4" rx="1.2" fill="var(--i5)" />
  </svg>
)
