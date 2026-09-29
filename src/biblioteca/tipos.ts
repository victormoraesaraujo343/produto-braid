// Tipos da biblioteca narrativa. Os dados vivem em estruturas.ts, curvas.ts e funcoes.ts
// e vêm da pesquisa documentada em docs/pesquisa-biblioteca.md.

/** Intensidade de 1 (vale: calmo, explicativo) a 5 (pico: clímax, choque). Aceita decimais. */
export type Nivel = number

export interface Fonte {
  titulo: string
  autor?: string
  ano?: string
  url?: string
}

/** Papel que um trecho cumpre no ritmo (a "região" da curva em que ele vive). */
export interface FuncaoRitmo {
  id: string
  nome: string
  /** O que esse trecho faz com a atenção de quem assiste, em uma frase simples. */
  descricao: string
  /** Faixa típica de intensidade. É referência, não regra. */
  faixa: [Nivel, Nivel]
}

export interface Etapa {
  /** Chave estável dentro da estrutura. */
  chave: string
  nome: string
  /** Função da etapa no movimento do público (o que ela muda nele). */
  funcao: string
  /** Pergunta-guia para o autor. Nunca uma frase pronta para copiar. */
  pergunta: string
  /** Intensidade-alvo típica da etapa. */
  intensidade: Nivel
  /** Peso relativo de duração (as etapas somadas são normalizadas). */
  peso: number
  /** Função de ritmo sugerida (id de FuncaoRitmo). */
  ritmo?: string
}

export interface Estrutura {
  id: string
  nome: string
  /** Em que escala costuma funcionar melhor. */
  escala: 'macro' | 'micro' | 'ambas'
  /** Que tipo de intenção essa estrutura costuma servir. Começa com um verbo. */
  serve: string
  /** A lógica por baixo, em 2 a 4 frases: por que esse movimento funciona. */
  logica: string
  etapas: Etapa[]
  /** De que tradição vem (dramaturgia, retórica, psicologia, jornalismo...). */
  origem: string
  fontes: Fonte[]
  /** Como essa estrutura vira clichê quando aplicada ao pé da letra. */
  armadilha: string
  /**
   * Realizações possíveis em escalas diferentes, descritas de forma abstrata
   * (ex.: "numa frase: ...", "em uma cena: ...", "num vídeo inteiro: ...").
   * Mostram que o esqueleto aceita realizações muito diferentes. Não são textos para copiar.
   */
  realizacoes: string[]
}

export interface ModeloCurva {
  id: string
  nome: string
  /** Para que tipo de peça ou intenção serve. */
  serve: string
  /** A lógica do ritmo, em 2 a 4 frases. */
  logica: string
  /** Pontos da curva: [posição 0..1 ao longo da peça, nível 1..5]. Ordenados por posição. */
  pontos: [number, Nivel][]
  /** Marcos nomeados ao longo da curva (ex.: "primeira virada" em 0.3). */
  marcos?: { em: number; nome: string }[]
  fontes: Fonte[]
  /** Como esse ritmo fica mecânico quando seguido à risca. */
  armadilha: string
}
