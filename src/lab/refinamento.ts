/* Refinamento do app no laboratório (só em `npm run dev`).
   Motor genérico: laboratorio/refinamento/painel.js (o mesmo das lojas).
   Cada seção tem data-lab="<n>" no elemento. A primeira opção de cada variação é o padrão:
   aqui é a proposta nova ("mostrar só o que importa"); a versão anterior fica como alternativa.
   Anotações: laboratorio/app/ANOTACOES.md · protocolo: laboratorio/refinamento/README.md */
import { useSyncExternalStore } from 'react'
import { criarRefinamento } from '../../laboratorio/refinamento/painel.js'

export const SECOES = [
  { n: '1', nome: 'Barra do topo' },
  { n: '2', nome: 'Intenção' },
  { n: '3', nome: 'Cartão de ideia' },
  { n: '4', nome: 'Parte (moldura)' },
  { n: '5', nome: 'Ligações e rótulos' },
  { n: '6', nome: 'Controles da mesa' },
  { n: '7', nome: 'Timeline' },
  { n: '8', nome: 'Mesa enquanto escreve' },
  { n: '9', nome: 'Avisos com Desfazer' },
  { n: '10', nome: 'Biblioteca de estruturas' },
  { n: '11', nome: 'Texto final' },
]

export const VARIANTES = {
  topo: { secao: '1', rotulo: 'Barra', opcoes: [['enxuta', 'Enxuta'], ['completa', 'Completa (anterior)'], ['flutuante', 'Flutuante sobre a mesa']] },
  intencao: { secao: '2', rotulo: 'Intenção', opcoes: [['linha', 'Uma linha que abre'], ['painel', 'Painel sempre aberto (anterior)'], ['faixa', 'Faixa sob o topo']] },
  cartao: { secao: '3', rotulo: 'Cartão', opcoes: [['minimo', 'Mínimo'], ['completo', 'Completo (anterior)'], ['folha', 'Folha solta, sem moldura']] },
  parte: { secao: '4', rotulo: 'Parte', opcoes: [['discreta', 'Detalhes ao passar o mouse'], ['completa', 'Tudo à vista (anterior)'], ['aba', 'Moldura leve com aba']] },
  ligacoes: { secao: '5', rotulo: 'Rótulos das ligações', opcoes: [['pontos', 'Viram um ponto'], ['rotuladas', 'Sempre escritos (anterior)'], ['foco', 'Só com seleção']] },
  controles: { secao: '6', rotulo: 'Zoom e atalhos', opcoes: [['compactos', 'Só o zoom'], ['completos', 'Completos (anterior)'], ['escondidos', 'Aparecem perto do canto']] },
  faixa: { secao: '7', rotulo: 'Timeline', opcoes: [['essencial', 'Essencial'], ['completa', 'Completa (anterior)']] },
  escrita: { secao: '8', rotulo: 'Ao escrever', opcoes: [['foco', 'O resto se apaga'], ['normal', 'Tudo visível (anterior)']] },
  avisos: { secao: '9', rotulo: 'Posição', opcoes: [['base', 'Embaixo, sobre a timeline'], ['topo', 'No topo (anterior)']] },
} satisfies Record<string, { secao: string; rotulo: string; opcoes: [string, string][] }>

export type ChaveVariante = keyof typeof VARIANTES

const rf = criarRefinamento({ pagina: 'app', secoes: SECOES, variantes: VARIANTES })

// Ponte com o React: cada variação vira uma assinatura que re-renderiza quem usa.
const ouvintes = new Map<string, Set<() => void>>()
for (const k of Object.keys(VARIANTES)) rf.aoMudar(k, () => ouvintes.get(k)?.forEach((f) => f()))

export const variante = (k: ChaveVariante) => rf.variante(k)

export function useVariante(k: ChaveVariante): string {
  return useSyncExternalStore(
    (f) => { const s = ouvintes.get(k) ?? new Set(); s.add(f); ouvintes.set(k, s); return () => s.delete(f) },
    () => rf.variante(k),
  )
}

export function montarRefinamento() {
  if (import.meta.env.DEV) rf.montar()
}
