import { useLayoutEffect, type RefObject } from 'react'

/** Ajusta a altura do campo ao texto, e de novo quando as fontes terminam de carregar. */
export function useAutoAltura(ref: RefObject<HTMLTextAreaElement | null>, deps: unknown[], max = Infinity) {
  useLayoutEffect(() => {
    const ajustar = () => {
      const t = ref.current
      if (!t) return
      t.style.height = 'auto'
      t.style.height = Math.min(t.scrollHeight, max) + 'px'
    }
    ajustar()
    document.fonts?.ready.then(ajustar)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
