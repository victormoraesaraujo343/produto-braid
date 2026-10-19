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

export const IcoCheck = (p: P) => <svg {...base(p)}><path d="M3 8.5 6.5 12 13 4.5" /></svg>
export const IcoMenos = (p: P) => <svg {...base(p)}><path d="M3 8h10" /></svg>
export const IcoEnquadrar = (p: P) => <svg {...base(p)}><path d="M2.5 6V3.5a1 1 0 0 1 1-1H6M10 2.5h2.5a1 1 0 0 1 1 1V6M13.5 10v2.5a1 1 0 0 1-1 1H10M6 13.5H3.5a1 1 0 0 1-1-1V10" /></svg>
export const IcoTeclado = (p: P) => <svg {...base(p)}><rect x="1.5" y="4" width="13" height="8.5" rx="1.5" /><path d="M4 7h.01M6.5 7h.01M9 7h.01M11.5 7h.01M5 10h6" /></svg>
export const IcoCurva = (p: P) => <svg {...base(p)}><path d="M1.5 10.5C3.5 10.5 4 4 6.5 4S9 12.5 11 12.5s2-4 3.5-4" /></svg>
export const IcoRitmo = (p: P) => <svg {...base(p)}><circle cx="8" cy="8.5" r="5.5" /><path d="M8 5.5v3l2 1.5M6.5 1.5h3" /></svg>

/** Marca: três fios trançados — as ideias que viram uma peça só (o mesmo desenho do ícone do app). */
export const Marca = ({ tamanho = 22 }: { tamanho?: number }) => (
  <svg width={tamanho * 0.72} height={tamanho} viewBox="7 3.5 18 25" aria-hidden="true">
    <path d="M16.00 5.50C14.00 6.90 12.00 6.90 10.00 9.70" stroke="var(--i3)" strokeWidth="3.0" strokeLinecap="round" fill="none" />
    <path d="M22.00 5.50C22.00 6.90 24.00 6.90 22.00 9.70" stroke="var(--sinal)" strokeWidth="3.0" strokeLinecap="round" fill="none" />
    <path d="M16.00 9.70C20.00 12.50 20.00 11.10 22.00 13.90" stroke="var(--i1)" strokeWidth="3.0" strokeLinecap="round" fill="none" />
    <path d="M10.00 9.70C8.00 12.50 8.00 11.10 10.00 13.90" stroke="var(--i3)" strokeWidth="3.0" strokeLinecap="round" fill="none" />
    <path d="M22.00 13.90C24.00 16.70 24.00 15.30 22.00 18.10" stroke="var(--i1)" strokeWidth="3.0" strokeLinecap="round" fill="none" />
    <path d="M16.00 13.90C12.00 16.70 12.00 15.30 10.00 18.10" stroke="var(--sinal)" strokeWidth="3.0" strokeLinecap="round" fill="none" />
    <path d="M16.00 18.10C20.00 20.90 20.00 19.50 22.00 22.30" stroke="var(--i3)" strokeWidth="3.0" strokeLinecap="round" fill="none" />
    <path d="M10.00 18.10C8.00 20.90 8.00 19.50 10.00 22.30" stroke="var(--sinal)" strokeWidth="3.0" strokeLinecap="round" fill="none" />
    <path d="M16.00 22.30C12.00 25.10 12.00 25.10 10.00 26.50" stroke="var(--i1)" strokeWidth="3.0" strokeLinecap="round" fill="none" />
    <path d="M22.00 22.30C24.00 25.10 22.00 25.10 22.00 26.50" stroke="var(--i3)" strokeWidth="3.0" strokeLinecap="round" fill="none" />
    <path d="M10.00 5.50C12.00 6.90 12.00 6.90 16.00 9.70" stroke="var(--sup-painel)" strokeWidth="6.0" strokeLinecap="butt" fill="none" />
    <path d="M10.00 5.50C12.00 6.90 12.00 6.90 16.00 9.70" stroke="var(--i1)" strokeWidth="3.0" strokeLinecap="round" fill="none" />
    <path d="M22.00 9.70C20.00 12.50 20.00 11.10 16.00 13.90" stroke="var(--sup-painel)" strokeWidth="6.0" strokeLinecap="butt" fill="none" />
    <path d="M22.00 9.70C20.00 12.50 20.00 11.10 16.00 13.90" stroke="var(--sinal)" strokeWidth="3.0" strokeLinecap="round" fill="none" />
    <path d="M10.00 13.90C12.00 16.70 12.00 15.30 16.00 18.10" stroke="var(--sup-painel)" strokeWidth="6.0" strokeLinecap="butt" fill="none" />
    <path d="M10.00 13.90C12.00 16.70 12.00 15.30 16.00 18.10" stroke="var(--i3)" strokeWidth="3.0" strokeLinecap="round" fill="none" />
    <path d="M22.00 18.10C20.00 20.90 20.00 19.50 16.00 22.30" stroke="var(--sup-painel)" strokeWidth="6.0" strokeLinecap="butt" fill="none" />
    <path d="M22.00 18.10C20.00 20.90 20.00 19.50 16.00 22.30" stroke="var(--i1)" strokeWidth="3.0" strokeLinecap="round" fill="none" />
    <path d="M10.00 22.30C12.00 25.10 14.00 25.10 16.00 26.50" stroke="var(--sup-painel)" strokeWidth="6.0" strokeLinecap="butt" fill="none" />
    <path d="M10.00 22.30C12.00 25.10 14.00 25.10 16.00 26.50" stroke="var(--sinal)" strokeWidth="3.0" strokeLinecap="round" fill="none" />
  </svg>
)
