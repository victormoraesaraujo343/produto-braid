import { useEffect, useRef, useState } from 'react'
import { useStore as useZustand } from 'zustand'
import { useStore, desfazer, refazer, trocarPara, novoRoteiro, apagarRoteiro, importarRoteiro } from '../model/store'
import { RAIZ } from '../model/tipos'
import { ancestrais, rotulo } from '../model/derivar'
import { baixarArquivo, cls, nomeArquivo } from '../ui/util'
import { IcoBaixo, IcoBiblioteca, IcoDesfazer, IcoRefazer, IcoSeta, IcoTexto, Marca } from '../ui/icones'

type Tema = 'sistema' | 'claro' | 'escuro'

function lerTema(): Tema {
  try { return (localStorage.getItem('montagem:tema') as Tema) || 'sistema' } catch { return 'sistema' }
}
export function aplicarTema(t: Tema) {
  const r = document.documentElement
  if (t === 'sistema') r.removeAttribute('data-theme')
  else r.setAttribute('data-theme', t === 'claro' ? 'light' : 'dark')
  try { localStorage.setItem('montagem:tema', t) } catch { /* sem armazenamento */ }
}

function MenuRoteiros({ fechar }: { fechar: () => void }) {
  const lista = useStore((s) => s.lista)
  const doc = useStore((s) => s.doc)
  const [confirmar, setConfirmar] = useState(false)
  const [tema, setTema] = useState<Tema>(lerTema)
  const [erro, setErro] = useState('')
  const arquivo = useRef<HTMLInputElement>(null)

  return (
    <div className="menu-roteiros" role="menu">
      <p className="menu-secao">Seus roteiros</p>
      <ul className="menu-lista">
        {lista.map((i) => (
          <li key={i.id}>
            <button className={cls('menu-item', i.id === doc.id && 'atual')} role="menuitem"
              onClick={async () => { await trocarPara(i.id); fechar() }}>
              <span>{i.titulo}</span>
              <span className="menu-item-data">{new Date(i.editadoEm).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="menu-acoes">
        <button className="menu-item" role="menuitem" onClick={async () => { await novoRoteiro(); fechar() }}>Novo roteiro em branco</button>
        <button className="menu-item" role="menuitem" onClick={async () => { await novoRoteiro(true); fechar() }}>Novo roteiro com o exemplo</button>
      </div>
      <div className="menu-acoes">
        <button className="menu-item" role="menuitem"
          onClick={() => { baixarArquivo(`${nomeArquivo(rotulo(doc.nos[RAIZ]))}.braid.json`, JSON.stringify(doc, null, 2), 'application/json'); fechar() }}>
          Salvar cópia em arquivo
        </button>
        <button className="menu-item" role="menuitem" onClick={() => arquivo.current?.click()}>Abrir arquivo…</button>
        <input ref={arquivo} type="file" accept=".json,application/json" hidden onChange={async (e) => {
          const f = e.target.files?.[0]
          if (!f) return
          const ok = await importarRoteiro(await f.text())
          if (ok) fechar()
          else setErro('Esse arquivo não é um roteiro do Braid.')
        }} />
        {erro && <p className="menu-erro">{erro}</p>}
      </div>
      <div className="menu-acoes">
        <p className="menu-secao">Aparência</p>
        <div className="segmentado" role="radiogroup" aria-label="Aparência">
          {(['sistema', 'claro', 'escuro'] as Tema[]).map((t) => (
            <button key={t} role="radio" aria-checked={tema === t} className={cls(tema === t && 'on')}
              onClick={() => { setTema(t); aplicarTema(t) }}>
              {t === 'sistema' ? 'Sistema' : t === 'claro' ? 'Claro' : 'Escuro'}
            </button>
          ))}
        </div>
      </div>
      <div className="menu-acoes">
        <button className={cls('menu-item perigo', confirmar && 'confirmar')} role="menuitem"
          onClick={async () => {
            if (!confirmar) { setConfirmar(true); return }
            await apagarRoteiro(doc.id)
            fechar()
          }}>
          {confirmar ? 'Clique de novo para apagar de vez' : 'Apagar este roteiro'}
        </button>
      </div>
    </div>
  )
}

export function BarraTopo() {
  const doc = useStore((s) => s.doc)
  const foco = useStore((s) => s.foco)
  const painel = useStore((s) => s.painel)
  const focar = useStore((s) => s.focar)
  const setUI = useStore((s) => s.setUI)
  const mudar = useStore((s) => s.mudar)
  const podeDesfazer = useZustand(useStore.temporal, (s) => s.pastStates.length > 0)
  const podeRefazer = useZustand(useStore.temporal, (s) => s.futureStates.length > 0)
  const [menu, setMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menu) return
    const fora = (e: PointerEvent) => { if (!menuRef.current?.contains(e.target as Node)) setMenu(false) }
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenu(false) }
    window.addEventListener('pointerdown', fora)
    window.addEventListener('keydown', esc)
    return () => { window.removeEventListener('pointerdown', fora); window.removeEventListener('keydown', esc) }
  }, [menu])

  const trilha = foco === RAIZ ? [] : [...ancestrais(doc, foco).filter((a) => a.id !== RAIZ), doc.nos[foco]]

  return (
    <header className="topo" data-lab="1">
      <div className="topo-esq" ref={menuRef}>
        <div className="topo-roteiro">
          <Marca />
          <input className="topo-titulo" value={doc.nos[RAIZ].titulo} placeholder="Roteiro sem título" aria-label="Título do roteiro"
            onChange={(e) => { const v = e.target.value; mudar((d) => { d.nos[RAIZ].titulo = v }) }}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === 'Escape') (e.target as HTMLInputElement).blur() }} />
          <button className="icone-btn" aria-expanded={menu} aria-haspopup="menu" aria-label="Seus roteiros e opções" title="Seus roteiros e opções"
            onClick={() => setMenu(!menu)}>
            <IcoBaixo tamanho={14} />
          </button>
        </div>
        {menu && <MenuRoteiros fechar={() => setMenu(false)} />}
      </div>

      <nav className={cls('migalhas', foco === RAIZ && 'na-raiz')} aria-label="Onde você está">
        <button className={cls('migalha', foco === RAIZ && 'atual')} onClick={() => focar(RAIZ)}>Peça inteira</button>
        {trilha.map((n) => (
          <span key={n.id} className="migalha-grupo">
            <IcoSeta tamanho={12} />
            <button className={cls('migalha', n.id === foco && 'atual')} onClick={() => focar(n.id)}>{rotulo(n, 26)}</button>
          </span>
        ))}
      </nav>

      <div className="topo-dir">
        <button className="icone-btn topo-desfazer" onClick={desfazer} disabled={!podeDesfazer} aria-label="Desfazer" title="Desfazer (Ctrl+Z)"><IcoDesfazer /></button>
        <button className="icone-btn topo-desfazer" onClick={refazer} disabled={!podeRefazer} aria-label="Refazer" title="Refazer (Ctrl+Shift+Z)"><IcoRefazer /></button>
        <span className={cls('topo-sep', !podeDesfazer && !podeRefazer && 'sem-historico')} />
        <button className={cls('botao', painel === 'biblioteca' && 'ativo')} aria-pressed={painel === 'biblioteca'}
          onClick={() => setUI({ painel: painel === 'biblioteca' ? null : 'biblioteca' })}>
          <IcoBiblioteca /> <span className="rotulo-botao">Estruturas</span>
        </button>
        <button className="botao botao-primario" onClick={() => setUI({ painel: 'texto' })}>
          <IcoTexto /> Texto final
        </button>
      </div>
    </header>
  )
}
