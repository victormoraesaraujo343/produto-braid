// Modelo do roteiro.
//
// Tudo é um "nó". A raiz (id RAIZ) é a peça inteira; ela e toda "parte" são recipientes
// com intenção, estrutura, uma sequência (o fio) e, opcionalmente, uma curva-alvo.
// "Ideia" é a folha: o texto concreto (a realização).
//
// Intenção → Estrutura → Realização vale em todo nível: raiz, parte, sub-parte.

export const RAIZ = 'raiz'

export type TipoNo = 'ideia' | 'parte'

/** Curva planejada: pontos [posição 0..1, nível 1..5]. */
export interface CurvaAlvo {
  pontos: [number, number][]
  /** De onde veio: id de estrutura, id de modelo de curva, ou 'desenho'. */
  origem?: string
}

export interface No {
  id: string
  tipo: TipoNo
  /** Recipiente onde o nó mora. A raiz tem pai null. */
  pai: string | null
  /** Posição relativa ao pai (convenção do React Flow para sub-fluxos). */
  x: number
  y: number

  // Ideia (realização)
  texto: string
  /** 1 (vale) a 5 (pico). */
  intensidade: number
  /** Função de ritmo (id em biblioteca/funcoes). */
  funcao?: string

  // Parte e raiz (intenção + estrutura)
  titulo: string
  intencao: string
  estruturaId?: string
  /** Quando a parte nasceu de uma etapa de estrutura (uma "vaga"). */
  etapa?: { estruturaId: string; chave: string }
  /** Ordem de leitura dos filhos: o fio deste nível. */
  sequencia: string[]
  alvo?: CurvaAlvo
  w?: number
  h?: number
}

export type TipoLigacao = 'explica' | 'fundir'

/** Ligações com sentido narrativo além da ordem. "Vem depois" é a própria sequência. */
export interface Ligacao {
  id: string
  de: string
  para: string
  tipo: TipoLigacao
}

export interface Doc {
  id: string
  /** Palavras por minuto usadas para estimar a duração. */
  ritmo: number
  nos: Record<string, No>
  ligacoes: Ligacao[]
  criadoEm: number
  editadoEm: number
}

export const LARGURA_IDEIA = 264
export const PARTE_MIN = { w: 320, h: 200 }
export const PARTE_CABECALHO = 92
export const PARTE_PAD = 20
