// Ponte entre a mesa e a timeline: a mesa pergunta onde um nó solto sobre a faixa deve entrar.
export const faixaApi: {
  /** Retângulo da trilha de clipes na tela, ou null se a faixa está fechada. */
  retangulo: () => DOMRect | null
  /** Índice de inserção na sequência do foco para um x de tela. */
  indice: (clientX: number, ignorar?: string) => number
} = {
  retangulo: () => null,
  indice: () => 0,
}
