// Modelos de curva: referências estruturais de ritmo para aplicar na timeline e adaptar.
// Não são presets de engajamento nem previsão de reação do público: são intenções de ritmo.
// Todas têm vales deliberados; o contraste é o que faz os picos existirem.
// Base, grau de evidência e decisões: docs/pesquisa-biblioteca.md.
//
// pontos: [posição 0..1 na peça, intensidade 1..5], em ordem de posição.

import type { Fonte, ModeloCurva } from './tipos'

// ---------------------------------------------------------------------------
// Fontes compartilhadas
// ---------------------------------------------------------------------------

const loewenstein: Fonte = {
  titulo: 'The psychology of curiosity: A review and reinterpretation (Psychological Bulletin, 116(1), 75-98)',
  autor: 'George Loewenstein',
  ano: '1994',
  url: 'https://doi.org/10.1037/0033-2909.116.1.75',
}

const kang: Fonte = {
  titulo: 'The Wick in the Candle of Learning: Epistemic Curiosity Activates Reward Circuitry and Enhances Memory (Psychological Science, 20(8), 963-973)',
  autor: 'Min Jeong Kang, Ming Hsu, Ian Krajbich, George Loewenstein e outros',
  ano: '2009',
  url: 'https://doi.org/10.1111/j.1467-9280.2009.02402.x',
}

const berlyne: Fonte = {
  titulo: 'Conflict, Arousal, and Curiosity',
  autor: 'Daniel E. Berlyne',
  ano: '1960',
}

const brewer: Fonte = {
  titulo: 'Stories are to entertain: A structural-affect theory of stories (Journal of Pragmatics, 6, 473-486)',
  autor: 'William F. Brewer e Edward H. Lichtenstein',
  ano: '1982',
  url: 'https://doi.org/10.1016/0378-2166(82)90021-2',
}

const reagan: Fonte = {
  titulo: 'The emotional arcs of stories are dominated by six basic shapes (EPJ Data Science, 5, 31)',
  autor: 'Andrew J. Reagan, Lewis Mitchell, Dilan Kiley, Christopher M. Danforth e Peter Sheridan Dodds',
  ano: '2016',
  url: 'https://doi.org/10.1140/epjds/s13688-016-0093-1',
}

const boyd: Fonte = {
  titulo: 'The narrative arc: Revealing core narrative structures through text analysis (Science Advances, 6(32), eaba2196)',
  autor: 'Ryan L. Boyd, Kate G. Blackburn e James W. Pennebaker',
  ano: '2020',
  url: 'https://doi.org/10.1126/sciadv.aba2196',
}

const todorov: Fonte = {
  titulo: 'The Two Principles of Narrative (Diacritics, 1(1), 37-44)',
  autor: 'Tzvetan Todorov',
  ano: '1971',
  url: 'https://doi.org/10.2307/464558',
}

const harmon: Fonte = {
  titulo: 'Story Structure 101: Super Basic Shit (Channel 101 Wiki)',
  autor: 'Dan Harmon',
  ano: 'c. 2009',
  url: 'https://channel101.fandom.com/wiki/Story_Structure_101:_Super_Basic_Shit',
}

const kahneman1993: Fonte = {
  titulo: 'When More Pain Is Preferred to Less: Adding a Better End (Psychological Science, 4(6), 401-405)',
  autor: 'Daniel Kahneman, Barbara L. Fredrickson, Charles A. Schreiber e Donald A. Redelmeier',
  ano: '1993',
  url: 'https://doi.org/10.1111/j.1467-9280.1993.tb00589.x',
}

const alaybek: Fonte = {
  titulo: "All's well that ends (and peaks) well? A meta-analysis of the peak-end rule and duration neglect (Organizational Behavior and Human Decision Processes, 170, 104149)",
  autor: 'Balca Alaybek, Reeshad S. Dalal e outros',
  ano: '2022',
  url: 'https://doi.org/10.1016/j.obhdp.2022.104149',
}

const mayer: Fonte = {
  titulo: 'Multimedia Learning (3ª ed.; princípios de segmentação e sinalização)',
  autor: 'Richard E. Mayer',
  ano: '2020',
}

const sweller: Fonte = {
  titulo: 'Cognitive Load During Problem Solving: Effects on Learning (Cognitive Science, 12(2), 257-285)',
  autor: 'John Sweller',
  ano: '1988',
  url: 'https://doi.org/10.1207/s15516709cog1202_4',
}

const bunce: Fonte = {
  titulo: 'How Long Can Students Pay Attention in Class? A Study of Student Attention Decline Using Clickers (Journal of Chemical Education, 87(12), 1438-1443)',
  autor: 'Diane M. Bunce, Elizabeth A. Flens e Kelly Y. Neiles',
  ano: '2010',
  url: 'https://doi.org/10.1021/ed100409p',
}

const wilsonKorn: Fonte = {
  titulo: 'Attention During Lectures: Beyond Ten Minutes (Teaching of Psychology, 34(2), 85-89)',
  autor: 'Karen Wilson e James H. Korn',
  ano: '2007',
  url: 'https://doi.org/10.1080/00986280701291291',
}

const nelsonMeyvis: Fonte = {
  titulo: 'Interrupted Consumption: Disrupting Adaptation to Hedonic Experiences (Journal of Marketing Research, 45(6), 654-664)',
  autor: 'Leif D. Nelson e Tom Meyvis',
  ano: '2008',
  url: 'https://doi.org/10.1509/jmkr.45.6.654',
}

const zacks: Fonte = {
  titulo: 'Event perception: A mind-brain perspective (Psychological Bulletin, 133(2), 273-293)',
  autor: 'Jeffrey M. Zacks, Nicole K. Speer, Khena M. Swallow, Todd S. Braver e Jeremy R. Reynolds',
  ano: '2007',
  url: 'https://doi.org/10.1037/0033-2909.133.2.273',
}

const freytag: Fonte = {
  titulo: 'Die Technik des Dramas (trad. inglesa: Technique of the Drama, E. J. MacEwan, 1894)',
  autor: 'Gustav Freytag',
  ano: '1863',
  url: 'https://archive.org/details/freytagstechniqu00freyuoft',
}

const poetica: Fonte = {
  titulo: 'Poética',
  autor: 'Aristóteles',
  ano: 'c. 335 a.C.',
  url: 'https://www.gutenberg.org/ebooks/1974',
}

const field: Fonte = {
  titulo: 'Screenplay: The Foundations of Screenwriting',
  autor: 'Syd Field',
  ano: '1979',
}

const mckee: Fonte = {
  titulo: 'Story: Substance, Structure, Style, and the Principles of Screenwriting',
  autor: 'Robert McKee',
  ano: '1997',
}

const pottker: Fonte = {
  titulo: 'News and its communicative quality: the inverted pyramid, when and why did it appear? (Journalism Studies, 4(4), 501-511)',
  autor: 'Horst Pöttker',
  ano: '2003',
  url: 'https://doi.org/10.1080/1461670032000136596',
}

const murdock: Fonte = {
  titulo: 'The serial position effect of free recall (Journal of Experimental Psychology, 64(5), 482-488)',
  autor: 'Bennet B. Murdock Jr.',
  ano: '1962',
  url: 'https://doi.org/10.1037/h0045106',
}

const scanlan: Fonte = {
  titulo: 'Reporting and Writing: Basics for the 21st Century',
  autor: 'Christopher Scanlan',
  ano: '2000',
}

const zillmann1971: Fonte = {
  titulo: 'Excitation transfer in communication-mediated aggressive behavior (Journal of Experimental Social Psychology, 7(4), 419-434)',
  autor: 'Dolf Zillmann',
  ano: '1971',
  url: 'https://doi.org/10.1016/0022-1031(71)90075-8',
}

const zillmann1996: Fonte = {
  titulo: 'The psychology of suspense in dramatic exposition (em Vorderer, Wulff e Friedrichsen, orgs., Suspense)',
  autor: 'Dolf Zillmann',
  ano: '1996',
}

const huron: Fonte = {
  titulo: 'Sweet Anticipation: Music and the Psychology of Expectation',
  autor: 'David Huron',
  ano: '2006',
}

const truffaut: Fonte = {
  titulo: 'Hitchcock/Truffaut (a bomba debaixo da mesa: suspense x surpresa)',
  autor: 'François Truffaut e Alfred Hitchcock',
  ano: '1966',
}

const hinds: Fonte = {
  titulo: 'Contrastive rhetoric: Japanese and English (Text, 3(2), 183-195)',
  autor: 'John Hinds',
  ano: '1983',
  url: 'https://doi.org/10.1515/text.1.1983.3.2.183',
}

const maynard: Fonte = {
  titulo: 'Principles of Japanese Discourse: A Handbook',
  autor: 'Senko K. Maynard',
  ano: '1998',
}

const retorica: Fonte = {
  titulo: 'Retórica (livro III, sobre a ordem das partes do discurso)',
  autor: 'Aristóteles',
  ano: 'c. 350 a.C.',
  url: 'http://classics.mit.edu/Aristotle/rhetoric.html',
}

const quintiliano: Fonte = {
  titulo: 'Institutio Oratoria (livros IV a VI)',
  autor: 'Quintiliano',
  ano: 'c. 95',
  url: 'https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Quintilian/Institutio_Oratoria/home.html',
}

const millerCampbell: Fonte = {
  titulo: 'Recency and primacy in persuasion as a function of the timing of speeches and measurements (Journal of Abnormal and Social Psychology, 59(1), 1-9)',
  autor: 'Norman Miller e Donald T. Campbell',
  ano: '1959',
  url: 'https://doi.org/10.1037/h0049330',
}

// ---------------------------------------------------------------------------
// Modelos de curva
// ---------------------------------------------------------------------------

export const CURVAS: ModeloCurva[] = [
  // 1 ------------------------------------------------------------------------
  {
    id: 'curiosidade-crescente',
    nome: 'Curiosidade crescente',
    serve: 'Apresentar um assunto novo fazendo o público querer entendê-lo antes de receber a explicação.',
    logica:
      'Abre com uma lacuna específica, desce para dar o contexto mínimo que torna a lacuna precisa, e sobe em degraus: cada pista estreita a pergunta e é seguida de um vale curto de assimilação. A revelação fica perto do fim, e a descida depois dela é o espaço para o público perceber o que mudou. Como a curiosidade cresce com o conhecimento parcial, os vales não interrompem a subida: alimentam.',
    pontos: [
      [0, 3],
      [0.05, 3.8],
      [0.14, 2.1],
      [0.24, 2.8],
      [0.3, 2.3],
      [0.4, 3.3],
      [0.47, 2.5],
      [0.58, 3.8],
      [0.65, 3],
      [0.76, 4.4],
      [0.83, 4.9],
      [0.9, 2.5],
      [1, 3],
    ],
    marcos: [
      { em: 0.05, nome: 'lacuna aberta' },
      { em: 0.14, nome: 'contexto mínimo' },
      { em: 0.4, nome: 'primeira pista' },
      { em: 0.58, nome: 'lacuna estreita' },
      { em: 0.83, nome: 'revelação' },
      { em: 0.93, nome: 'o que muda' },
    ],
    fontes: [loewenstein, kang, berlyne, brewer],
    armadilha:
      'Seguida à risca, vira promessa esticada: degraus que só adiam, sem acrescentar conhecimento. Se a revelação não for maior que a espera, o público sente que foi enrolado e passa a desconfiar da próxima lacuna.',
  },

  // 2 ------------------------------------------------------------------------
  {
    id: 'transformacao',
    nome: 'Transformação',
    serve: 'Acompanhar uma mudança (de uma pessoa, de uma ideia, de uma situação) do estado inicial ao novo estado.',
    logica:
      'Começa num patamar calmo que estabelece o normal. A ruptura é um salto curto; depois vem uma travessia em ondas, cada tentativa um pouco mais alta que a anterior, separadas por vales de consequência. Antes do ponto decisivo há um vale fundo e silencioso, de reconsideração, que dá peso à escolha. O novo estado volta ao calmo, mas não ao mesmo lugar.',
    pontos: [
      [0, 2],
      [0.12, 2.2],
      [0.17, 4.2],
      [0.24, 2.7],
      [0.34, 3.4],
      [0.41, 2.5],
      [0.52, 3.8],
      [0.58, 3],
      [0.67, 4.3],
      [0.74, 1.8],
      [0.82, 4.4],
      [0.87, 5],
      [0.93, 2.6],
      [1, 2.3],
    ],
    marcos: [
      { em: 0.06, nome: 'estado inicial' },
      { em: 0.17, nome: 'ruptura' },
      { em: 0.34, nome: 'primeiras tentativas' },
      { em: 0.67, nome: 'crise' },
      { em: 0.74, nome: 'silêncio antes da escolha' },
      { em: 0.87, nome: 'escolha' },
      { em: 0.96, nome: 'novo estado' },
    ],
    fontes: [todorov, reagan, boyd, harmon, kahneman1993],
    armadilha:
      'Vira "jornada de superação" padrão quando a crise é obrigatória e o vale silencioso vira cena protocolar de desabafo. Nem toda transformação tem um fundo do poço: às vezes a mudança é gradual, e a curva deve ser mais plana, com ondas menores.',
  },

  // 3 ------------------------------------------------------------------------
  {
    id: 'explicacao-com-reengajamento',
    nome: 'Explicação com reengajamento',
    serve: 'Explicar algo complexo, em que a maior parte do tempo é, e deve ser, explicação calma.',
    logica:
      'Alterna blocos longos de contexto em vale com gatilhos curtos que reabrem a atenção: uma pergunta, um exemplo, uma troca de formato, um problema para o público resolver. Os picos não são enfeite: cada um marca a fronteira entre segmentos e ajuda a memória a organizar o conteúdo em partes. A síntese perto do fim é o pico maior, porque junta os pedaços.',
    pontos: [
      [0, 3.3],
      [0.04, 3.8],
      [0.1, 2],
      [0.2, 2.2],
      [0.24, 3.4],
      [0.28, 2.1],
      [0.4, 2.3],
      [0.45, 3.6],
      [0.5, 2.2],
      [0.62, 2.4],
      [0.67, 3.7],
      [0.72, 2.3],
      [0.81, 2.5],
      [0.88, 4.1],
      [0.95, 3],
      [1, 2.6],
    ],
    marcos: [
      { em: 0.04, nome: 'pergunta de partida' },
      { em: 0.24, nome: 'reengajamento' },
      { em: 0.45, nome: 'reengajamento' },
      { em: 0.67, nome: 'reengajamento' },
      { em: 0.88, nome: 'síntese' },
    ],
    fontes: [mayer, sweller, zacks, bunce, wilsonKorn, nelsonMeyvis],
    armadilha:
      'Fica mecânico quando os reengajamentos entram em intervalo fixo, sem relação com o conteúdo, como um alarme. O intervalo certo é o do próprio assunto: reengaja-se quando começa uma parte nova, não quando o relógio manda.',
  },

  // 4 ------------------------------------------------------------------------
  {
    id: 'ascensao-e-queda',
    nome: 'Ascensão e queda',
    serve: 'Histórias com um conflito central em que o ponto de não retorno fica no meio e a segunda metade trata das consequências.',
    logica:
      'A forma de Freytag: exposição calma, um incidente que põe tudo em movimento, subida em ondas até o clímax no centro, e descida pelas consequências. Antes do desfecho, um último suspense curto impede que a queda vire só declínio. A descida é longa de propósito: é nela que o público entende o que o clímax custou.',
    pontos: [
      [0, 2],
      [0.12, 2.2],
      [0.18, 3.2],
      [0.25, 2.7],
      [0.35, 3.6],
      [0.42, 3.1],
      [0.5, 4.6],
      [0.55, 5],
      [0.61, 3.7],
      [0.7, 3],
      [0.78, 3.8],
      [0.85, 2.9],
      [0.93, 2.3],
      [1, 2],
    ],
    marcos: [
      { em: 0.08, nome: 'exposição' },
      { em: 0.18, nome: 'incidente' },
      { em: 0.55, nome: 'clímax' },
      { em: 0.78, nome: 'último suspense' },
      { em: 0.95, nome: 'desfecho' },
    ],
    fontes: [freytag, poetica],
    armadilha:
      'Em peças curtas ou que pedem força no fim, a segunda metade arrasta. Freytag analisava tragédia em cinco atos; tomar o pico central como regra para qualquer peça é o erro mais comum com essa curva.',
  },

  // 5 ------------------------------------------------------------------------
  {
    id: 'escalada-com-pico-tardio',
    nome: 'Escalada com pico tardio',
    serve: 'Peças narrativas ou argumentativas longas que guardam a maior força para perto do fim.',
    logica:
      'Complicações progressivas: cada virada leva a um patamar mais alto que a anterior, e entre elas há vales de consequência. Logo antes da reta final, um vale fundo (o momento em que tudo parece perdido ou parado) prepara a subida mais forte. O clímax fica perto do fim, e o fecho é curto, porque a lembrança de uma experiência pesa muito no pico e no final.',
    pontos: [
      [0, 2.5],
      [0.06, 3.5],
      [0.13, 2],
      [0.24, 3.4],
      [0.3, 2.4],
      [0.42, 3.3],
      [0.47, 2.6],
      [0.55, 3.9],
      [0.61, 3],
      [0.69, 4.1],
      [0.75, 2.1],
      [0.8, 4.2],
      [0.88, 4.8],
      [0.92, 5],
      [0.96, 3],
      [1, 2.6],
    ],
    marcos: [
      { em: 0.06, nome: 'gancho' },
      { em: 0.24, nome: 'primeira virada' },
      { em: 0.55, nome: 'ponto médio' },
      { em: 0.75, nome: 'vale antes da reta final' },
      { em: 0.8, nome: 'segunda virada' },
      { em: 0.92, nome: 'clímax' },
    ],
    fontes: [field, mckee, kahneman1993, alaybek],
    armadilha:
      'Três atos com viradas em porcentagens fixas viraram a planta-baixa de boa parte do cinema comercial. Se as viradas caem sempre no mesmo lugar, o público experiente as sente chegando. Mova os marcos conforme a história pede.',
  },

  // 6 ------------------------------------------------------------------------
  {
    id: 'essencial-primeiro',
    nome: 'Essencial primeiro',
    serve: 'Comunicar algo que o público precisa saber, garantindo que quem sair cedo leve o principal.',
    logica:
      'O pico está na abertura: o fato principal e por que ele importa. Depois a curva desce em patamares (contexto, detalhes, complementos), com pequenas subidas quando entra um dado novo relevante. O fecho retoma o essencial de leve, porque o que vem por último também tende a ficar na memória.',
    pontos: [
      [0, 3.8],
      [0.06, 4.2],
      [0.15, 3],
      [0.25, 2.5],
      [0.34, 2.9],
      [0.44, 2.2],
      [0.56, 2.6],
      [0.68, 2],
      [0.78, 2.3],
      [0.88, 1.8],
      [1, 2.5],
    ],
    marcos: [
      { em: 0.06, nome: 'o essencial' },
      { em: 0.2, nome: 'por quê' },
      { em: 0.5, nome: 'detalhes' },
      { em: 0.95, nome: 'retomada' },
    ],
    fontes: [pottker, scanlan, murdock],
    armadilha:
      'Em peças longas, a curva só desce e o final vira apêndice. Se a peça precisa ser acompanhada até o fim, essa é a curva errada, ou ela precisa de um segundo pico (por exemplo, um caso concreto no meio).',
  },

  // 7 ------------------------------------------------------------------------
  {
    id: 'ondas-de-suspense',
    nome: 'Ondas de suspense',
    serve: 'Manter o público investido num desfecho incerto por muito tempo, sem cansá-lo.',
    logica:
      'Ondas de tensão e alívio com amplitude crescente. O alívio depois de cada onda é necessário: a excitação que sobra da tensão amplifica a emoção seguinte, e a pausa impede que o público se acostume. Cada onda sobe um pouco mais que a anterior e os vales ficam mais curtos, até o desfecho, seguido de um alívio longo.',
    pontos: [
      [0, 2],
      [0.1, 3],
      [0.15, 2],
      [0.26, 3.5],
      [0.31, 2.2],
      [0.43, 4],
      [0.48, 2.5],
      [0.6, 4.4],
      [0.64, 2.7],
      [0.77, 4.7],
      [0.84, 5],
      [0.9, 1.8],
      [1, 2.3],
    ],
    marcos: [
      { em: 0.1, nome: 'primeira ameaça' },
      { em: 0.31, nome: 'alívio' },
      { em: 0.6, nome: 'ameaça maior' },
      { em: 0.84, nome: 'desfecho' },
      { em: 0.93, nome: 'alívio final' },
    ],
    fontes: [zillmann1971, zillmann1996, huron, nelsonMeyvis, truffaut],
    armadilha:
      'Ritmo de montanha-russa: ondas iguais em intervalo regular anunciam a próxima e matam a incerteza. Suspense precisa que o desfecho pareça de fato em aberto; varie a distância entre as ondas e deixe algumas terminarem mal.',
  },

  // 8 ------------------------------------------------------------------------
  {
    id: 'quatro-tempos',
    nome: 'Quatro tempos',
    serve: 'Peças contemplativas, ensaios e textos curtos que surpreendem por justaposição, não por conflito.',
    logica:
      'Os dois primeiros tempos ficam num vale estável, sem pressa. O terceiro salta: entra um elemento de outro lugar. O quarto desce um pouco e, quando o público faz a ligação entre as partes, sobe de novo num pico menor e mais íntimo. A intensidade do fim vem do entendimento, não do choque.',
    pontos: [
      [0, 2],
      [0.12, 2.3],
      [0.24, 2.1],
      [0.38, 2.7],
      [0.49, 2.5],
      [0.54, 4.3],
      [0.64, 3.9],
      [0.72, 2.9],
      [0.82, 3.7],
      [0.91, 3],
      [1, 2.6],
    ],
    marcos: [
      { em: 0.05, nome: 'apresentação' },
      { em: 0.3, nome: 'desenvolvimento' },
      { em: 0.54, nome: 'deslocamento' },
      { em: 0.82, nome: 'ligação' },
    ],
    fontes: [hinds, maynard],
    armadilha:
      'Se o deslocamento não for escolhido com cuidado, a peça parece ter dois assuntos soltos. Se a ligação for explicada demais, perde-se o clique que o público faria sozinho e o pico final some.',
  },

  // 9 ------------------------------------------------------------------------
  {
    id: 'argumento-com-fecho-forte',
    nome: 'Argumento com fecho forte',
    serve: 'Defender uma posição ou pedir uma ação, levando o público de uma crença a outra.',
    logica:
      'A abertura pede escuta com intensidade moderada; os fatos vêm num vale; as provas sobem em degraus; a objeção mais séria cria um pico de tensão, porque o público vê a própria dúvida ser levada a sério. A peroração é o pico final: o que vem por último e o ponto mais forte pesam na memória do argumento. O fim assenta um pouco, para a conclusão não soar como grito.',
    pontos: [
      [0, 3],
      [0.06, 3.7],
      [0.13, 2.2],
      [0.24, 2],
      [0.31, 3],
      [0.37, 2.5],
      [0.46, 3.3],
      [0.52, 2.6],
      [0.61, 3.6],
      [0.66, 4],
      [0.72, 2.6],
      [0.8, 3],
      [0.89, 4.5],
      [0.95, 4.8],
      [1, 3.6],
    ],
    marcos: [
      { em: 0.06, nome: 'exórdio' },
      { em: 0.18, nome: 'fatos' },
      { em: 0.31, nome: 'provas' },
      { em: 0.66, nome: 'objeção mais forte' },
      { em: 0.93, nome: 'peroração' },
    ],
    fontes: [retorica, quintiliano, millerCampbell, alaybek],
    armadilha:
      'Um fecho alto em toda peça vira apelo protocolar. A intensidade final vem de a conclusão ser merecida pelo que veio antes, não de volume ou urgência artificial.',
  },
]
