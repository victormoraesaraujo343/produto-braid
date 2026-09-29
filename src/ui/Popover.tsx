import { useEffect, useLayoutEffect, useRef, useState, type ReactNode, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import { cls } from './util'

interface Props {
  aberto: boolean
  ancora: RefObject<HTMLElement | null>
  onFechar: () => void
  lado?: 'baixo' | 'cima'
  alinhar?: 'inicio' | 'fim' | 'centro'
  className?: string
  children: ReactNode
  rotulo?: string
}

const MARGEM = 8

/** Camada flutuante presa a um elemento. Fecha com Esc ou clique fora. */
export function Popover({ aberto, ancora, onFechar, lado = 'baixo', alinhar = 'inicio', className, children, rotulo }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState<{ left: number; top: number; origem: string } | null>(null)

  useLayoutEffect(() => {
    if (!aberto) { setPos(null); return }
    const medir = () => {
      const a = ancora.current?.getBoundingClientRect()
      const el = ref.current
      if (!a || !el) return
      const w = el.offsetWidth, h = el.offsetHeight
      let left = alinhar === 'fim' ? a.right - w : alinhar === 'centro' ? a.left + a.width / 2 - w / 2 : a.left
      left = Math.max(MARGEM, Math.min(left, window.innerWidth - w - MARGEM))
      let top = lado === 'cima' ? a.top - h - 6 : a.bottom + 6
      let paraCima = lado === 'cima'
      if (!paraCima && top + h > window.innerHeight - MARGEM) { top = a.top - h - 6; paraCima = true }
      if (paraCima && top < MARGEM) { top = a.bottom + 6; paraCima = false }
      setPos({ left, top, origem: paraCima ? 'bottom' : 'top' })
    }
    medir()
    window.addEventListener('resize', medir)
    return () => window.removeEventListener('resize', medir)
  }, [aberto, ancora, lado, alinhar])

  useEffect(() => {
    if (!aberto) return
    const fora = (e: PointerEvent) => {
      const t = e.target as Node
      if (ref.current?.contains(t) || ancora.current?.contains(t)) return
      onFechar()
    }
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') { e.stopPropagation(); onFechar(); ancora.current?.focus() } }
    window.addEventListener('pointerdown', fora, true)
    window.addEventListener('keydown', esc, true)
    return () => { window.removeEventListener('pointerdown', fora, true); window.removeEventListener('keydown', esc, true) }
  }, [aberto, ancora, onFechar])

  if (!aberto) return null
  return createPortal(
    <div ref={ref} role="dialog" aria-label={rotulo}
      className={cls('popover', className)}
      style={{ left: pos?.left ?? -9999, top: pos?.top ?? -9999, transformOrigin: pos?.origem, visibility: pos ? 'visible' : 'hidden' }}>
      {children}
    </div>,
    document.body,
  )
}
