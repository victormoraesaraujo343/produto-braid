// Tipos do motor do painel de Refinamento (painel.js é JavaScript puro, copiado do lab das lojas).
export interface SecaoRefinamento { n: string; nome: string }
export interface VarianteRefinamento { secao: string; rotulo: string; opcoes: [string, string][] }
export function criarRefinamento(cfg: {
  pagina: string
  secoes: SecaoRefinamento[]
  variantes: Record<string, VarianteRefinamento>
}): {
  variante: (chave: string) => string
  aoMudar: (chave: string, fn: (valor: string) => void) => void
  montar: () => void
}
