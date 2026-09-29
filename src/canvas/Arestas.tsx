import { memo } from 'react'
import { BaseEdge, EdgeLabelRenderer, getBezierPath, type EdgeProps } from '@xyflow/react'
import { useStore } from '../model/store'
import * as op from '../model/operacoes'
import { cls } from '../ui/util'
import { IcoFechar } from '../ui/icones'

/** O fio: a ordem de leitura. Mais grosso no nível da peça, mais fino dentro das partes. */
function FioBase(p: EdgeProps) {
  const [path, lx, ly] = getBezierPath(p)
  const nivel = (p.data?.nivel as number) ?? 0
  const mudar = useStore((s) => s.mudar)
  return (
    <>
      <BaseEdge id={p.id} path={path} markerEnd={p.markerEnd}
        className={cls('fio', `fio-n${Math.min(nivel, 2)}`, p.selected && 'sel')} interactionWidth={16} />
      {p.selected && (
        <EdgeLabelRenderer>
          <button className="aresta-acao nodrag nopan" style={{ transform: `translate(-50%, -50%) translate(${lx}px, ${ly}px)` }}
            title="Tira a ideia seguinte do fio (ela continua na mesa)"
            onClick={() => mudar((d) => op.tirarDoFio(d, p.target))}>
            <IcoFechar tamanho={12} /> Cortar aqui
          </button>
        </EdgeLabelRenderer>
      )}
    </>
  )
}

/** Ligações de sentido: "explica" e "podem virar uma só". */
function LigacaoBase(p: EdgeProps) {
  const [path, lx, ly] = getBezierPath(p)
  const tipo = p.data?.tipo as 'explica' | 'fundir'
  const ligId = p.data?.ligId as string
  const mudar = useStore((s) => s.mudar)
  const setUI = useStore((s) => s.setUI)
  return (
    <>
      <BaseEdge id={p.id} path={path} markerEnd={tipo === 'explica' ? p.markerEnd : undefined}
        className={cls('ligacao', `lig-${tipo}`, p.selected && 'sel')} interactionWidth={16} />
      <EdgeLabelRenderer>
        <div className={cls('aresta-rotulo nodrag nopan', `rot-${tipo}`, p.selected && 'sel')}
          style={{ transform: `translate(-50%, -50%) translate(${lx}px, ${ly}px)` }}>
          {tipo === 'explica' ? <span>explica</span> : (
            <button className="aresta-juntar" title="Junta as duas ideias numa só (dá para desfazer)"
              onClick={() => { mudar((d) => op.juntar(d, p.source, p.target)); setUI({ selecao: [p.source] }) }}>
              Juntar em uma
            </button>
          )}
          {p.selected && (
            <button className="aresta-x" aria-label="Apagar ligação" title="Apagar ligação"
              onClick={() => mudar((d) => op.desligar(d, ligId))}>
              <IcoFechar tamanho={11} />
            </button>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  )
}

export const Fio = memo(FioBase)
export const Ligacao = memo(LigacaoBase)
