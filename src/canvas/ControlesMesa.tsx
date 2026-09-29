import { useRef, useState } from 'react'
import { useReactFlow, useViewport } from '@xyflow/react'
import { useStore } from '../model/store'
import { Popover } from '../ui/Popover'
import { IcoEnquadrar, IcoMais, IcoMenos, IcoTeclado } from '../ui/icones'

const ATALHOS: [string, string][] = [
  ['Dois cliques na mesa', 'Nova ideia'],
  ['Colar texto na mesa', 'Cada parágrafo ou item vira uma ideia'],
  ['Clique, depois clique de novo', 'Escrever na ideia'],
  ['Ctrl + Enter', 'Próxima ideia, logo abaixo'],
  ['Arrastar da bolinha', 'Ligar: vem depois, explica, juntar, pertence'],
  ['Arrastar no vazio', 'Selecionar várias'],
  ['Espaço + arrastar', 'Mover a vista'],
  ['Ctrl + rolar', 'Zoom'],
  ['Enter', 'Escrever na ideia ou entrar na parte'],
  ['Esc', 'Sair da edição, limpar seleção ou subir um nível'],
  ['Delete', 'Apagar o que está selecionado'],
  ['Ctrl + Z / Ctrl + Shift + Z', 'Desfazer / refazer'],
]

export function ControlesMesa() {
  const rf = useReactFlow()
  const { zoom } = useViewport()
  const focar = useStore((s) => s.focar)
  const foco = useStore((s) => s.foco)
  const [ajuda, setAjuda] = useState(false)
  const botaoAjuda = useRef<HTMLButtonElement>(null)

  return (
    <div className="controles-mesa">
      <button ref={botaoAjuda} className="controle" aria-label="Atalhos" title="Atalhos" aria-expanded={ajuda}
        onClick={() => setAjuda(!ajuda)}><IcoTeclado /></button>
      <Popover aberto={ajuda} ancora={botaoAjuda} onFechar={() => setAjuda(false)} lado="cima" alinhar="fim" rotulo="Atalhos" className="popover-atalhos">
        <p className="popover-titulo">Na mesa</p>
        <dl className="atalhos">
          {ATALHOS.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
        </dl>
      </Popover>
      <span className="controles-sep" />
      <button className="controle" aria-label="Diminuir zoom" title="Diminuir zoom" onClick={() => rf.zoomOut({ duration: 200 })}><IcoMenos /></button>
      <button className="controle controle-zoom" title="Voltar para 100%" onClick={() => rf.zoomTo(1, { duration: 250 })}>
        {Math.round(zoom * 100)}%
      </button>
      <button className="controle" aria-label="Aumentar zoom" title="Aumentar zoom" onClick={() => rf.zoomIn({ duration: 200 })}><IcoMais /></button>
      <span className="controles-sep" />
      <button className="controle" aria-label="Enquadrar" title="Enquadrar o nível em foco" onClick={() => focar(foco)}><IcoEnquadrar /></button>
    </div>
  )
}
