import { useEffect, useRef } from 'react'
import { useStore } from '../model/store'
import { descendentes, rotulo } from '../model/derivar'
import * as op from '../model/operacoes'
import type { Doc } from '../model/tipos'

interface Opcao {
  chave: string
  texto: string
  detalhe: string
  ok: boolean
  motivo?: string
  aplicar: (d: Doc) => void
}

/** Ao ligar dois nós, a pessoa diz o que a ligação significa, em linguagem de texto. */
export function MenuLigacao() {
  const pendente = useStore((s) => s.pendente)
  const doc = useStore((s) => s.doc)
  const mudar = useStore((s) => s.mudar)
  const setUI = useStore((s) => s.setUI)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!pendente) return
    ref.current?.querySelector<HTMLButtonElement>('button:not(:disabled)')?.focus()
    const fora = (e: PointerEvent) => { if (!ref.current?.contains(e.target as Node)) setUI({ pendente: null }) }
    window.addEventListener('pointerdown', fora, true)
    return () => window.removeEventListener('pointerdown', fora, true)
  }, [pendente, setUI])

  if (!pendente) return null
  const a = doc.nos[pendente.de], b = doc.nos[pendente.para]
  if (!a || !b) return null
  const A = rotulo(a, 28), B = rotulo(b, 28)

  const opcoes: Opcao[] = [
    {
      chave: 'depois', texto: 'vem depois', detalhe: `“${B}” entra no fio logo após “${A}”`,
      ok: a.pai === b.pai,
      motivo: 'Estão em partes diferentes. A ordem entre elas vem da ordem das partes.',
      aplicar: (d) => op.ligarDepois(d, a.id, b.id),
    },
    {
      chave: 'explica', texto: 'explica', detalhe: `“${A}” explica “${B}”`, ok: true,
      aplicar: (d) => op.ligar(d, a.id, b.id, 'explica'),
    },
    {
      chave: 'fundir', texto: 'podem virar uma só', detalhe: 'Marca as duas para juntar quando quiser',
      ok: a.tipo === 'ideia' && b.tipo === 'ideia',
      motivo: 'Só ideias podem ser juntadas.',
      aplicar: (d) => op.ligar(d, a.id, b.id, 'fundir'),
    },
  ]
  if (b.tipo === 'parte') {
    opcoes.push({
      chave: 'pertence', texto: 'pertence a esta parte', detalhe: `“${A}” vai para dentro de “${B}”`,
      ok: !descendentes(doc, a.id).includes(b.id) && a.pai !== b.id,
      motivo: a.pai === b.id ? 'Já está dentro desta parte.' : 'Uma parte não pode entrar nela mesma.',
      aplicar: (d) => op.reparentar(d, a.id, b.id),
    })
  }

  const escolher = (o: Opcao) => {
    if (!o.ok) return
    mudar(o.aplicar)
    setUI({ pendente: null })
  }

  const x = Math.min(pendente.x, window.innerWidth - 300)
  const y = Math.min(pendente.y, window.innerHeight - 60 - opcoes.length * 52)

  return (
    <div ref={ref} className="menu-ligacao" style={{ left: x, top: y }} role="menu" aria-label="O que esta ligação significa?"
      onKeyDown={(e) => {
        if (e.key === 'Escape') setUI({ pendente: null })
        const i = Number(e.key) - 1
        if (opcoes[i]) escolher(opcoes[i])
      }}>
      <p className="menu-ligacao-titulo"><b>{A}</b> …</p>
      {opcoes.map((o, i) => (
        <button key={o.chave} role="menuitem" disabled={!o.ok} className="menu-ligacao-opcao"
          title={o.ok ? o.detalhe : o.motivo} onClick={() => escolher(o)}>
          <span className="menu-ligacao-tecla">{i + 1}</span>
          <span>
            <span className="menu-ligacao-texto">{o.texto}</span>
            <span className="menu-ligacao-detalhe">{o.ok ? o.detalhe : o.motivo}</span>
          </span>
        </button>
      ))}
    </div>
  )
}
