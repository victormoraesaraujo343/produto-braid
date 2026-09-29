import { useRef, useState, type ReactNode } from 'react'
import { Popover } from './Popover'
import { cls } from './util'
import { IcoBaixo, IcoCheck } from './icones'

export interface Opcao<T extends string | number> {
  valor: T
  rotulo: string
  detalhe?: string
  marca?: ReactNode
}

interface Props<T extends string | number> {
  valor: T | undefined
  opcoes: Opcao<T>[]
  onMudar: (v: T | undefined) => void
  rotulo: string
  vazio?: string
  permitirLimpar?: boolean
  prefixo?: ReactNode
  className?: string
}

/** Seletor próprio, no lugar do select do navegador: mesma linguagem visual, com descrição por opção. */
export function Seletor<T extends string | number>({ valor, opcoes, onMudar, rotulo, vazio = 'Escolher…', permitirLimpar, prefixo, className }: Props<T>) {
  const [aberto, setAberto] = useState(false)
  const [ativo, setAtivo] = useState(0)
  const botao = useRef<HTMLButtonElement>(null)
  const lista = useRef<HTMLDivElement>(null)
  const atual = opcoes.find((o) => o.valor === valor)
  const itens: (Opcao<T> | null)[] = permitirLimpar ? [null, ...opcoes] : opcoes

  const abrir = () => {
    const i = itens.findIndex((o) => (o ? o.valor === valor : valor === undefined))
    setAtivo(Math.max(0, i))
    setAberto(true)
    requestAnimationFrame(() => lista.current?.focus())
  }
  const escolher = (o: Opcao<T> | null) => {
    onMudar(o ? o.valor : undefined)
    setAberto(false)
    botao.current?.focus()
  }

  return (
    <>
      <button ref={botao} type="button" className={cls('seletor', !atual && 'vazio', className)} aria-haspopup="listbox" aria-expanded={aberto}
        aria-label={`${rotulo}: ${atual?.rotulo ?? 'nenhum'}`} onClick={() => (aberto ? setAberto(false) : abrir())}>
        {prefixo}
        {atual?.marca}
        <span className="seletor-valor">{atual?.rotulo ?? vazio}</span>
        <IcoBaixo tamanho={12} />
      </button>
      <Popover aberto={aberto} ancora={botao} onFechar={() => setAberto(false)} rotulo={rotulo} className="popover-lista">
        <div ref={lista} role="listbox" tabIndex={-1} aria-label={rotulo} className="lista"
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') { e.preventDefault(); setAtivo((a) => Math.min(itens.length - 1, a + 1)) }
            if (e.key === 'ArrowUp') { e.preventDefault(); setAtivo((a) => Math.max(0, a - 1)) }
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); escolher(itens[ativo]) }
          }}>
          {itens.map((o, i) => {
            const sel = o ? o.valor === valor : valor === undefined
            return (
              <div key={o ? String(o.valor) : '__nada'} role="option" aria-selected={sel}
                className={cls('lista-item', i === ativo && 'ativo', !o && 'lista-limpar')}
                onPointerEnter={() => setAtivo(i)} onClick={() => escolher(o)}>
                {o?.marca}
                <span className="lista-texto">
                  <span className="lista-rotulo">{o ? o.rotulo : 'Nenhuma'}</span>
                  {o?.detalhe && <span className="lista-detalhe">{o.detalhe}</span>}
                </span>
                {sel && <IcoCheck tamanho={14} className="lista-check" />}
              </div>
            )
          })}
        </div>
      </Popover>
    </>
  )
}
