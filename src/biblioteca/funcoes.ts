// Funções de ritmo: o papel que um trecho cumpre na curva de intensidade.
// A faixa é uma referência de onde a função costuma morar (1 = vale, 5 = pico), não uma regra.
// Base e justificativas: docs/pesquisa-biblioteca.md (seções "Contraste e vales" e "Como os dados foram montados").

import type { FuncaoRitmo } from './tipos'

export const FUNCOES: FuncaoRitmo[] = [
  {
    id: 'respiro',
    nome: 'Respiro',
    descricao:
      'Baixa a pressão de propósito para o público assentar o que acabou de ver e chegar descansado ao próximo movimento.',
    faixa: [1, 2],
  },
  {
    id: 'contexto',
    nome: 'Contexto',
    descricao:
      'Entrega o que o público precisa saber para entender o que vem depois; pede atenção calma e contínua, não atenção de alerta.',
    faixa: [1.5, 2.5],
  },
  {
    id: 'preparacao',
    nome: 'Preparação',
    descricao:
      'Planta algo que vai importar mais tarde e cria a sensação de que alguma coisa está se armando.',
    faixa: [2, 3.5],
  },
  {
    id: 'gatilho',
    nome: 'Gatilho de atenção',
    descricao:
      'Uma mudança nítida (pergunta, imagem, dado, troca de tom ou de formato) que puxa de volta uma atenção que estava assentada.',
    faixa: [3, 4.5],
  },
  {
    id: 'tensao',
    nome: 'Tensão',
    descricao:
      'Mantém uma questão em aberto e aumenta o que está em jogo; o público quer saber como aquilo vai se resolver.',
    faixa: [3, 4.5],
  },
  {
    id: 'virada',
    nome: 'Virada',
    descricao:
      'Muda a direção ou o sentido do que vinha sendo contado; o público precisa reorganizar o que achava que sabia.',
    faixa: [3.5, 5],
  },
  {
    id: 'climax',
    nome: 'Clímax',
    descricao:
      'O ponto de maior carga da peça ou da parte: a questão principal é enfrentada ou respondida.',
    faixa: [4.5, 5],
  },
  {
    id: 'resolucao',
    nome: 'Resolução',
    descricao:
      'Mostra a consequência do que aconteceu e deixa clara a nova situação; a energia desce, mas o sentido sobe.',
    faixa: [2, 3.5],
  },
  {
    id: 'eco',
    nome: 'Eco',
    descricao:
      'Fecha retomando algo do começo com o sentido transformado, para a peça ficar inteira na memória.',
    faixa: [2, 3.5],
  },
]
