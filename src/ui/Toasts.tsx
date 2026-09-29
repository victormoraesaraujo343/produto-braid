import { create } from 'zustand'
import { desfazer } from '../model/store'
import { cls } from './util'

interface Toast { id: number; texto: string; desfazer: boolean }

const useToasts = create<{ lista: Toast[] }>(() => ({ lista: [] }))
let n = 0

/** Confirma uma ação na hora, com "Desfazer" à mão. */
export function avisar(texto: string, opcoes: { desfazer?: boolean } = {}) {
  const t = { id: ++n, texto, desfazer: opcoes.desfazer ?? true }
  useToasts.setState((s) => ({ lista: [...s.lista.slice(-2), t] }))
  window.setTimeout(() => useToasts.setState((s) => ({ lista: s.lista.filter((x) => x.id !== t.id) })), 4200)
}

export function Toasts() {
  const lista = useToasts((s) => s.lista)
  return (
    <div className="toasts" role="status" aria-live="polite" data-lab="9">
      {lista.map((t) => (
        <div key={t.id} className={cls('toast')}>
          <span>{t.texto}</span>
          {t.desfazer && (
            <button className="toast-acao" onClick={() => {
              desfazer()
              useToasts.setState((s) => ({ lista: s.lista.filter((x) => x.id !== t.id) }))
            }}>Desfazer</button>
          )}
        </div>
      ))}
    </div>
  )
}
