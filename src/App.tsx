import { useEffect } from 'react'
import { ReactFlowProvider } from '@xyflow/react'
import { useStore, desfazer, refazer } from './model/store'
import { RAIZ } from './model/tipos'
import { Mesa } from './canvas/Mesa'
import { MenuLigacao } from './canvas/MenuLigacao'
import { Faixa } from './timeline/Faixa'
import { BarraTopo } from './painel/BarraTopo'
import { Intencao } from './painel/Intencao'
import { Biblioteca } from './painel/Biblioteca'
import { TextoFinal } from './painel/TextoFinal'
import { editavel } from './ui/util'

function Atalhos() {
  useEffect(() => {
    const tecla = (e: KeyboardEvent) => {
      const s = useStore.getState()
      const mod = e.metaKey || e.ctrlKey
      if (mod && e.key.toLowerCase() === 'z' && !editavel(e.target)) {
        e.preventDefault()
        if (e.shiftKey) refazer()
        else desfazer()
        return
      }
      if (mod && e.key.toLowerCase() === 'y' && !editavel(e.target)) { e.preventDefault(); refazer(); return }
      if (editavel(e.target) || s.painel === 'texto') return
      if (e.key === 'Escape') {
        if (s.pendente) s.setUI({ pendente: null })
        else if (s.painel) s.setUI({ painel: null })
        else if (s.selecao.length) s.setUI({ selecao: [] })
        else if (s.foco !== RAIZ) s.focar(s.doc.nos[s.foco]?.pai ?? RAIZ)
        return
      }
      if (e.key === 'Enter' && s.selecao.length === 1) {
        const n = s.doc.nos[s.selecao[0]]
        e.preventDefault()
        if (n?.tipo === 'ideia') s.setUI({ editando: n.id })
        else if (n?.tipo === 'parte') s.focar(n.id)
      }
    }
    window.addEventListener('keydown', tecla)
    return () => window.removeEventListener('keydown', tecla)
  }, [])
  return null
}

export default function App() {
  const pronto = useStore((s) => s.pronto)
  const painel = useStore((s) => s.painel)

  if (!pronto) return <div className="carregando">Abrindo a mesa…</div>

  return (
    <ReactFlowProvider>
      <div className="app">
        <BarraTopo />
        <main className="area">
          <div className="area-mesa">
            <Mesa />
            <Intencao />
            <Biblioteca />
          </div>
          <Faixa />
        </main>
        <MenuLigacao />
        {painel === 'texto' && <TextoFinal />}
        <Atalhos />
      </div>
    </ReactFlowProvider>
  )
}
