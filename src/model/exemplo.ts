// Roteiro de exemplo, montado a partir do exemplo do próprio brief:
// intenção macro "trabalhar mais → trabalhar sem prioridade" e virada micro "falta de tempo".
import { type Doc, RAIZ } from './tipos'
import * as op from './operacoes'
import { ESTRUTURAS } from '../biblioteca/estruturas'

function etapa(estruturaId: string, i: number) {
  const e = ESTRUTURAS.find((x) => x.id === estruturaId)
  const et = e?.etapas[i]
  return et ? { etapa: { estruturaId, chave: et.chave } } : {}
}

export function exemplo(): Doc {
  const d = op.docVazio('Trabalhar mais não resolve')
  const raiz = d.nos[RAIZ]
  raiz.intencao = 'Levar o público da percepção de que trabalhar mais resolve o problema para a percepção de que o problema real é trabalhar sem prioridade.'
  raiz.estruturaId = 'problema-virada-solucao'
  raiz.alvo = { pontos: [[0.1, 3], [0.3, 2], [0.5, 5], [0.72, 3], [0.92, 4]], origem: 'problema-virada-solucao' }

  const M = 'problema-virada-solucao'
  const ideia = (pai: string, x: number, y: number, texto: string, intensidade: number, funcao?: string) => {
    const id = op.criarIdeia(d, pai, x, y, texto)
    d.nos[id].intensidade = intensidade
    if (funcao) d.nos[id].funcao = funcao
    return id
  }

  const problema = op.criarParte(d, RAIZ, 0, 0, 'Problema', { ...etapa(M, 0), w: 340, h: 480,
    intencao: 'Fazer o público se reconhecer no cansaço antes de qualquer explicação.' })
  ideia(problema, 20, 96, 'Segunda-feira, 23h. A lista ainda tem onze itens. Você fez tudo o que dava e mesmo assim terminou o dia com a sensação de que ficou devendo.', 3, 'gatilho')
  ideia(problema, 20, 290, 'A resposta que todo mundo dá é a mesma: acordar mais cedo, cortar o almoço, responder e-mail no fim de semana.', 4, 'tensao')

  const aprof = op.criarParte(d, RAIZ, 400, 0, 'Aprofundamento', { ...etapa(M, 1), w: 340, h: 480,
    intencao: 'Mostrar que a resposta óbvia piora o quadro.' })
  ideia(aprof, 20, 96, 'Só que trabalhar mais tem um custo que não aparece na lista. Cada hora extra sai do descanso, e o cansaço deixa as escolhas do dia seguinte piores.', 2, 'contexto')
  const urgente = ideia(aprof, 20, 290, 'Quando tudo parece urgente, a gente escolhe pelo que grita mais alto, não pelo que importa mais.', 3, 'preparacao')

  const E = 'expectativa-quebra-reinterpretacao'
  const virada = op.criarParte(d, RAIZ, 800, 0, 'Virada', { ...etapa(M, 2), w: 1010, h: 460,
    intencao: 'Fazer o público questionar a crença de que falta tempo.', estruturaId: E,
    alvo: { pontos: [[0.15, 3], [0.5, 5], [0.85, 4]], origem: E } })
  const sub = (i: number, nome: string, texto: string, intensidade: number, funcao: string) => {
    const p = op.criarParte(d, virada, 20 + i * 324, 110, nome, { ...etapa(E, i), w: 304, h: 300 })
    ideia(p, 20, 96, texto, intensidade, funcao)
  }
  sub(0, 'Expectativa', 'Se o problema fosse falta de tempo, quem tem mais horas livres deveria render mais.', 3, 'preparacao')
  sub(1, 'Quebra', 'Mas lembre da véspera das suas últimas férias. Em uma tarde você resolveu o que estava parado havia duas semanas.', 5, 'virada')
  sub(2, 'Nova interpretação', 'O tempo era o mesmo. O que mudou foi que, com prazo, você finalmente escolheu o que não ia fazer.', 4, 'climax')

  const solucao = op.criarParte(d, RAIZ, 1850, 0, 'Solução', { ...etapa(M, 3), w: 340, h: 480,
    intencao: 'Dar um gesto concreto e pequeno, que caiba no dia seguinte.' })
  ideia(solucao, 20, 96, 'Antes de abrir a lista amanhã, escolha as três coisas que fariam o dia valer. O resto só entra depois dessas.', 3, 'contexto')
  ideia(solucao, 20, 290, 'Não é um método. É uma pergunta que você faz antes de começar.', 2, 'respiro')

  const conclusao = op.criarParte(d, RAIZ, 2250, 0, 'Conclusão', { ...etapa(M, 4), w: 340, h: 300,
    intencao: 'Deixar a nova crença no lugar da antiga.' })
  ideia(conclusao, 20, 96, 'Você não precisa de mais horas. Precisa de menos coisas disputando as mesmas horas.', 4, 'resolucao')

  // Ideias ainda soltas na mesa: fazem parte do pensamento, não da montagem.
  const parkinson = op.criarIdeia(d, RAIZ, 60, 620, 'Referência: lei de Parkinson. O trabalho se expande até ocupar todo o tempo disponível.', false)
  op.criarIdeia(d, RAIZ, 400, 660, 'Talvez abrir com um dado sobre horas trabalhadas no Brasil? Checar fonte.', false)
  const frase = op.criarIdeia(d, RAIZ, 760, 620, 'Urgente é o que grita. Importante é o que espera.', false)
  op.ligar(d, parkinson, aprof, 'explica')
  op.ligar(d, frase, urgente, 'fundir')
  return d
}
