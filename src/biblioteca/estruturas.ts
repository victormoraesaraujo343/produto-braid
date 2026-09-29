// Biblioteca de estruturas narrativas: esqueletos abstratos a serviço de uma intenção.
// Nunca frases prontas. As realizações descrevem formas possíveis, não textos para copiar.
// Base, grau de evidência e decisões: docs/pesquisa-biblioteca.md.
//
// Convenções:
// - intensidade: 1 (vale) a 5 (pico); é intenção de ritmo, não previsão de reação.
// - peso: duração relativa entre as etapas da mesma estrutura (normalizada pelo app).
// - ritmo: id de uma função em funcoes.ts.

import type { Estrutura, Fonte } from './tipos'

// ---------------------------------------------------------------------------
// Fontes compartilhadas
// ---------------------------------------------------------------------------

const poetica: Fonte = {
  titulo: 'Poética',
  autor: 'Aristóteles',
  ano: 'c. 335 a.C.',
  url: 'https://www.gutenberg.org/ebooks/1974',
}

const retorica: Fonte = {
  titulo: 'Retórica (livro III, sobre a ordem das partes do discurso)',
  autor: 'Aristóteles',
  ano: 'c. 350 a.C.',
  url: 'http://classics.mit.edu/Aristotle/rhetoric.html',
}

const deInventione: Fonte = {
  titulo: 'De Inventione (livro I, as partes do discurso)',
  autor: 'Cícero',
  ano: 'c. 85 a.C.',
}

const adHerennium: Fonte = {
  titulo: 'Rhetorica ad Herennium (livro I)',
  autor: 'Autor anônimo (tradicionalmente atribuída a Cícero)',
  ano: 'c. 85 a.C.',
}

const quintiliano: Fonte = {
  titulo: 'Institutio Oratoria (livros IV a VI)',
  autor: 'Quintiliano',
  ano: 'c. 95',
  url: 'https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Quintilian/Institutio_Oratoria/home.html',
}

const freytag: Fonte = {
  titulo: 'Die Technik des Dramas (trad. inglesa: Technique of the Drama, E. J. MacEwan, 1894)',
  autor: 'Gustav Freytag',
  ano: '1863',
  url: 'https://archive.org/details/freytagstechniqu00freyuoft',
}

const mckee: Fonte = {
  titulo: 'Story: Substance, Structure, Style, and the Principles of Screenwriting',
  autor: 'Robert McKee',
  ano: '1997',
}

const todorov: Fonte = {
  titulo: 'The Two Principles of Narrative (Diacritics, 1(1), 37-44)',
  autor: 'Tzvetan Todorov',
  ano: '1971',
  url: 'https://doi.org/10.2307/464558',
}

const labov: Fonte = {
  titulo: 'Narrative Analysis: Oral Versions of Personal Experience (reed. Journal of Narrative and Life History, 7, 3-38, 1997)',
  autor: 'William Labov e Joshua Waletzky',
  ano: '1967',
  url: 'https://doi.org/10.1075/jnlh.7.02nar',
}

const labov1972: Fonte = {
  titulo: 'Language in the Inner City (cap. 9, The Transformation of Experience in Narrative Syntax)',
  autor: 'William Labov',
  ano: '1972',
}

const propp: Fonte = {
  titulo: 'Morfologia do conto maravilhoso',
  autor: 'Vladimir Propp',
  ano: '1928',
}

const hoey: Fonte = {
  titulo: 'On the Surface of Discourse (padrão situação, problema, resposta, avaliação)',
  autor: 'Michael Hoey',
  ano: '1983',
}

const minto: Fonte = {
  titulo: 'The Pyramid Principle: Logic in Writing and Thinking',
  autor: 'Barbara Minto',
  ano: '1985',
}

const toulmin: Fonte = {
  titulo: 'The Uses of Argument',
  autor: 'Stephen Toulmin',
  ano: '1958',
}

const monroe: Fonte = {
  titulo: 'Principles and Types of Speech',
  autor: 'Alan H. Monroe',
  ano: '1935',
}

const micciche: Fonte = {
  titulo: "A Test of Monroe's Motivated Sequence for Its Effects on Ratings of Message Organization and Attitude Change (Psychological Reports, 86, 1135-1138)",
  autor: 'Tracy Micciche, Burt Pryor e Jeff Butler',
  ano: '2000',
  url: 'https://doi.org/10.2466/pr0.2000.86.3c.1135',
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

const parkerStone: Fonte = {
  titulo: 'Aula na NYU gravada para a série "Stand In" da mtvU (regra do "mas / portanto")',
  autor: 'Trey Parker e Matt Stone',
  ano: '2011',
}

const trabasso: Fonte = {
  titulo: 'Causal thinking and the representation of narrative events (Journal of Memory and Language, 24(5), 612-630)',
  autor: 'Tom Trabasso e Paul van den Broek',
  ano: '1985',
  url: 'https://doi.org/10.1016/0749-596X(85)90049-X',
}

const suls: Fonte = {
  titulo: 'A two-stage model for the appreciation of jokes and cartoons: an information-processing analysis (em Goldstein e McGhee, orgs., The Psychology of Humor)',
  autor: 'Jerry M. Suls',
  ano: '1972',
}

const huron: Fonte = {
  titulo: 'Sweet Anticipation: Music and the Psychology of Expectation',
  autor: 'David Huron',
  ano: '2006',
}

const brewer: Fonte = {
  titulo: 'Stories are to entertain: A structural-affect theory of stories (Journal of Pragmatics, 6, 473-486)',
  autor: 'William F. Brewer e Edward H. Lichtenstein',
  ano: '1982',
  url: 'https://doi.org/10.1016/0378-2166(82)90021-2',
}

const hoeken: Fonte = {
  titulo: 'Suspense, curiosity, and surprise: How discourse structure influences the affective and cognitive processing of a story (Poetics, 27(4), 277-286)',
  autor: 'Hans Hoeken e Mario van Vliet',
  ano: '2000',
  url: 'https://doi.org/10.1016/S0304-422X(99)00021-2',
}

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

const zillmann1996: Fonte = {
  titulo: 'The psychology of suspense in dramatic exposition (em Vorderer, Wulff e Friedrichsen, orgs., Suspense)',
  autor: 'Dolf Zillmann',
  ano: '1996',
}

const truffaut: Fonte = {
  titulo: 'Hitchcock/Truffaut (a bomba debaixo da mesa: suspense x surpresa)',
  autor: 'François Truffaut e Alfred Hitchcock',
  ano: '1966',
}

const gerrig: Fonte = {
  titulo: 'Experiencing Narrative Worlds: On the Psychological Activities of Reading',
  autor: 'Richard J. Gerrig',
  ano: '1993',
}

const pottker: Fonte = {
  titulo: 'News and its communicative quality: the inverted pyramid, when and why did it appear? (Journalism Studies, 4(4), 501-511)',
  autor: 'Horst Pöttker',
  ano: '2003',
  url: 'https://doi.org/10.1080/1461670032000136596',
}

const scanlan: Fonte = {
  titulo: 'Reporting and Writing: Basics for the 21st Century',
  autor: 'Christopher Scanlan',
  ano: '2000',
}

const blundell: Fonte = {
  titulo: 'The Art and Craft of Feature Writing: Based on The Wall Street Journal Guide',
  autor: 'William E. Blundell',
  ano: '1988',
}

const heath: Fonte = {
  titulo: 'Made to Stick: Why Some Ideas Survive and Others Die',
  autor: 'Chip Heath e Dan Heath',
  ano: '2007',
}

const harmon: Fonte = {
  titulo: 'Story Structure 101: Super Basic Shit (Channel 101 Wiki)',
  autor: 'Dan Harmon',
  ano: 'c. 2009',
  url: 'https://channel101.fandom.com/wiki/Story_Structure_101:_Super_Basic_Shit',
}

const campbell: Fonte = {
  titulo: 'O herói de mil faces',
  autor: 'Joseph Campbell',
  ano: '1949',
}

const tchekhov: Fonte = {
  titulo: 'Carta a A. S. Lazarev-Gruzinsky (o fuzil no palco), 1 nov. 1889',
  autor: 'Anton Tchekhov',
  ano: '1889',
}

const cohn: Fonte = {
  titulo: 'Visual Narrative Structure (Cognitive Science, 37(3), 413-452)',
  autor: 'Neil Cohn',
  ano: '2013',
  url: 'https://doi.org/10.1111/cogs.12016',
}

const zacks: Fonte = {
  titulo: 'Event perception: A mind-brain perspective (Psychological Bulletin, 133(2), 273-293)',
  autor: 'Jeffrey M. Zacks, Nicole K. Speer, Khena M. Swallow, Todd S. Braver e Jeremy R. Reynolds',
  ano: '2007',
  url: 'https://doi.org/10.1037/0033-2909.133.2.273',
}

const fyfe: Fonte = {
  titulo: 'Concreteness Fading in Mathematics and Science Instruction: a Systematic Review (Educational Psychology Review, 26(1), 9-25)',
  autor: 'Emily R. Fyfe, Nicole M. McNeil, Ji Y. Son e Robert L. Goldstone',
  ano: '2014',
  url: 'https://doi.org/10.1007/s10648-014-9249-3',
}

const mayerMoreno: Fonte = {
  titulo: 'Nine Ways to Reduce Cognitive Load in Multimedia Learning (Educational Psychologist, 38(1), 43-52)',
  autor: 'Richard E. Mayer e Roxana Moreno',
  ano: '2003',
  url: 'https://doi.org/10.1207/S15326985EP3801_6',
}

// ---------------------------------------------------------------------------
// Estruturas
// ---------------------------------------------------------------------------

export const ESTRUTURAS: Estrutura[] = [
  // 1 ------------------------------------------------------------------------
  {
    id: 'problema-virada-solucao',
    nome: 'Problema, virada e solução',
    escala: 'macro',
    serve:
      'Mudar a forma como o público entende um problema que ele acha que já conhece, para que uma solução nova passe a fazer sentido.',
    logica:
      'O público só aceita uma solução nova depois de sentir que a explicação antiga não dá conta. Por isso o problema é aprofundado até a saída óbvia falhar; a virada troca o diagnóstico, não só a resposta. A solução chega como consequência do novo diagnóstico, e a conclusão devolve o público ao ponto de partida com outro olhar.',
    etapas: [
      {
        chave: 'problema',
        nome: 'Problema',
        funcao: 'Faz o público reconhecer uma dificuldade como sua.',
        pergunta: 'Em que situação concreta o público já sentiu esse problema, mesmo sem nomeá-lo?',
        intensidade: 3.5,
        peso: 1.2,
        ritmo: 'gatilho',
      },
      {
        chave: 'aprofundamento',
        nome: 'Aprofundamento',
        funcao:
          'Mostra que a dificuldade é mais teimosa do que parece e que a resposta que o público já tem não resolve.',
        pergunta: 'O que o público já tentou ou acredita, e por que isso não funciona de verdade?',
        intensidade: 2.5,
        peso: 2,
        ritmo: 'preparacao',
      },
      {
        chave: 'virada',
        nome: 'Virada',
        funcao: 'Troca o diagnóstico: revela a causa que a explicação anterior escondia.',
        pergunta: 'Qual crença precisa cair para a solução fazer sentido, e o que faz ela cair?',
        intensidade: 4.5,
        peso: 1,
        ritmo: 'virada',
      },
      {
        chave: 'solucao',
        nome: 'Solução',
        funcao: 'Mostra o que muda na prática quando o problema é visto do jeito novo.',
        pergunta: 'O que o público consegue fazer agora que antes não conseguia?',
        intensidade: 3,
        peso: 2,
        ritmo: 'resolucao',
      },
      {
        chave: 'conclusao',
        nome: 'Conclusão',
        funcao: 'Amarra a mudança de percepção e fecha o arco aberto no começo.',
        pergunta: 'Como o problema do início parece diferente depois da virada?',
        intensidade: 3,
        peso: 0.8,
        ritmo: 'eco',
      },
    ],
    origem: 'Linguística do discurso (padrão problema-solução) e dramaturgia (peripécia e reconhecimento).',
    fontes: [hoey, minto, poetica, mckee],
    armadilha:
      'Vira fórmula quando o problema é inventado para caber na solução, ou quando a "virada" é só a solução com outra roupa e o público já a adivinhou. Também soa pronto quando a estrutura aparece nas palavras (anúncios do tipo "mas a verdade é") em vez de aparecer na mudança real de entendimento.',
    realizacoes: [
      'Num parágrafo: uma dificuldade reconhecível, a tentativa óbvia que não funciona e uma observação que muda o motivo do fracasso; a solução fica implícita.',
      'Numa cena de ficção: o personagem insiste numa estratégia, a insistência piora a situação, e ele percebe que estava resolvendo o problema errado.',
      'Num vídeo explicativo inteiro: cada bloco do aprofundamento derruba uma saída comum; a virada reorganiza tudo o que veio antes, e a solução é mostrada em uso, não enunciada.',
    ],
  },

  // 2 ------------------------------------------------------------------------
  {
    id: 'estado-ruptura-novo-estado',
    nome: 'Estado, ruptura e novo estado',
    escala: 'ambas',
    serve:
      'Mostrar uma mudança (de uma pessoa, de uma ideia, de um lugar) fazendo o público sentir a diferença entre o antes e o depois.',
    logica:
      'Toda narrativa mínima é a passagem de um equilíbrio a outro: algo estável é perturbado e se reorganiza, parecido com o primeiro mas nunca igual. A mudança só é percebida se o estado inicial tiver sido sentido como normal. Entre a ruptura e o novo estado cabe uma travessia, que pode ser aberta com o zoom como uma estrutura própria.',
    etapas: [
      {
        chave: 'estado-inicial',
        nome: 'Estado inicial',
        funcao: 'Estabelece o que é normal e parece estável, para a mudança ter contra o que aparecer.',
        pergunta: 'O que, neste começo, o público precisa acreditar que vai continuar igual?',
        intensidade: 2,
        peso: 1.2,
        ritmo: 'contexto',
      },
      {
        chave: 'ruptura',
        nome: 'Ruptura',
        funcao: 'Introduz o acontecimento que torna impossível continuar como antes.',
        pergunta: 'O que acontece que não pode ser desfeito, e como o público percebe isso sem que seja dito?',
        intensidade: 4.5,
        peso: 1,
        ritmo: 'virada',
      },
      {
        chave: 'novo-estado',
        nome: 'Novo estado',
        funcao: 'Mostra o equilíbrio que se forma depois: igual ao primeiro em algo, diferente no essencial.',
        pergunta: 'O que continua igual e o que ficou diferente para sempre?',
        intensidade: 2.5,
        peso: 1.3,
        ritmo: 'resolucao',
      },
    ],
    origem: 'Narratologia estrutural e sociolinguística da narrativa oral.',
    fontes: [todorov, labov, poetica, propp],
    armadilha:
      'A formulação "eu era assim, aconteceu isso, agora sou assim" é o jeito mais rápido de gastar a estrutura. Vira clichê quando o estado inicial é caricato (só existe para ser negado), quando a ruptura é anunciada em vez de mostrada, ou quando o novo estado é uma lição dita em voz alta.',
    realizacoes: [
      'Numa frase: um hábito descrito, um detalhe que o interrompe, e o mesmo hábito descrito de novo com um elemento trocado.',
      'Numa sequência de imagens: o mesmo lugar mostrado duas vezes, antes e depois, com o acontecimento do meio apenas sugerido.',
      'Num documentário inteiro: o estado inicial é reconstruído com calma, a ruptura divide a peça em duas metades, e o novo estado aparece nos mesmos gestos cotidianos do começo.',
    ],
  },

  // 3 ------------------------------------------------------------------------
  {
    id: 'expectativa-quebra-reinterpretacao',
    nome: 'Expectativa, quebra e nova interpretação',
    escala: 'micro',
    serve:
      'Fazer o público questionar uma crença ou leitura que ele já tem, trocando-a por outra dentro de um mesmo trecho.',
    logica:
      'A mente prevê o tempo todo; quando a previsão falha, a atenção sobe na hora. Mas a surpresa sozinha só desorienta: o prazer e a memória vêm quando o público encontra uma explicação que faz a quebra caber no que ele já tinha visto. Por isso a quebra precisa ser justa: as pistas da nova leitura já estavam lá.',
    etapas: [
      {
        chave: 'expectativa',
        nome: 'Expectativa',
        funcao: 'Constrói uma previsão: o público acha que sabe para onde aquilo vai.',
        pergunta: 'Que leitura natural o público vai fazer aqui, e o que a reforça sem forçar?',
        intensidade: 2.5,
        peso: 1.5,
        ritmo: 'preparacao',
      },
      {
        chave: 'quebra',
        nome: 'Quebra',
        funcao: 'Entrega algo que não cabe na previsão.',
        pergunta: 'Qual é o menor elemento capaz de tornar a leitura anterior impossível?',
        intensidade: 4.5,
        peso: 0.6,
        ritmo: 'virada',
      },
      {
        chave: 'nova-interpretacao',
        nome: 'Nova interpretação',
        funcao: 'Dá ao público a chave para reler o que veio antes; a surpresa vira entendimento.',
        pergunta: 'O que, no que já foi mostrado, ganha outro sentido depois da quebra?',
        intensidade: 3.5,
        peso: 1,
        ritmo: 'resolucao',
      },
    ],
    origem:
      'Psicologia da expectativa e do humor (modelo de incongruência e resolução) e dramaturgia (reconhecimento).',
    fontes: [suls, huron, brewer, hoeken, poetica],
    armadilha:
      'Vira truque quando a quebra é arbitrária (não havia pista para a nova leitura), quando é sempre do mesmo tipo (o "na verdade era o contrário"), ou quando aparece em todo bloco: o público aprende a esperar a quebra e ela deixa de quebrar.',
    realizacoes: [
      'Numa frase: a primeira metade conduz a uma conclusão, a segunda desloca o sentido de uma palavra-chave.',
      'Num bloco de argumento: o autor defende com honestidade a posição que o público já tem, mostra um dado que ela não explica e reorganiza o raciocínio a partir dele.',
      'Numa cena: um gesto que o público lê de um jeito é revelado, por um detalhe de enquadramento ou de informação, como tendo outro motivo.',
    ],
  },

  // 4 ------------------------------------------------------------------------
  {
    id: 'ascensao-climax-queda',
    nome: 'Ascensão, clímax e queda',
    escala: 'macro',
    serve: 'Dar a uma história com conflito central um arco completo, com peso no meio e consequência no fim.',
    logica:
      'Freytag descreveu o drama em cinco partes com o ponto mais alto no centro: a ação sobe até um ponto de não retorno e depois desce pelas consequências até o desfecho. O valor da forma é lembrar que o clímax precisa de subida (sem ela não pesa) e que a queda não é perda de interesse, e sim a colheita do que o clímax causou. Antes do desfecho, Freytag previa um último suspense.',
    etapas: [
      {
        chave: 'exposicao',
        nome: 'Exposição',
        funcao: 'Apresenta o mundo, as pessoas e a situação de partida.',
        pergunta: 'O que o público precisa saber para se importar com o que vai acontecer?',
        intensidade: 2,
        peso: 1.3,
        ritmo: 'contexto',
      },
      {
        chave: 'ascensao',
        nome: 'Ascensão',
        funcao: 'A partir de um incidente, as forças em conflito se complicam e o que está em jogo cresce.',
        pergunta: 'Qual é o incidente que põe tudo em movimento, e como cada passo aumenta o risco?',
        intensidade: 3.3,
        peso: 2.2,
        ritmo: 'tensao',
      },
      {
        chave: 'climax',
        nome: 'Clímax',
        funcao: 'O ponto de não retorno: o conflito chega ao máximo e algo decisivo acontece.',
        pergunta: 'Depois de qual momento nada pode voltar a ser como era?',
        intensidade: 5,
        peso: 0.8,
        ritmo: 'climax',
      },
      {
        chave: 'queda',
        nome: 'Queda',
        funcao: 'Desdobra as consequências do clímax, com um último momento de incerteza.',
        pergunta: 'Quais consequências do clímax o público ainda não viu, e o que ainda pode dar errado?',
        intensidade: 3.3,
        peso: 1.4,
        ritmo: 'tensao',
      },
      {
        chave: 'desfecho',
        nome: 'Desfecho',
        funcao: 'Fecha o conflito e mostra a situação final.',
        pergunta: 'Que imagem final resume o custo e o resultado de tudo?',
        intensidade: 2.5,
        peso: 0.8,
        ritmo: 'resolucao',
      },
    ],
    origem: 'Dramaturgia (análise da tragédia em cinco atos, século XIX, a partir de Aristóteles).',
    fontes: [freytag, poetica],
    armadilha:
      'Tomada como regra universal, obriga toda peça a ter o pico no centro e uma descida longa, o que arrasta peças curtas e formatos que pedem força no fim. Freytag analisava tragédia de cinco atos, não "toda história".',
    realizacoes: [
      'Numa cena de dois minutos: situação calma, pressão que cresce, confronto, e o silêncio depois dele.',
      'Num ensaio: premissas, acúmulo até o argumento mais forte no meio, e uma segunda metade que examina o que ele implica e onde ele pode falhar.',
      'Numa temporada: um episódio central concentra a virada principal, e os episódios finais lidam com o preço dela.',
    ],
  },

  // 5 ------------------------------------------------------------------------
  {
    id: 'kishotenketsu',
    nome: 'Kishōtenketsu (quatro tempos)',
    escala: 'ambas',
    serve:
      'Surpreender e fazer pensar por justaposição, sem depender de conflito: levar o público a descobrir sozinho uma ligação.',
    logica:
      'Forma em quatro tempos que vem da poesia clássica chinesa e virou padrão de composição no Japão. O terceiro tempo introduz um elemento que parece desconectado; o quarto revela a relação entre ele e os dois primeiros. A força está na justaposição: a virada é uma mudança de ângulo, e o público participa ao fazer a ligação.',
    etapas: [
      {
        chave: 'ki',
        nome: 'Ki (apresentação)',
        funcao: 'Apresenta um assunto ou situação sem pressa.',
        pergunta: 'Qual é o ponto de partida mais simples e concreto possível?',
        intensidade: 2,
        peso: 1,
        ritmo: 'contexto',
      },
      {
        chave: 'sho',
        nome: 'Shō (desenvolvimento)',
        funcao: 'Aprofunda o mesmo assunto, sem mudar de direção.',
        pergunta: 'O que o público ainda não percebeu sobre esse ponto de partida?',
        intensidade: 2.5,
        peso: 1,
        ritmo: 'preparacao',
      },
      {
        chave: 'ten',
        nome: 'Ten (deslocamento)',
        funcao: 'Traz um elemento de outro lugar, que parece não ter relação.',
        pergunta: 'Que outra coisa, vista de perto, ilumina a primeira sem ser parecida com ela?',
        intensidade: 4,
        peso: 1,
        ritmo: 'virada',
      },
      {
        chave: 'ketsu',
        nome: 'Ketsu (reunião)',
        funcao: 'Mostra a ligação e deixa o público completar o sentido.',
        pergunta: 'Qual é o mínimo que precisa ser dito para o público fazer a ligação sozinho?',
        intensidade: 3,
        peso: 1,
        ritmo: 'eco',
      },
    ],
    origem: 'Poética clássica chinesa (qǐ chéng zhuǎn hé) e retórica japonesa.',
    fontes: [hinds, maynard],
    armadilha:
      'Foi divulgada no Ocidente como "a estrutura sem conflito", o que simplifica demais. Fica vazia quando o terceiro tempo é só aleatório (nada o liga ao resto) ou quando o quarto explica a ligação por inteiro, tirando do público o prazer de fazê-la.',
    realizacoes: [
      'Num texto curto ou legenda: duas linhas sobre uma coisa, uma linha sobre outra aparentemente alheia, e uma última que faz as duas se iluminarem.',
      'Numa sequência de quatro quadros: situação, continuação, troca de ponto de vista e o quadro que junta tudo.',
      'Num ensaio em vídeo: desenvolve um tema com calma, salta para um caso de outro campo e fecha mostrando o princípio que os dois compartilham.',
    ],
  },

  // 6 ------------------------------------------------------------------------
  {
    id: 'mas-portanto',
    nome: 'Cadeia de "mas" e "portanto"',
    escala: 'ambas',
    serve: 'Transformar uma sequência de fatos ou tópicos numa cadeia em que cada passo obriga o próximo a existir.',
    logica:
      'Entre dois momentos, a ligação deve ser "mas" (algo se opõe) ou "portanto" (algo decorre), e não "e então". Pesquisas sobre compreensão de histórias mostram que eventos ligados por causa e efeito são mais lembrados e julgados mais importantes. A estrutura troca a lista pela consequência.',
    etapas: [
      {
        chave: 'impulso',
        nome: 'Impulso',
        funcao: 'Estabelece um querer ou um movimento: alguém tenta algo, ou uma ideia aponta numa direção.',
        pergunta: 'O que está sendo buscado, e por que agora?',
        intensidade: 2.5,
        peso: 1,
        ritmo: 'preparacao',
      },
      {
        chave: 'mas',
        nome: 'Mas',
        funcao: 'Algo se opõe ao impulso e o obriga a mudar.',
        pergunta: 'O que resiste, e por que essa resistência é inevitável e não um acaso?',
        intensidade: 3.5,
        peso: 1,
        ritmo: 'tensao',
      },
      {
        chave: 'portanto',
        nome: 'Portanto',
        funcao: 'A resposta ao obstáculo, que nasce dele e muda a direção.',
        pergunta: 'O que acontece por causa do obstáculo, e não apenas depois dele?',
        intensidade: 2.8,
        peso: 1,
        ritmo: 'preparacao',
      },
      {
        chave: 'mas-maior',
        nome: 'Mas, de novo',
        funcao: 'Uma oposição que a própria resposta criou, com mais em jogo.',
        pergunta: 'Que problema novo a solução anterior trouxe consigo?',
        intensidade: 4,
        peso: 1,
        ritmo: 'tensao',
      },
      {
        chave: 'desenlace',
        nome: 'Desenlace',
        funcao: 'A cadeia chega a um ponto em que a última consequência responde à pergunta de partida.',
        pergunta: 'Qual consequência fecha a cadeia sem precisar de acaso?',
        intensidade: 4.5,
        peso: 0.8,
        ritmo: 'virada',
      },
    ],
    origem: 'Tradição de ofício (roteiro de animação e comédia), com apoio em psicologia da compreensão de histórias.',
    fontes: [parkerStone, trabasso, mckee],
    armadilha:
      'Ao pé da letra, vira uma escada de obstáculos arbitrários, cada um mais barulhento, sem respiro. Também engessa quando as palavras "mas" e "portanto" aparecem no texto sem que a relação de causa exista de fato.',
    realizacoes: [
      'Num parágrafo de explicação: cada frase responde a uma limitação da anterior, em vez de acrescentar mais um item.',
      'Numa cena: o personagem tenta, algo impede, e a tentativa seguinte é consequência direta do impedimento, não uma ideia nova.',
      'Numa série: cada episódio termina com uma consequência que obriga o próximo a acontecer.',
    ],
  },

  // 7 ------------------------------------------------------------------------
  {
    id: 'dispositio-classica',
    nome: 'Disposição clássica do discurso',
    escala: 'macro',
    serve: 'Defender uma posição diante de um público que ainda precisa ser convencido.',
    logica:
      'A retórica clássica organiza o discurso pelo que o público precisa em cada momento: disposição para ouvir, fatos, provas, resposta às dúvidas e uma síntese que mexe com a emoção. Aristóteles dizia que o indispensável é enunciar e provar; o resto existe por causa do público. A refutação levada a sério costuma ser o trecho mais tenso, porque é a dúvida do próprio público.',
    etapas: [
      {
        chave: 'exordio',
        nome: 'Exórdio',
        funcao: 'Ganha a atenção e a boa vontade do público e mostra por que o assunto importa para ele.',
        pergunta: 'Por que este público deveria ouvir isto, e por que ouvir de você?',
        intensidade: 3.2,
        peso: 0.8,
        ritmo: 'gatilho',
      },
      {
        chave: 'narracao',
        nome: 'Narração',
        funcao: 'Expõe os fatos necessários, de forma clara e breve.',
        pergunta: 'Quais fatos o público precisa ter na cabeça antes de qualquer argumento?',
        intensidade: 2,
        peso: 1.3,
        ritmo: 'contexto',
      },
      {
        chave: 'confirmacao',
        nome: 'Confirmação',
        funcao: 'Apresenta as provas da posição, em uma ordem pensada.',
        pergunta: 'Quais provas, de naturezas diferentes, sustentam a posição, e em que ordem elas ganham força?',
        intensidade: 3,
        peso: 2.2,
        ritmo: 'preparacao',
      },
      {
        chave: 'refutacao',
        nome: 'Refutação',
        funcao: 'Enfrenta as objeções mais fortes.',
        pergunta: 'Qual é a melhor objeção que alguém inteligente faria, e o que você responde a ela?',
        intensidade: 3.8,
        peso: 1.2,
        ritmo: 'tensao',
      },
      {
        chave: 'peroracao',
        nome: 'Peroração',
        funcao: 'Recapitula, amplia o alcance e move o público.',
        pergunta: 'O que o público deve levar, sentir e fazer quando isto acabar?',
        intensidade: 4.5,
        peso: 0.9,
        ritmo: 'climax',
      },
    ],
    origem: 'Retórica clássica greco-romana.',
    fontes: [retorica, deInventione, adHerennium, quintiliano],
    armadilha:
      'Aplicada como formulário, gera discurso de tribunal: introdução protocolar, provas enfileiradas e um apelo final genérico. A refutação vira espantalho quando rebate uma objeção fraca que ninguém faria.',
    realizacoes: [
      'Num texto de opinião curto: uma entrada que liga o tema ao leitor, o fato mínimo, duas provas, a objeção mais séria e um fecho que amplia o alcance.',
      'Numa palestra: abertura com um caso, contexto enxuto, provas de natureza diferente, a pergunta que a plateia faria, e um fecho que retoma o caso de abertura.',
      'Num vídeo-ensaio longo: cada parte vira um capítulo, e a refutação ganha a mesma seriedade e o mesmo tempo que a tese.',
    ],
  },

  // 8 ------------------------------------------------------------------------
  {
    id: 'sequencia-motivada',
    nome: 'Sequência motivada',
    escala: 'macro',
    serve: 'Levar o público de perceber uma necessidade até dar um passo concreto.',
    logica:
      'Criada para discursos que pedem uma ação, segue a ordem em que uma pessoa costuma decidir: perceber, sentir a necessidade, ver uma saída, imaginar o resultado e saber o próximo passo. O ponto forte é a visualização: o público experimenta mentalmente o futuro antes de agir. A evidência de que ela convence mais do que outras ordens é fraca; ela ajuda sobretudo a parecer organizada.',
    etapas: [
      {
        chave: 'atencao',
        nome: 'Atenção',
        funcao: 'Faz o público olhar para o assunto.',
        pergunta: 'O que faz este público parar e prestar atenção neste tema, e não em outro?',
        intensidade: 3.5,
        peso: 0.7,
        ritmo: 'gatilho',
      },
      {
        chave: 'necessidade',
        nome: 'Necessidade',
        funcao: 'Mostra que existe um problema real que afeta o público.',
        pergunta: 'Qual é o custo concreto de deixar tudo como está, e para quem?',
        intensidade: 3,
        peso: 1.5,
        ritmo: 'tensao',
      },
      {
        chave: 'satisfacao',
        nome: 'Satisfação',
        funcao: 'Apresenta a saída e explica como ela funciona.',
        pergunta: 'Como a proposta resolve a necessidade, e o que ela não resolve?',
        intensidade: 2.3,
        peso: 1.8,
        ritmo: 'contexto',
      },
      {
        chave: 'visualizacao',
        nome: 'Visualização',
        funcao: 'Faz o público ver o futuro com a proposta (ou sem ela).',
        pergunta: 'Que cena concreta mostra a diferença que a proposta faz?',
        intensidade: 4.5,
        peso: 1,
        ritmo: 'climax',
      },
      {
        chave: 'acao',
        nome: 'Ação',
        funcao: 'Diz qual é o próximo passo, pequeno e claro.',
        pergunta: 'Qual é o menor passo possível que o público pode dar hoje?',
        intensidade: 3.2,
        peso: 0.6,
        ritmo: 'resolucao',
      },
    ],
    origem: 'Ensino de oratória (comunicação, Estados Unidos, década de 1930).',
    fontes: [monroe, micciche],
    armadilha:
      'É a espinha do comercial de televisão e por isso é reconhecida de longe. Fica manipuladora quando a necessidade é fabricada e a visualização promete demais. Vale como organização, não como fórmula de convencimento.',
    realizacoes: [
      'Numa mensagem de trabalho: uma observação que chama atenção, o custo de não agir, a proposta, o cenário com ela funcionando e um pedido pequeno.',
      'Numa peça de campanha: a visualização ocupa a maior parte do tempo e é mostrada, não descrita.',
      'Numa aula: a necessidade nasce de um exercício que falha antes da explicação, e a visualização é o mesmo exercício dando certo.',
    ],
  },

  // 9 ------------------------------------------------------------------------
  {
    id: 'situacao-complicacao-pergunta-resposta',
    nome: 'Situação, complicação, pergunta e resposta',
    escala: 'ambas',
    serve: 'Fazer o público chegar à mensagem principal já querendo ouvi-la, em textos de trabalho e explicações.',
    logica:
      'Minto propôs abrir textos de trabalho contando uma história mínima: uma situação que o leitor já aceita, uma complicação que muda algo, a pergunta que essa complicação faz surgir e a resposta, que é a mensagem principal. A resposta chega como alívio porque a pergunta nasceu no próprio leitor. A ordem pode mudar (começar pela resposta, por exemplo) conforme o público.',
    etapas: [
      {
        chave: 'situacao',
        nome: 'Situação',
        funcao: 'Afirma algo que o público já sabe e aceita.',
        pergunta: 'Com o que o público concorda antes de você dizer qualquer coisa nova?',
        intensidade: 2,
        peso: 0.8,
        ritmo: 'contexto',
      },
      {
        chave: 'complicacao',
        nome: 'Complicação',
        funcao: 'Mostra o que mudou ou o que ameaça essa situação.',
        pergunta: 'O que tornou a situação instável?',
        intensidade: 3.5,
        peso: 0.8,
        ritmo: 'gatilho',
      },
      {
        chave: 'pergunta',
        nome: 'Pergunta',
        funcao: 'Formula a dúvida que a complicação provoca.',
        pergunta: 'Qual pergunta o público faria agora, com as palavras dele?',
        intensidade: 3.8,
        peso: 0.4,
        ritmo: 'tensao',
      },
      {
        chave: 'resposta',
        nome: 'Resposta',
        funcao: 'Entrega a mensagem principal e o que a sustenta.',
        pergunta: 'Qual é a resposta em uma frase, e o que o público precisa para acreditar nela?',
        intensidade: 3,
        peso: 2,
        ritmo: 'resolucao',
      },
    ],
    origem: 'Escrita de negócios e consultoria (princípio da pirâmide).',
    fontes: [minto, hoey],
    armadilha:
      'Vira ritual corporativo quando a situação é um parágrafo de obviedades, ou quando a pergunta é montada de um jeito que só a resposta pronta cabe nela.',
    realizacoes: [
      'Numa abertura de relatório: três frases que levam do consenso à dúvida e uma quarta que responde.',
      'Num slide ou bloco de vídeo: o título é a resposta; o corpo mostra a situação e a complicação que a justificam.',
      'Numa conversa difícil: começar pelo que as duas partes concordam antes de nomear o que mudou.',
    ],
  },

  // 10 -----------------------------------------------------------------------
  {
    id: 'argumento-com-ressalva',
    nome: 'Argumento com ressalva',
    escala: 'micro',
    serve: 'Sustentar uma afirmação de forma honesta, mostrando até onde ela vale.',
    logica:
      'Toulmin mostrou que argumentos do dia a dia têm uma anatomia: uma afirmação, os dados que a apoiam, a regra que liga dados e afirmação (a garantia), o grau de certeza e as condições em que ela não vale. Tornar visível a garantia e a ressalva é o que separa um argumento de uma afirmação com exemplos. A ressalva também cria um pequeno pico: o público vê a dúvida dele sendo considerada.',
    etapas: [
      {
        chave: 'afirmacao',
        nome: 'Afirmação',
        funcao: 'Diz o que se quer defender.',
        pergunta: 'O que exatamente você afirma, dito de forma que possa estar errado?',
        intensidade: 3.2,
        peso: 0.6,
        ritmo: 'gatilho',
      },
      {
        chave: 'dados',
        nome: 'Dados',
        funcao: 'Apresenta o que foi observado e sustenta a afirmação.',
        pergunta: 'Que fato ou observação o público pode verificar?',
        intensidade: 2,
        peso: 1.2,
        ritmo: 'contexto',
      },
      {
        chave: 'garantia',
        nome: 'Garantia',
        funcao: 'Explica por que esses dados levam a essa afirmação.',
        pergunta: 'Que regra geral faz os dados apontarem para a afirmação, e por que ela é confiável?',
        intensidade: 2.5,
        peso: 1,
        ritmo: 'preparacao',
      },
      {
        chave: 'ressalva',
        nome: 'Ressalva',
        funcao: 'Mostra em que casos a afirmação não vale.',
        pergunta: 'Em que situação você mesmo deixaria de acreditar nisso?',
        intensidade: 3.5,
        peso: 0.8,
        ritmo: 'tensao',
      },
      {
        chave: 'conclusao',
        nome: 'Conclusão medida',
        funcao: 'Reafirma a posição no tamanho certo.',
        pergunta: 'Depois da ressalva, qual é a versão mais forte que ainda se sustenta?',
        intensidade: 3,
        peso: 0.6,
        ritmo: 'resolucao',
      },
    ],
    origem: 'Filosofia da argumentação.',
    fontes: [toulmin],
    armadilha:
      'Aplicada mecanicamente, soa como parecer técnico: cada parte etiquetada e nenhuma com vida. A ressalva vira fórmula de modéstia quando não muda de fato o alcance da conclusão.',
    realizacoes: [
      'Numa frase: uma afirmação com um "porque" e um limite que mostra onde ela deixa de valer.',
      'Num bloco explicativo: o dado vem primeiro, como observação, e a garantia aparece como a resposta à pergunta "por que isso importa?".',
      'Numa cena de diálogo: dois personagens concordam nos dados e discordam na garantia, e é aí que a cena acontece.',
    ],
  },

  // 11 -----------------------------------------------------------------------
  {
    id: 'lacuna-de-curiosidade',
    nome: 'Lacuna de curiosidade',
    escala: 'ambas',
    serve: 'Fazer o público querer entender algo antes de receber a explicação.',
    logica:
      'Curiosidade nasce quando o público percebe uma lacuna entre o que sabe e o que quer saber. Ela é mais forte quando a pessoa já sabe um pouco: nem ignorância total, nem certeza. Por isso a lacuna precisa ser específica, e cada pista deve deixá-la menor e mais nítida, não maior e mais vaga. A resposta só compensa se for do tamanho da pergunta.',
    etapas: [
      {
        chave: 'sinal',
        nome: 'Sinal da lacuna',
        funcao: 'Mostra que existe algo que o público não sabe e que vale saber.',
        pergunta: 'Que fato, imagem ou contradição faz o público perceber que falta uma peça?',
        intensidade: 3.5,
        peso: 0.6,
        ritmo: 'gatilho',
      },
      {
        chave: 'delimitacao',
        nome: 'Delimitação',
        funcao: 'Dá o contexto mínimo para a lacuna ficar precisa.',
        pergunta: 'O que o público precisa saber para formular a pergunta com as próprias palavras?',
        intensidade: 2.2,
        peso: 1.2,
        ritmo: 'contexto',
      },
      {
        chave: 'pistas',
        nome: 'Pistas',
        funcao: 'Entrega pedaços que estreitam a lacuna sem fechá-la.',
        pergunta: 'Que respostas parciais aproximam o público da resposta e o deixam mais perto de adivinhar?',
        intensidade: 3.3,
        peso: 1.8,
        ritmo: 'tensao',
      },
      {
        chave: 'revelacao',
        nome: 'Revelação',
        funcao: 'Fecha a lacuna.',
        pergunta: 'A resposta é pelo menos do tamanho da pergunta que você fez crescer?',
        intensidade: 4.6,
        peso: 0.6,
        ritmo: 'climax',
      },
      {
        chave: 'consequencia',
        nome: 'Consequência',
        funcao: 'Mostra o que a resposta muda no entendimento do público.',
        pergunta: 'Depois de saber isso, o que o público vê diferente?',
        intensidade: 2.5,
        peso: 1,
        ritmo: 'eco',
      },
    ],
    origem: 'Psicologia da curiosidade (teoria da lacuna de informação) e teoria do afeto estrutural das histórias.',
    fontes: [loewenstein, kang, brewer, berlyne],
    armadilha:
      'É a mecânica do caça-clique: prometer uma revelação que não compensa a espera, ou esticar a lacuna com pistas falsas. O público perdoa uma resposta simples, mas não uma resposta menor do que a pergunta.',
    realizacoes: [
      'Numa primeira frase: um fato que parece contradizer o que o público sabe, sem a explicação.',
      'Num bloco de aula: começar pela pergunta que o conceito resolve, antes de dar nome ao conceito.',
      'Num documentário: um mistério organiza a peça inteira, cada capítulo traz uma resposta parcial, e a peça que falta fica para o final.',
    ],
  },

  // 12 -----------------------------------------------------------------------
  {
    id: 'suspense-e-alivio',
    nome: 'Suspense e alívio',
    escala: 'ambas',
    serve: 'Manter o público investido num desfecho incerto que ele pode antever.',
    logica:
      'Suspense não é surpresa: funciona porque o público sabe o que pode acontecer e teme ou deseja o resultado. Ele depende de o público se importar com quem será afetado e de o desfecho ruim parecer provável, mas não certo. O alívio no fim é parte da estrutura: a excitação que sobra da tensão intensifica a emoção seguinte.',
    etapas: [
      {
        chave: 'possibilidade',
        nome: 'Possibilidade',
        funcao: 'Mostra ao público que algo importante pode acontecer.',
        pergunta: 'O que o público sabe que pode acontecer, talvez antes de quem está na cena?',
        intensidade: 3,
        peso: 0.8,
        ritmo: 'preparacao',
      },
      {
        chave: 'importancia',
        nome: 'O que está em jogo',
        funcao: 'Faz o público se importar com quem ou com o que será afetado.',
        pergunta: 'Por que o público se importaria com o resultado?',
        intensidade: 2.5,
        peso: 1,
        ritmo: 'contexto',
      },
      {
        chave: 'retardo',
        nome: 'Retardo',
        funcao: 'Adia o desfecho enquanto a chance de dar certo ou errado oscila.',
        pergunta: 'O que, durante a espera, muda a probabilidade do desfecho?',
        intensidade: 4,
        peso: 2,
        ritmo: 'tensao',
      },
      {
        chave: 'desfecho',
        nome: 'Desfecho',
        funcao: 'Resolve a incerteza.',
        pergunta: 'O resultado é coerente com o que foi armado e, ainda assim, não era certo?',
        intensidade: 5,
        peso: 0.6,
        ritmo: 'climax',
      },
      {
        chave: 'alivio',
        nome: 'Alívio',
        funcao: 'Deixa a tensão se dissipar e dá tempo para o público sentir o resultado.',
        pergunta: 'Quanto tempo o público precisa para absorver o que aconteceu?',
        intensidade: 1.8,
        peso: 0.8,
        ritmo: 'respiro',
      },
    ],
    origem: 'Psicologia do entretenimento (teoria do suspense) e prática de direção de cinema.',
    fontes: [zillmann1996, brewer, truffaut, hoeken, gerrig],
    armadilha:
      'Fica mecânico quando o retardo é só enrolação (nada muda na probabilidade enquanto se espera), ou quando todo desfecho termina bem e o público aprende que não há risco real.',
    realizacoes: [
      'Numa frase longa: o sujeito é anunciado, a ação é adiada por orações intercaladas, e o verbo decisivo chega no fim.',
      'Num vídeo de processo: o público sabe que uma etapa pode dar errado e acompanha a execução sem cortes.',
      'Numa história de ficção: o público vê o perigo que o personagem não vê, e a cena seguinte é calma de propósito.',
    ],
  },

  // 13 -----------------------------------------------------------------------
  {
    id: 'piramide-invertida',
    nome: 'Pirâmide invertida',
    escala: 'ambas',
    serve: 'Garantir que o público leve o essencial mesmo que pare no meio.',
    logica:
      'Consolidada no jornalismo no fim do século XIX, organiza a informação por importância decrescente: quem para em qualquer ponto já levou o mais importante. Ela troca o prazer da descoberta pela garantia de entendimento. Serve quando o público precisa da informação, não da experiência.',
    etapas: [
      {
        chave: 'essencial',
        nome: 'Essencial',
        funcao: 'Entrega o fato principal e por que ele importa.',
        pergunta: 'Se o público só ouvisse uma frase, qual deveria ser?',
        intensidade: 4,
        peso: 0.8,
        ritmo: 'gatilho',
      },
      {
        chave: 'contexto',
        nome: 'Contexto',
        funcao: 'Explica causas, antecedentes e quem é afetado.',
        pergunta: 'O que o público precisa para entender o alcance do fato principal?',
        intensidade: 2.5,
        peso: 1.5,
        ritmo: 'contexto',
      },
      {
        chave: 'detalhes',
        nome: 'Detalhes',
        funcao: 'Aprofunda para quem quer mais.',
        pergunta: 'O que interessa a quem ficou até aqui, e poderia ser cortado sem prejuízo para quem saiu?',
        intensidade: 2,
        peso: 2,
        ritmo: 'contexto',
      },
      {
        chave: 'complementos',
        nome: 'Complementos',
        funcao: 'Informações secundárias e de referência.',
        pergunta: 'O que é útil ter à mão, mas ninguém sentiria falta se não estivesse aqui?',
        intensidade: 1.5,
        peso: 0.8,
        ritmo: 'respiro',
      },
    ],
    origem: 'Jornalismo noticioso.',
    fontes: [pottker, scanlan],
    armadilha:
      'Tudo o que vem depois do topo tende a parecer apêndice; como estrutura de história ou de vídeo longo, esvazia a curiosidade logo no início e produz uma curva que só desce.',
    realizacoes: [
      'Numa legenda: a informação principal em uma linha e o resto disponível para quem quiser.',
      'Num aviso em vídeo: o que muda e para quem nos primeiros segundos; o porquê e as exceções depois.',
      'Como parte de uma peça narrativa: um bloco de resumo que responde ao que o público precisa lembrar antes de seguir.',
    ],
  },

  // 14 -----------------------------------------------------------------------
  {
    id: 'caso-nucleo-desenvolvimento',
    nome: 'Caso, núcleo e desenvolvimento',
    escala: 'macro',
    serve: 'Fazer um tema amplo ser sentido através de um caso concreto antes de ser explicado.',
    logica:
      'Tradição da reportagem: um caso particular abre a peça, e um parágrafo-núcleo diz ao público por que aquele caso importa, ligando-o a algo maior. O caso dá corpo ao tema; o núcleo dá sentido ao caso. O fecho costuma voltar ao caso do começo, agora entendido de outro jeito.',
    etapas: [
      {
        chave: 'caso',
        nome: 'Caso',
        funcao: 'Abre com uma pessoa, lugar ou cena concreta que encarna o tema.',
        pergunta: 'Que situação específica contém o tema inteiro em miniatura?',
        intensidade: 3,
        peso: 1.2,
        ritmo: 'gatilho',
      },
      {
        chave: 'nucleo',
        nome: 'Núcleo',
        funcao: 'Mostra que o caso é exemplo de algo maior e por que isso importa agora.',
        pergunta: 'Por que o público deveria se importar com este caso além dele mesmo?',
        intensidade: 3.5,
        peso: 0.5,
        ritmo: 'virada',
      },
      {
        chave: 'desenvolvimento',
        nome: 'Desenvolvimento',
        funcao: 'Explora o tema com dados, vozes e outros casos.',
        pergunta: 'Que partes do tema o caso de abertura não mostra, e como mostrá-las?',
        intensidade: 2.5,
        peso: 2.5,
        ritmo: 'contexto',
      },
      {
        chave: 'retorno',
        nome: 'Retorno',
        funcao: 'Volta ao caso do começo, agora visto à luz de tudo o que foi mostrado.',
        pergunta: 'O que o público entende sobre o caso inicial que não entendia no começo?',
        intensidade: 3,
        peso: 0.8,
        ritmo: 'eco',
      },
    ],
    origem: 'Jornalismo de reportagem (a fórmula do Wall Street Journal e o "nut graf").',
    fontes: [blundell, scanlan, heath],
    armadilha:
      'Virou cacoete de reportagem: a anedota de abertura escolhida só por ser curiosa, sem representar de fato o tema, e o retorno final usado como enfeite sentimental.',
    realizacoes: [
      'Num parágrafo: um detalhe concreto, e a frase seguinte revela que ele é exemplo de algo maior.',
      'Num vídeo explicativo: o começo acompanha uma situação específica, e só depois aparece o assunto geral.',
      'Numa série de reportagens: cada episódio abre com um caso diferente, e todos convergem para o mesmo núcleo.',
    ],
  },

  // 15 -----------------------------------------------------------------------
  {
    id: 'circulo-de-historia',
    nome: 'Círculo de história',
    escala: 'macro',
    serve: 'Contar uma mudança de alguém que sai do conhecido, paga um preço e volta diferente.',
    logica:
      'Harmon simplificou a jornada do herói de Campbell em oito passos num círculo: a metade de cima é o mundo conhecido, a de baixo o desconhecido. A ideia útil é a simetria: o que se busca na descida custa algo, e a volta mostra a mudança pelo contraste com o começo. O próprio Harmon trata o círculo como um ritmo natural, não como lista de tarefas.',
    etapas: [
      {
        chave: 'zona',
        nome: 'Zona conhecida',
        funcao: 'Mostra alguém num lugar ou estado familiar.',
        pergunta: 'Onde essa pessoa (ou ideia) está confortável, e o que falta nesse conforto?',
        intensidade: 2,
        peso: 1,
        ritmo: 'contexto',
      },
      {
        chave: 'desejo',
        nome: 'Desejo',
        funcao: 'Revela o que ela quer ou precisa.',
        pergunta: 'O que ela quer, e isso é o mesmo que ela precisa?',
        intensidade: 2.5,
        peso: 0.8,
        ritmo: 'preparacao',
      },
      {
        chave: 'desconhecido',
        nome: 'Travessia',
        funcao: 'Ela entra numa situação que não conhece.',
        pergunta: 'Qual é o "lugar" desconhecido: um espaço, uma ideia, uma relação, uma perda?',
        intensidade: 3.5,
        peso: 1,
        ritmo: 'gatilho',
      },
      {
        chave: 'adaptacao',
        nome: 'Adaptação',
        funcao: 'Ela tenta se virar com as regras novas.',
        pergunta: 'O que ela precisa aprender ou abandonar para sobreviver ali?',
        intensidade: 3,
        peso: 1.5,
        ritmo: 'tensao',
      },
      {
        chave: 'conquista',
        nome: 'Conquista',
        funcao: 'Ela consegue o que buscava.',
        pergunta: 'O que ela encontra, e é o que esperava?',
        intensidade: 4,
        peso: 0.8,
        ritmo: 'virada',
      },
      {
        chave: 'preco',
        nome: 'Preço',
        funcao: 'A conquista custa algo importante.',
        pergunta: 'O que ela perde ou entrega em troca?',
        intensidade: 4.8,
        peso: 1,
        ritmo: 'climax',
      },
      {
        chave: 'retorno',
        nome: 'Retorno',
        funcao: 'Ela volta ao mundo conhecido.',
        pergunta: 'Como é voltar para um lugar que continua igual quando ela não é mais a mesma?',
        intensidade: 3,
        peso: 1,
        ritmo: 'resolucao',
      },
      {
        chave: 'mudanca',
        nome: 'Mudança',
        funcao: 'Mostra a diferença pelo contraste com o começo.',
        pergunta: 'Que gesto, do mesmo tipo do primeiro passo, mostra a mudança sem explicá-la?',
        intensidade: 2.5,
        peso: 0.8,
        ritmo: 'eco',
      },
    ],
    origem: 'Roteiro de televisão, derivado da mitologia comparada.',
    fontes: [harmon, campbell],
    armadilha:
      'Com oito passos nomeados, é fácil preencher caixas, e toda história passa a ter a mesma forma. O desconhecido não precisa ser um lugar nem uma aventura; pode ser uma conversa, uma ideia ou uma perda. Campbell descrevia mitos, não receitava roteiros.',
    realizacoes: [
      'Num vídeo pessoal de poucos minutos: o círculo inteiro acontece numa tarde, e a travessia é uma conversa.',
      'Num episódio de série: cada personagem principal percorre um círculo pequeno enquanto a série percorre um grande.',
      'Numa peça de divulgação científica: o protagonista é uma ideia que sai do lugar seguro, é testada e volta modificada.',
    ],
  },

  // 16 -----------------------------------------------------------------------
  {
    id: 'relato-de-experiencia',
    nome: 'Relato de experiência',
    escala: 'ambas',
    serve: 'Contar algo vivido de um jeito que o público entenda por que vale a pena ouvir.',
    logica:
      'Labov e Waletzky analisaram relatos orais de pessoas comuns e encontraram uma forma recorrente. O achado mais útil é a avaliação: o momento em que quem conta suspende a ação para mostrar por que ela importa. Sem avaliação, o relato é uma sequência de fatos; com ela, tem um ponto. Suspender a ação logo antes do desfecho também aumenta a tensão.',
    etapas: [
      {
        chave: 'resumo',
        nome: 'Resumo',
        funcao: 'Anuncia, em pouco, do que se trata.',
        pergunta: 'Em uma linha, o que o público vai ouvir, sem entregar o desfecho?',
        intensidade: 3,
        peso: 0.4,
        ritmo: 'gatilho',
      },
      {
        chave: 'orientacao',
        nome: 'Orientação',
        funcao: 'Situa: quem, onde, quando, em que circunstância.',
        pergunta: 'Qual é o menor conjunto de detalhes que põe o público dentro da situação?',
        intensidade: 2,
        peso: 1,
        ritmo: 'contexto',
      },
      {
        chave: 'complicacao',
        nome: 'Complicação',
        funcao: 'A sequência de ações que cria o problema.',
        pergunta: 'O que aconteceu, em ordem, que tirou tudo do normal?',
        intensidade: 3.8,
        peso: 1.5,
        ritmo: 'tensao',
      },
      {
        chave: 'avaliacao',
        nome: 'Avaliação',
        funcao: 'Suspende a ação para mostrar o que estava em jogo e por que isso importa.',
        pergunta: 'Onde você para e mostra, sem sermão, por que aquilo foi importante?',
        intensidade: 3.3,
        peso: 0.8,
        ritmo: 'preparacao',
      },
      {
        chave: 'resolucao',
        nome: 'Resolução',
        funcao: 'O que finalmente aconteceu.',
        pergunta: 'Como terminou, e o fim responde à tensão criada?',
        intensidade: 4.3,
        peso: 0.7,
        ritmo: 'climax',
      },
      {
        chave: 'coda',
        nome: 'Coda',
        funcao: 'Traz o público de volta ao presente.',
        pergunta: 'Como a história se liga ao agora, de quem conta ou de quem ouve?',
        intensidade: 2,
        peso: 0.4,
        ritmo: 'eco',
      },
    ],
    origem: 'Sociolinguística (análise de narrativas orais de experiência pessoal).',
    fontes: [labov, labov1972],
    armadilha:
      'Vira anedota de palestra quando a avaliação é uma moral explícita no fim, em vez de estar espalhada nos detalhes, nas comparações e no ritmo da própria complicação.',
    realizacoes: [
      'Numa fala de trinta segundos: uma linha de resumo, um detalhe de lugar, o acontecimento e uma frase que traz para o agora.',
      'Numa entrevista: a avaliação aparece quando a pessoa desacelera e descreve o que pensou naquele instante.',
      'Num podcast narrativo: a orientação é longa e sensorial, e a avaliação chega pela voz de outras pessoas.',
    ],
  },

  // 17 -----------------------------------------------------------------------
  {
    id: 'preparacao-e-pagamento',
    nome: 'Preparação e pagamento',
    escala: 'ambas',
    serve: 'Fazer o público sentir que nada estava ali por acaso e que a peça foi construída.',
    logica:
      'Um elemento plantado cedo e usado depois faz o público reconhecer algo que já tinha visto, agora com função. O prazer vem do reconhecimento: o público junta dois pontos distantes da peça. Quanto mais natural o plantio, mais forte o pagamento; quanto mais sublinhado, mais previsível.',
    etapas: [
      {
        chave: 'plantio',
        nome: 'Plantio',
        funcao: 'Mostra um elemento sem destacar sua importância.',
        pergunta: 'Como apresentar isso de modo que pareça ter outro motivo para estar aqui?',
        intensidade: 2,
        peso: 0.8,
        ritmo: 'preparacao',
      },
      {
        chave: 'distancia',
        nome: 'Distância',
        funcao: 'Deixa o público se ocupar de outras coisas.',
        pergunta: 'O que acontece entre o plantio e o pagamento que desvia a atenção do elemento?',
        intensidade: 2.8,
        peso: 2,
        ritmo: 'contexto',
      },
      {
        chave: 'lembrete',
        nome: 'Lembrete',
        funcao: 'Reativa o elemento de passagem, para ele estar à mão na memória.',
        pergunta: 'Onde o elemento pode reaparecer rapidamente, ainda sem revelar sua função?',
        intensidade: 2.5,
        peso: 0.4,
        ritmo: 'preparacao',
      },
      {
        chave: 'pagamento',
        nome: 'Pagamento',
        funcao: 'O elemento volta e decide algo.',
        pergunta: 'Em que momento o elemento muda o rumo, e isso parece inevitável olhando para trás?',
        intensidade: 4.5,
        peso: 0.6,
        ritmo: 'virada',
      },
    ],
    origem: 'Dramaturgia (o "fuzil de Tchekhov") e roteiro.',
    fontes: [tchekhov, mckee, poetica],
    armadilha:
      'Quando o plantio é destacado demais (a câmera que se demora, a frase sublinhada), o público adivinha o pagamento. Quando não há plantio nenhum, o pagamento parece trapaça.',
    realizacoes: [
      'Numa frase: uma palavra do começo reaparece no fim com outro sentido.',
      'Num vídeo explicativo: um exemplo que parecia lateral no início vira a peça-chave da explicação final.',
      'Num longa: um objeto, hábito ou fala do primeiro ato resolve o conflito do último.',
    ],
  },

  // 18 -----------------------------------------------------------------------
  {
    id: 'arco-de-sequencia',
    nome: 'Arco de sequência',
    escala: 'micro',
    serve: 'Dar forma a um trecho curto de ação ou descrição para que o momento principal tenha peso.',
    logica:
      'Estudando como as pessoas entendem sequências de quadrinhos, Cohn propôs papéis que se repetem: estabelecer a cena, iniciar a ação, o pico onde a coisa acontece e a liberação que mostra o efeito. Nos experimentos, o pico é o momento mais difícil de retirar sem perder o sentido. E cada papel pode se expandir num arco inteiro, o que é exatamente o zoom entre macro e micro.',
    etapas: [
      {
        chave: 'estabelecimento',
        nome: 'Estabelecimento',
        funcao: 'Situa quem e onde, sem ação.',
        pergunta: 'O que o público precisa ver antes de algo começar?',
        intensidade: 2,
        peso: 1,
        ritmo: 'contexto',
      },
      {
        chave: 'inicio',
        nome: 'Início',
        funcao: 'Começa o movimento que vai culminar.',
        pergunta: 'Qual gesto ou fato anuncia que algo vai acontecer?',
        intensidade: 3,
        peso: 1,
        ritmo: 'preparacao',
      },
      {
        chave: 'pico',
        nome: 'Pico',
        funcao: 'O momento em que a coisa acontece.',
        pergunta: 'Se só um momento deste trecho pudesse ficar, qual seria?',
        intensidade: 4.5,
        peso: 0.8,
        ritmo: 'climax',
      },
      {
        chave: 'liberacao',
        nome: 'Liberação',
        funcao: 'Mostra o efeito e solta a tensão.',
        pergunta: 'O que fica depois do pico, e quanto tempo o público precisa ali?',
        intensidade: 2.3,
        peso: 1,
        ritmo: 'respiro',
      },
    ],
    origem: 'Ciência cognitiva da narrativa visual.',
    fontes: [cohn, zacks],
    armadilha:
      'Usada em todo bloco, produz uma onda repetida e previsível. Nem todo trecho precisa de estabelecimento: começar direto no início, ou no próprio pico, é uma escolha legítima.',
    realizacoes: [
      'Em quatro planos: o lugar, o gesto que começa, o gesto que se completa, a reação.',
      'Num parágrafo descritivo: situar, anunciar o movimento, o instante do movimento, o que ficou depois.',
      'Numa montagem de vídeo: um bloco inteiro funciona como liberação de outro e, por dentro, tem seu próprio pequeno arco.',
    ],
  },

  // 19 -----------------------------------------------------------------------
  {
    id: 'concreto-para-abstrato',
    nome: 'Do concreto ao princípio',
    escala: 'micro',
    serve: 'Fazer o público entender e reter uma ideia abstrata, partindo de algo que ele consegue ver.',
    logica:
      'Ideias abstratas são difíceis de segurar; casos concretos são fáceis de lembrar, mas presos ao detalhe. O "desbotamento do concreto" começa pelo caso, retira detalhes aos poucos até sobrar o princípio, e então testa o princípio num caso novo. O teste final é o pico: o público descobre que entendeu, porque reconhece o princípio onde não esperava.',
    etapas: [
      {
        chave: 'caso',
        nome: 'Caso concreto',
        funcao: 'Apresenta algo que o público pode ver, tocar ou imaginar com facilidade.',
        pergunta: 'Qual situação concreta contém o princípio com o mínimo de ruído?',
        intensidade: 3,
        peso: 1.2,
        ritmo: 'gatilho',
      },
      {
        chave: 'ponte',
        nome: 'Ponte',
        funcao: 'Mostra o mesmo caso com menos detalhes, destacando só o que importa.',
        pergunta: 'Que detalhes do caso podem sumir sem que a ideia suma junto?',
        intensidade: 2.3,
        peso: 1,
        ritmo: 'contexto',
      },
      {
        chave: 'principio',
        nome: 'Princípio',
        funcao: 'Nomeia a ideia geral.',
        pergunta: 'Qual é a formulação mais curta do que o caso mostrou?',
        intensidade: 2.5,
        peso: 0.8,
        ritmo: 'resolucao',
      },
      {
        chave: 'transferencia',
        nome: 'Transferência',
        funcao: 'Aplica o princípio num caso que parece diferente.',
        pergunta: 'Onde esse princípio aparece em algo que, à primeira vista, não tem nada a ver?',
        intensidade: 3.8,
        peso: 0.8,
        ritmo: 'virada',
      },
    ],
    origem: 'Psicologia da aprendizagem e prática de comunicação de ideias.',
    fontes: [fyfe, heath, mayerMoreno],
    armadilha:
      'O exemplo de abertura vira decoração quando não é ele que depois é abstraído (conta-se um caso e depois se fala de outra coisa). E o caso final não pode ser o primeiro com outro nome.',
    realizacoes: [
      'Numa frase: um objeto do dia a dia, e a propriedade dele que interessa.',
      'Num bloco de aula: um problema resolvido com material concreto, depois com um desenho, depois com símbolos.',
      'Num vídeo inteiro: cada capítulo abre com um caso e termina com o princípio que ele revela; o último aplica todos a um caso inesperado.',
    ],
  },
]
