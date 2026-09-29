# Pesquisa da biblioteca narrativa

> Base de pesquisa das estruturas, funções de ritmo e modelos de curva do Enredo.
> Os dados vivem em `src/biblioteca/estruturas.ts`, `funcoes.ts` e `curvas.ts`. A intenção do produto está em `docs/brief.md`.
> Versão 1, 2026-09-29.

## Para que serve este documento

O brief pede que a biblioteca "nasça de uma base muito mais profunda do que templates de conteúdo". Este documento registra essa base: para cada fonte usada, **o que ela diz**, **quanto dá para confiar nela** e **que decisão ela gerou no produto**. Ele também registra o que foi deixado de fora de propósito.

Regra de leitura: nenhuma fonte aqui "prova" que uma estrutura funciona. As estruturas são ferramentas de pensamento. A pesquisa serve para escolher bem as ferramentas, descrever com honestidade o que cada uma faz e evitar vender mito como ciência.

### Legenda do grau de evidência

| Grau | O que significa |
|---|---|
| **A** | Pesquisa empírica com replicação ou meta-análise. O efeito existe; a dúvida é quanto ele se transfere para roteiro. |
| **B** | Pesquisa empírica pontual, ou modelo teórico com alguns testes. Plausível, com limites claros. |
| **C** | Tradição de ofício ou teoria consolidada, sem teste empírico direto. Vale pela longevidade e pelo uso por quem escreve. |
| **D** | Opinião, popularização ou regra de bolso. Usado só como ilustração, ou nem isso. |

Quase tudo que fala de **estrutura narrativa** é grau C. Quase tudo que fala de **atenção, memória e emoção** é grau A ou B, mas foi medido em laboratório, com tarefas diferentes de assistir a um vídeo ou ler um roteiro. A ponte entre os dois é sempre uma inferência, e este documento diz quando ela está sendo feita.

---

## Princípios que saem da pesquisa

Cinco decisões gerais atravessam todos os dados.

1. **A curva mede intensidade, não valência.** Intensidade é o quanto o trecho exige e ativa (atenção, tensão, energia). Valência é se ele é "bom" ou "ruim" para o personagem ou para o público. Estudos como o de Reagan et al. (2016) medem valência (felicidade das palavras ao longo do texto). Um "fundo do poço" é valência baixa, mas pode ser intensidade alta (crise) ou baixa (silêncio). Os dados do Montagem usam só intensidade, e as curvas inspiradas em estudos de valência foram convertidas à mão, com critério explicado em cada caso.
2. **A curva é intenção, não previsão.** Como o brief diz, ela representa "uma intenção de ritmo, não uma promessa de que o público vai reagir daquela forma". Nenhum dado aqui promete retenção.
3. **Contraste vale mais que nível.** Todas as curvas têm vales deliberados. Nenhuma estrutura tem todas as etapas altas. (Ver "Contraste e vales".)
4. **Intenção antes de estrutura.** Cada estrutura tem o campo `serve`, que começa com um verbo e descreve a intenção que ela costuma servir. A biblioteca deve ser consultada a partir da intenção ("quero fazer o público questionar uma crença"), e não do formato ("quero um vídeo de três atos").
5. **A mesma lógica em todas as escalas.** Várias estruturas são `ambas` (macro e micro), e as realizações de cada uma aparecem em escalas diferentes (frase, cena, peça inteira). (Ver "Macro e micro".)

---

## Parte 1. As fontes, uma por uma

### 1.1 Dramaturgia e teoria da narrativa

**Aristóteles, *Poética* (c. 335 a.C.)**
- *O que diz:* uma ação completa tem começo, meio e fim (cap. 7); os melhores enredos ligam os acontecimentos por necessidade ou probabilidade, e não por mera sucessão (cap. 9); os momentos mais fortes são a *peripécia* (inversão da situação) e o *reconhecimento* (passagem da ignorância ao conhecimento), sobretudo quando acontecem juntos (cap. 11); toda tragédia tem complicação e desenlace (cap. 18).
- *Evidência:* C. É a base de quase toda teoria de roteiro ocidental, mas é descrição de um gênero (tragédia grega), não lei.
- *No produto:* a ideia de *reconhecimento* sustenta `expectativa-quebra-reinterpretacao` e `preparacao-e-pagamento`. A exigência de ligação causal entre eventos reaparece em `mas-portanto`. A função de ritmo `virada` vem da peripécia.

**Gustav Freytag, *Die Technik des Dramas* (1863; trad. inglesa 1894)**
- *O que diz:* o drama em cinco partes (introdução, subida, clímax, queda ou retorno, catástrofe), com três "momentos" de passagem: o incidente que dispara a ação, o momento trágico que inicia a queda e o momento de último suspense antes do desfecho. O desenho da "pirâmide" coloca o clímax no centro.
- *Evidência:* C. Freytag analisava Shakespeare e a tragédia alemã. Não é teoria de "toda história".
- *No produto:* estrutura `ascensao-climax-queda` e curva `ascensao-e-queda`, com o "último suspense" como marco. A armadilha diz explicitamente que o pico central não é regra; para peças que pedem força no fim existe a curva `escalada-com-pico-tardio`.

**Robert McKee, *Story* (1997)**
- *O que diz:* uma cena acontece quando há uma lacuna entre o que o personagem espera que aconteça quando age e o que de fato acontece; cada lacuna muda o valor em jogo (de positivo para negativo, ou o contrário). A história é uma hierarquia: batida, cena, sequência, ato, história. As complicações devem ser progressivas, cada uma mais forte que a anterior.
- *Evidência:* C. Muito influente no ofício do roteiro; sem teste empírico.
- *No produto:* a lacuna expectativa/resultado é a mesma lógica de `expectativa-quebra-reinterpretacao`, agora vista pelo lado do personagem. A hierarquia batida-cena-ato é um argumento para o "zoom narrativo" (Parte 3). As complicações progressivas moldam a curva `escalada-com-pico-tardio`.

**Syd Field, *Screenplay* (1979)**
- *O que diz:* o paradigma em três atos (apresentação, confronto, resolução), com dois pontos de virada que mudam a direção da história.
- *Evidência:* C, com um alerta: a popularização transformou as posições das viradas em números de página, o que é regra de bolso (D).
- *No produto:* marcos "primeira virada" e "segunda virada" na curva `escalada-com-pico-tardio`, com armadilha dizendo para movê-los.

**Tzvetan Todorov, "The Two Principles of Narrative" (1971)**
- *O que diz:* a narrativa mínima completa é a passagem de um equilíbrio a outro: uma situação estável é perturbada, e uma força em sentido contrário restabelece um equilíbrio parecido com o primeiro, mas nunca idêntico.
- *Evidência:* C (narratologia estrutural).
- *No produto:* estrutura `estado-ruptura-novo-estado` (exigida pelo brief) e curva `transformacao`. A frase "parecido com o primeiro, nunca idêntico" virou a pergunta-guia da etapa "Novo estado".

**Vladimir Propp, *Morfologia do conto maravilhoso* (1928)**
- *O que diz:* analisando contos russos, Propp mostrou que os personagens e as ações mudam de um conto para outro, mas as *funções* (o papel que uma ação cumpre no enredo) se repetem. A mesma função pode ser realizada por um dragão, uma bruxa ou um irmão invejoso.
- *Evidência:* C.
- *No produto:* é o argumento central da "arquitetura invisível" (Parte 4): o que se repete é a função, não a superfície. Por isso as etapas têm um campo `funcao` e as realizações variam de propósito.

**Dan Harmon, "Story Structure 101" (c. 2009) e Joseph Campbell, *O herói de mil faces* (1949)**
- *O que diz:* Campbell descreveu um padrão comum a muitos mitos (partida, iniciação, retorno). Harmon reduziu isso a um círculo de oito passos: conforto, desejo, entrada no desconhecido, adaptação, conquista, preço, retorno, mudança. A metade de cima é o mundo conhecido; a de baixo, o desconhecido.
- *Evidência:* C para Harmon (ofício). Para Campbell, C com ressalva forte: o monomito é criticado por folcloristas por escolher exemplos que confirmam o padrão e ignorar os que não confirmam.
- *No produto:* estrutura `circulo-de-historia`, com armadilha contra o preenchimento de caixas e com a lembrança de que o "desconhecido" pode ser uma conversa ou uma ideia. Campbell entra só como origem, nunca como estrutura própria de 12 ou 17 passos (ver "O que NÃO usar").

**Kishōtenketsu (起承転結)**
- *O que diz:* forma em quatro tempos herdada da poesia clássica chinesa (qǐ chéng zhuǎn hé) e usada como padrão de composição no Japão: apresentação, desenvolvimento, deslocamento para um elemento aparentemente sem relação, e conclusão que revela a ligação. Hinds (1983) a descreveu analisando colunas de jornal japonesas e mostrou que o leitor de língua inglesa estranha o terceiro tempo, porque espera uma digressão ser marcada; Maynard (1998) a situa no discurso japonês mais amplo.
- *Evidência:* C para a forma; B para a observação de Hinds sobre leitores (estudo de retórica contrastiva, com críticas posteriores sobre generalização).
- *No produto:* estrutura `kishotenketsu` e curva `quatro-tempos`. A armadilha corrige a versão popular na internet, que a vende como "estrutura sem conflito".

**Anton Tchekhov, carta de 1889 (o "fuzil no palco")**
- *O que diz:* não se deve pôr em cena um elemento que não será usado. O princípio foi generalizado no ofício como preparação e pagamento (*setup/payoff*).
- *Evidência:* C.
- *No produto:* estrutura `preparacao-e-pagamento`, com a etapa "Distância" (o público precisa se ocupar de outra coisa para o reconhecimento funcionar).

**Trey Parker e Matt Stone, aula na NYU para a série "Stand In" da mtvU (2011)**
- *O que diz:* se entre duas batidas de uma história cabe "e então", a história não funciona; entre elas deve caber "mas" ou "portanto".
- *Evidência:* C (conselho de ofício). Mas tem apoio empírico indireto em Trabasso e van den Broek (1985, ver 1.4): eventos numa cadeia causal são mais lembrados e julgados mais importantes.
- *No produto:* estrutura `mas-portanto`. A armadilha avisa contra escrever as palavras literalmente.

### 1.2 Retórica e argumentação

**Aristóteles, *Retórica*, livro III (c. 350 a.C.)**
- *O que diz:* um discurso precisa, no mínimo, de duas partes: enunciar a tese e prová-la. As outras (proêmio, narração, refutação, epílogo) existem por causa do público. O epílogo tem quatro tarefas: deixar o público bem disposto, ampliar ou diminuir, despertar emoção e recapitular.
- *Evidência:* C.
- *No produto:* estrutura `dispositio-classica` e curva `argumento-com-fecho-forte`. As quatro tarefas do epílogo viraram a função da etapa "Peroração".

**Cícero (*De Inventione*), *Rhetorica ad Herennium* e Quintiliano (*Institutio Oratoria*)**
- *O que dizem:* consolidam a *dispositio* latina em seis partes: exórdio, narração, divisão, confirmação, refutação e peroração. Quintiliano insiste que a ordem deve se adaptar ao caso e ao público.
- *Evidência:* C.
- *No produto:* as cinco etapas de `dispositio-classica` (a "divisão", que anuncia os pontos, foi fundida à narração para manter o esqueleto enxuto; ver "Decisões para revisar").

**Stephen Toulmin, *The Uses of Argument* (1958)**
- *O que diz:* argumentos práticos têm seis partes: afirmação, dados, garantia (a regra que liga dados à afirmação), apoio da garantia, qualificador (grau de certeza) e refutação (condições em que a afirmação não vale).
- *Evidência:* C (filosofia). Muito usado no ensino de escrita argumentativa.
- *No produto:* estrutura micro `argumento-com-ressalva`. O apoio foi incorporado à etapa "Garantia"; qualificador e refutação viraram "Ressalva" e "Conclusão medida". A ressalva ganhou intensidade um pouco mais alta porque é onde a dúvida do público é tocada.

**Alan H. Monroe, *Principles and Types of Speech* (1935): sequência motivada**
- *O que diz:* atenção, necessidade, satisfação, visualização e ação, na ordem em que uma pessoa decidiria.
- *Evidência:* B fraca. Micciche, Pryor e Butler (2000) compararam a ordem de Monroe com a ordem invertida e com ordem aleatória: **nenhuma diferença na mudança de atitude**; a versão de Monroe só foi julgada mais compreensível em uma de quatro comparações.
- *No produto:* estrutura `sequencia-motivada`, com a lógica e a armadilha dizendo claramente que ela ajuda a organizar, não comprovadamente a convencer.

**Barbara Minto, *The Pyramid Principle* (1985): situação, complicação, pergunta, resposta**
- *O que diz:* textos de trabalho devem começar com uma história mínima que leva o leitor à pergunta que o texto responde; depois, a resposta vem no topo e os argumentos embaixo, agrupados.
- *Evidência:* C (prática de consultoria).
- *No produto:* estrutura `situacao-complicacao-pergunta-resposta`. A lógica lembra que a ordem pode mudar conforme o público.

### 1.3 Jornalismo e não-ficção

**Pirâmide invertida (Pöttker, 2003; Scanlan, 2000)**
- *O que diz:* organizar a notícia por importância decrescente. Pöttker estudou jornais americanos e mostrou que a forma só se tornou dominante no fim do século XIX, e liga sua adoção mais à busca de compreensibilidade do que ao telégrafo, a explicação popular.
- *Evidência:* B para a história da forma; C para seu valor.
- *No produto:* estrutura `piramide-invertida` e curva `essencial-primeiro`, com a armadilha de que, em peças longas, a curva só desce.

**Fórmula do *Wall Street Journal* e *nut graf* (Blundell, 1988; Scanlan, 2000)**
- *O que diz:* abrir uma reportagem com um caso concreto, seguido de um parágrafo-núcleo que diz por que aquilo importa, desenvolver o tema e voltar ao caso no fim.
- *Evidência:* C.
- *No produto:* estrutura `caso-nucleo-desenvolvimento`.

**Ampulheta (Roy Peter Clark, 1984)**
- *O que diz:* começa como pirâmide invertida (o essencial), passa por uma transição e conta o resto em ordem cronológica.
- *Evidência:* C.
- *No produto:* não virou estrutura própria (é uma combinação de `piramide-invertida` com uma narrativa cronológica); fica como candidata a uma próxima versão.

**Chip Heath e Dan Heath, *Made to Stick* (2007)**
- *O que diz:* ideias que ficam na memória tendem a ser simples, inesperadas, concretas, críveis, emocionais e contadas como história. "Inesperado" é usar a quebra de expectativa para ganhar atenção e a curiosidade para mantê-la.
- *Evidência:* C/D. É divulgação baseada em estudos de caso e em pesquisa de terceiros, não pesquisa própria controlada.
- *No produto:* apoio secundário para `concreto-para-abstrato` e `caso-nucleo-desenvolvimento`. Não é citado como evidência de nada sozinho.

### 1.4 Psicologia da narrativa, da expectativa e da emoção

**Brewer e Lichtenstein (1982): teoria do afeto estrutural**
- *O que diz:* a *ordem* em que os eventos são contados produz três afetos diferentes. **Suspense**: o público conhece o evento que inicia o perigo e espera o desfecho. **Curiosidade**: o público sabe que falta uma informação do passado (ex.: quem fez). **Surpresa**: uma informação escondida é revelada de repente e obriga a reler o que veio antes. Histórias com esses arranjos são julgadas mais "história" do que as sem eles.
- *Evidência:* B/A. Replicado e estendido; Hoeken e van Vliet (2000) mostraram que a surpresa foi a manipulação mais eficaz para apreciação e para lembrança dos eventos.
- *No produto:* é a espinha das três estruturas de "arranjo de informação": `suspense-e-alivio`, `lacuna-de-curiosidade` e `expectativa-quebra-reinterpretacao`. Também explica por que o Montagem trata a ordem dos blocos na timeline como decisão narrativa, e não só logística.

**George Loewenstein (1994): teoria da lacuna de informação**
- *O que diz:* curiosidade é a sensação de privação causada por uma lacuna percebida entre o que se sabe e o que se quer saber. Ela depende de a pessoa já saber algo (conhecimento zero não gera curiosidade) e cresce à medida que a lacuna fica mais específica.
- *Evidência:* A/B. Kang et al. (2009) mostraram que a curiosidade é maior em nível intermediário de confiança (curva em U invertido) e que respostas a perguntas que despertaram curiosidade são mais bem lembradas; Gruber, Gelman e Ranganath (2014) mostraram que o estado de curiosidade melhora até a memória de informações incidentais.
- *No produto:* estrutura `lacuna-de-curiosidade` e curva `curiosidade-crescente`. A decisão de colocar um **vale de contexto logo depois da abertura** vem daqui: é o contexto que torna a lacuna específica e, portanto, mais forte.

**Dolf Zillmann: suspense (1996) e transferência de excitação (1971)**
- *O que diz:* suspense é uma reação de medo ou esperança por personagens com quem o público se importa, diante de um desfecho ruim que parece provável, mas não certo. A *transferência de excitação* mostra que a ativação fisiológica de um momento não some na hora: ela "vaza" para o seguinte e amplifica a emoção dele. Por isso o alívio depois do suspense é sentido com mais força.
- *Evidência:* A para a transferência de excitação (paradigma replicado); B para o modelo de suspense.
- *No produto:* estrutura `suspense-e-alivio` (com a etapa "Alívio" em intensidade baixa) e curva `ondas-de-suspense`. É um dos argumentos para "picos precisam de vales" (Parte 2).

**Alfred Hitchcock em *Hitchcock/Truffaut* (1966)**
- *O que diz:* a bomba debaixo da mesa. Se ela explode sem aviso, o público tem quinze segundos de surpresa; se ele sabe que ela está lá, tem quinze minutos de suspense.
- *Evidência:* C (ofício). Coerente com Brewer e Lichtenstein.
- *No produto:* realização "o público vê o perigo que o personagem não vê" em `suspense-e-alivio`.

**David Huron, *Sweet Anticipation* (2006): teoria ITPRA**
- *O que diz:* a expectativa tem cinco respostas no tempo: imaginação e tensão antes do evento; previsão, reação e avaliação depois. Previsões certas dão prazer (a mente "acertou"); previsões erradas geram uma reação rápida de alerta que pode ser reavaliada como prazer (surpresa boa). O contraste entre uma reação inicial negativa e uma avaliação positiva intensifica o prazer ("valência contrastiva"). Huron também separa expectativas *esquemáticas* (do gênero, do estilo) de *verídicas* (desta obra específica, já conhecida).
- *Evidência:* B. Modelo teórico construído sobre muita pesquisa empírica em música; a transposição para narrativa é inferência, embora direta.
- *No produto:* fundamenta a quebra em `expectativa-quebra-reinterpretacao` e a ideia de que tensão antes de alívio é parte da estrutura. A distinção esquemática x verídica explica por que clichês perdem força (Parte 4).

**Jerry Suls (1972): modelo de incongruência e resolução**
- *O que diz:* no humor, o público primeiro encontra algo que não bate com a expectativa (incongruência) e depois encontra uma regra que faz aquilo fazer sentido (resolução). Só a incongruência confunde; a resolução é o que dá prazer.
- *Evidência:* B. Muito testado em pesquisa sobre humor, com debates sobre se a resolução é sempre necessária.
- *No produto:* é a razão de `expectativa-quebra-reinterpretacao` ter três etapas, e não duas: a quebra sem a nova interpretação vira só choque.

**Daniel Berlyne (1960, 1971): ativação e variáveis colativas**
- *O que diz:* novidade, surpresa, complexidade e incerteza ("variáveis colativas") elevam a ativação. O interesse e o prazer seguem um U invertido: pouco estímulo entedia, estímulo demais incomoda.
- *Evidência:* B. O U invertido aparece em muitos estudos de estética, mas nem sempre com a mesma forma.
- *No produto:* argumento direto contra "mais intensidade é sempre melhor" (Parte 2). Nenhuma estrutura tem todas as etapas acima de 4.

**Green e Brock (2000): transporte narrativo**
- *O que diz:* quanto mais a pessoa é "transportada" para dentro de uma história (atenção, imagens mentais, emoção), mais suas crenças se aproximam das da história, e menos ela procura contra-argumentos.
- *Evidência:* A (meta-análises posteriores confirmam o efeito).
- *No produto:* justifica que estruturas narrativas (e não só argumentativas) sirvam intenções de mudança de crença, como a do exemplo do brief. Também pede cuidado: transporte depende de continuidade, e picos gratuitos podem quebrá-lo.

**Trabasso e van den Broek (1985): causalidade e memória de histórias**
- *O que diz:* eventos que estão na cadeia causal da história, e que têm mais ligações causais, são mais lembrados, mais incluídos em resumos e julgados mais importantes.
- *Evidência:* A/B.
- *No produto:* apoio empírico de `mas-portanto` e da armadilha de várias estruturas ("sem acaso").

**Labov e Waletzky (1967); Labov (1972): narrativa oral de experiência**
- *O que diz:* relatos espontâneos de pessoas comuns seguem uma forma recorrente: resumo, orientação, complicação, avaliação, resolução e coda. A avaliação (o que mostra por que a história vale ser contada) costuma suspender a ação logo antes da resolução.
- *Evidência:* B (análise empírica de corpus oral; muito replicada em sociolinguística).
- *No produto:* estrutura `relato-de-experiencia`. É também a melhor evidência de que estrutura narrativa não é invenção de manual: ela aparece em fala espontânea.

**Neil Cohn (2013): gramática da narrativa visual**
- *O que diz:* em sequências de quadrinhos, os quadros assumem papéis (estabelecimento, início, pico, liberação), e qualquer papel pode ser expandido num arco inteiro com os mesmos papéis dentro. Os experimentos mostram que o pico é o quadro mais difícil de remover sem perder o sentido.
- *Evidência:* B (modelo com experimentos comportamentais e de EEG).
- *No produto:* estrutura micro `arco-de-sequencia`, e o argumento mais direto para o "zoom narrativo" (Parte 3).

**Reagan et al. (2016): formas emocionais das histórias**
- *O que diz:* analisando a valência das palavras em 1.327 livros de ficção do Projeto Gutenberg, os autores encontram seis formas básicas: ascensão ("da pobreza à riqueza"), queda (tragédia), queda e subida ("homem no buraco"), subida e queda (Ícaro), subida-queda-subida (Cinderela) e queda-subida-queda (Édipo). Os autores também relatam que algumas formas têm mais downloads que outras (o que mede popularidade, não qualidade).
- *Evidência:* B. Método computacional sólido, mas mede valência por dicionário de palavras, não intensidade, e o corpus é literatura em inglês de domínio público.
- *No produto:* inspiração para a curva `transformacao` ("homem no buraco"), convertida para intensidade: o "buraco" virou uma travessia com ondas e um vale silencioso antes da escolha. As seis formas **não** foram usadas diretamente como curvas (ver "O que NÃO usar").

**Boyd, Blackburn e Pennebaker (2020): o arco narrativo**
- *O que diz:* em cerca de 40 mil narrativas e 20 mil textos não narrativos (reportagens, palestras TED, decisões judiciais), três processos aparecem com forma regular: *preparação* (palavras de ambientação caem ao longo do texto), *progressão* do enredo e *tensão cognitiva* (palavras de raciocínio e conflito), que sobe e tende a ter o pico perto do fim, recuando no desfecho.
- *Evidência:* B/A (corpus enorme, efeito consistente; mede linguagem, não reação).
- *No produto:* apoio para quase todas as curvas começarem com contexto (preparação alta no início, depois caindo) e para o pico de tensão ficar tipicamente na segunda metade. Também mostra que textos não ficcionais têm arco, o que sustenta usar a mesma biblioteca para explicações e argumentos.

### 1.5 Atenção, memória e aprendizagem

**Kahneman et al. (1993); Fredrickson e Kahneman (1993): regra do pico e fim**
- *O que diz:* a lembrança de uma experiência é dominada pelo seu momento mais intenso e pelo seu final; a duração pesa pouco ("negligência da duração"). No experimento clássico, pessoas preferiram repetir uma experiência dolorosa *mais longa* porque ela terminava menos mal.
- *Evidência:* A. A meta-análise de Alaybek et al. (2022) confirma que o efeito é grande e robusto.
- *No produto:* justifica (1) que toda curva tenha um pico claro e um fim pensado; (2) que o fecho mereça uma função própria (`eco`); (3) que a curva `escalada-com-pico-tardio` coloque o clímax perto do fim. Inferência declarada: os estudos mediram experiências afetivas (dor, filmes curtos, férias), não roteiros.

**Efeito de posição serial (Murdock, 1962) e primazia/recência em persuasão (Miller e Campbell, 1959)**
- *O que diz:* numa lista, o começo e o fim são mais lembrados que o meio. Em persuasão, o efeito é condicional: se há tempo entre as duas mensagens e o julgamento vem logo depois, vence a última (recência); se as duas vêm juntas e o julgamento é adiado, a primeira tende a vencer (primazia).
- *Evidência:* A para listas; B para persuasão (resultados mistos, dependem do intervalo).
- *No produto:* abertura e fecho de toda estrutura têm funções explícitas; o meio recebe os "reengajamentos" que o impedem de virar zona morta. A curva `essencial-primeiro` retoma o essencial no fim.

**Efeito de isolamento de von Restorff (Hunt, 1995)**
- *O que diz:* um item diferente dos demais numa lista é mais lembrado, mas só porque o resto é homogêneo. A distinção depende do contexto.
- *Evidência:* A.
- *No produto:* argumento central da Parte 2: um pico só se destaca contra um fundo diferente dele.

**Teoria da carga cognitiva (Sweller, 1988) e princípios de Mayer (Mayer e Moreno, 2003; Mayer, 2020)**
- *O que diz:* a memória de trabalho é limitada. Conteúdo complexo é mais bem aprendido quando dividido em segmentos com pausas controladas pelo aprendiz (**segmentação**) e quando a organização é sinalizada (**sinalização**: títulos, marcadores, ênfases que mostram a estrutura).
- *Evidência:* A (muitos experimentos, com efeitos mais fortes para iniciantes e conteúdo complexo).
- *No produto:* curva `explicacao-com-reengajamento`. Os picos curtos entre blocos de contexto funcionam como fronteiras de segmento e sinalização, não como "truque de retenção". A função `contexto` foi definida como "atenção calma e contínua, não atenção de alerta".

**Segmentação de eventos (Zacks et al., 2007)**
- *O que diz:* a percepção divide a experiência contínua em eventos, em escalas finas e grossas ao mesmo tempo, e as fronteiras entre eventos são pontos privilegiados para a memória.
- *Evidência:* A/B.
- *No produto:* apoia tanto a hierarquia macro/micro (a mente já segmenta em escalas aninhadas) quanto a ideia de que mudanças de intensidade marcam fronteiras úteis.

**Organizadores prévios (Ausubel, 1960)**
- *O que diz:* apresentar antes uma estrutura geral mais abstrata ajuda a aprender e reter material novo.
- *Evidência:* B (resultados variam por tipo de organizador).
- *No produto:* a etapa "Delimitação" de `lacuna-de-curiosidade` e o "contexto mínimo" das curvas.

**Desbotamento do concreto (Fyfe, McNeil, Son e Goldstone, 2014)**
- *O que diz:* começar por representações concretas e retirar detalhes até chegar ao abstrato favorece a transferência para casos novos, em comparação a só concreto ou só abstrato.
- *Evidência:* B/A (revisão sistemática; mais forte em matemática e ciências).
- *No produto:* estrutura `concreto-para-abstrato`, com a etapa final "Transferência" como pico.

**Decremento de vigilância (Mackworth, 1948; Warm, Parasuraman e Matthews, 2008)**
- *O que diz:* em tarefas longas e monótonas de detecção, o desempenho cai ao longo do tempo, e a vigilância é trabalho mental pesado, não "descanso".
- *Evidência:* A, mas para vigilância (detectar sinais raros), não para assistir a uma narrativa.
- *No produto:* usado com cautela: é um argumento de que atenção sustentada tem custo e que monotonia prolongada cobra preço. Não é usado para definir intervalos.

**A "regra dos 10 minutos" e suas críticas (Wilson e Korn, 2007; Bunce, Flens e Neiles, 2010; Bradbury, 2016)**
- *O que diz:* a crença popular é que a atenção em aulas cai depois de 10 a 15 minutos. Wilson e Korn revisaram a evidência e encontraram pouco apoio. Bunce et al. mediram lapsos com *clickers* e acharam lapsos curtos e **frequentes ao longo de toda a aula**, a partir dos primeiros minutos, e menos lapsos logo depois de atividades ativas (perguntas, demonstrações). Bradbury revisou o tema e concluiu que o número fixo não se sustenta e que a variação depende do professor e do formato.
- *Evidência:* A crítica é B/A; a regra em si é D.
- *No produto:* **nenhuma curva usa intervalos fixos em minutos**. Os pontos são posições relativas (0 a 1), e o reengajamento está ligado ao início de uma parte nova, não ao relógio. A armadilha de `explicacao-com-reengajamento` diz isso.

**Interrupção e adaptação (Nelson e Meyvis, 2008; Nelson, Meyvis e Galak, 2009)**
- *O que diz:* as pessoas se adaptam a experiências prazerosas, e o prazer cai ao longo do tempo. Uma pausa interrompe a adaptação e torna o trecho seguinte mais intenso. No estudo de 2009, programas de TV com intervalos comerciais foram avaliados como mais agradáveis do que sem intervalos, embora as pessoas preferissem, de antemão, não ter interrupção.
- *Evidência:* A/B (seis estudos em cada artigo, com fronteiras bem definidas).
- *No produto:* talvez o argumento empírico mais direto de que **vales tornam os picos mais fortes** (Parte 2). Também explica por que o autor, e não uma métrica de retenção, deve decidir onde ficam os vales: o próprio público subestima o valor da pausa.

### 1.6 Estudos de texto e discurso

**Michael Hoey, *On the Surface of Discourse* (1983)**
- *O que diz:* um padrão muito comum em textos de todos os gêneros é situação, problema, resposta e avaliação; se a avaliação é negativa, o ciclo recomeça com uma nova resposta.
- *Evidência:* B (análise de discurso; amplamente aplicado a textos reais).
- *No produto:* base da estrutura do brief, `problema-virada-solucao`. O ciclo "avaliação negativa → nova resposta" é exatamente a etapa "Aprofundamento", onde as saídas óbvias falham.

**Kintsch e van Dijk (1978): macroestrutura**
- *O que diz:* ao ler, a pessoa constrói uma *macroestrutura*, um resumo hierárquico do sentido global, a partir das proposições locais (a *microestrutura*).
- *Evidência:* A/B (modelo muito testado em compreensão de texto).
- *No produto:* fundamenta a distinção macro/micro do brief (Parte 3).

---

## Parte 2. Contraste e vales: por que picos só funcionam com vales

O brief diz: "Se tudo estiver no máximo o tempo inteiro, nada realmente chama atenção. Os vales são tão importantes quanto os picos." A pesquisa sustenta essa intuição por cinco caminhos independentes.

1. **Distinção depende do fundo (von Restorff; Hunt, 1995).** Algo só se destaca contra um contexto diferente dele. Um pico cercado de picos não é pico: é patamar.
2. **Adaptação (Nelson e Meyvis, 2008; Nelson et al., 2009).** Intensidade contínua perde força porque o público se acostuma. Pausas reiniciam a sensibilidade e tornam o trecho seguinte mais intenso, embora as pessoas não prevejam isso.
3. **Transferência de excitação e valência contrastiva (Zillmann, 1971; Huron, 2006).** A ativação da tensão não some na hora; ela amplifica o alívio que vem depois. Sem a descida, não existe o alívio, e o pico fica sem ressonância.
4. **O U invertido (Berlyne, 1960, 1971).** Acima de certo ponto, mais novidade e intensidade deixam de interessar e passam a incomodar. "Mais" não é "melhor".
5. **Carga cognitiva e segmentação (Sweller, 1988; Mayer, 2020; Zacks et al., 2007).** Compreender custa. Os vales são onde o público assimila, e as mudanças de intensidade marcam fronteiras que ajudam a memória a organizar o conteúdo.

E um sexto, da própria arte: **suspense é espera (Zillmann; Hitchcock)**. A preparação e a antecipação acontecem em intensidade média ou baixa. Um roteiro sem vales não tem onde armar nada.

**Como isso virou dado:**
- Toda curva tem pelo menos três vales abaixo de 2,6 e nenhuma passa mais de 15% do tempo acima de 4,5.
- Toda estrutura tem pelo menos uma etapa em 2,5 ou menos.
- Três funções de ritmo (`respiro`, `contexto`, `resolucao`) existem para trechos de baixa intensidade, e elas são descritas pelo que *fazem*, não como "partes paradas".
- A curva `transformacao` tem um vale fundo (1,8) logo antes do pico máximo, e a `escalada-com-pico-tardio` tem um vale em 2,1 antes da reta final. O vale antes do pico é o desenho mais forte de contraste.
- Os vales foram posicionados por *função* (contexto, consequência, reconsideração, alívio), nunca por intervalo fixo.

**O que a interface deveria fazer com isso (sugestão, não dado):** avisar quando uma curva desenhada pelo autor passa muito tempo em nível alto sem vale, com texto do tipo "picos seguidos perdem força", e nunca sugerir "aumente a intensidade para reter".

---

## Parte 3. Macro e micro

O brief pede "zoom narrativo": a mesma lógica **Intenção → Estrutura → Realização** repetida em escalas menores. Três linhas de pesquisa dizem que isso não é só uma metáfora de interface, e sim como a compreensão funciona:

- **A mente segmenta em escalas aninhadas.** Zacks et al. (2007) mostram que as pessoas dividem a experiência em eventos grandes e pequenos ao mesmo tempo, com os pequenos contidos nos grandes.
- **O sentido global é construído a partir do local.** Kintsch e van Dijk (1978) descrevem a macroestrutura como resumo hierárquico da microestrutura. Um roteiro bom é aquele em que os dois níveis apontam para o mesmo lugar.
- **Estruturas se aninham.** Na gramática de Cohn (2013), qualquer papel de uma sequência pode se abrir num arco inteiro com os mesmos papéis dentro. McKee (1997) descreve a mesma hierarquia no ofício: batida, cena, sequência, ato, história. Labov encontra a forma completa do relato numa fala de trinta segundos.

**Como isso virou dado:**
- O campo `escala` classifica cada estrutura: 6 macro, 4 micro e 9 que funcionam nas duas.
- As `realizacoes` de cada estrutura cobrem escalas diferentes (frase, cena ou bloco, peça inteira), para mostrar que o mesmo esqueleto aceita tamanhos muito diferentes.
- O exemplo do brief está montado nos dados: a estrutura macro `problema-virada-solucao` tem uma etapa `virada`, e a estrutura micro `expectativa-quebra-reinterpretacao` é a candidata natural para construir essa etapa por dentro.
- `estado-ruptura-novo-estado` foi mantida com três etapas de propósito: a "travessia" entre ruptura e novo estado é o lugar óbvio para o autor dar zoom e aplicar outra estrutura.
- As funções de ritmo são as mesmas nas duas escalas. Uma etapa macro com ritmo `virada` pode conter, dentro dela, uma curva micro inteira com seus próprios vales e picos.

**Uma regra para a interface (sugestão):** quando o autor entra num bloco, a curva micro deve se desenhar *dentro da faixa* da função daquele bloco no macro. Uma virada macro (3,5 a 5) pode ter um vale micro de 2,5, mas o conjunto do bloco deve continuar lido como virada quando o autor volta ao macro.

---

## Parte 4. Como evitar clichê: a arquitetura invisível

O brief tem um alvo claro: "Eu fazia X, aconteceu Y e agora faço Z" pode explicar uma estrutura, mas não deve virar o texto que o sistema incentiva a copiar. A pesquisa explica por que estruturas boas viram clichê e o que fazer.

**Por que viram clichê.**
- **Expectativa esquemática x verídica (Huron, 2006).** Uma estrutura conhecida gera expectativa esquemática (sabe-se *que tipo* de coisa vem), e isso ainda pode surpreender se a superfície for nova. Uma *formulação* conhecida gera expectativa verídica (sabe-se *exatamente* o que vem), e aí a surpresa e o interesse morrem.
- **Automatização da percepção (Chklóvski, "A arte como procedimento", 1917).** O formalista russo argumentava que o hábito torna a percepção automática, e que a arte existe para desautomatizar (o "estranhamento"). Uma frase-molde é percepção automatizada por definição.
- **Função x superfície (Propp, 1928).** O que se repete nas boas histórias é a *função* (o papel da ação no todo), não os personagens, objetos ou palavras que a realizam.

**Como isso virou regra de dados:**
1. **Nenhum exemplo copiável.** As `realizacoes` descrevem a forma ("numa frase: a primeira metade conduz a uma conclusão, a segunda desloca o sentido de uma palavra-chave") e nunca trazem a frase em si.
2. **Etapas descritas por função e pergunta, não por conteúdo.** O campo `funcao` diz o que a etapa muda no público; o campo `pergunta` obriga o autor a pensar no caso dele. Nenhuma pergunta pode ser respondida com uma frase genérica.
3. **Realizações em escalas e mídias diferentes**, para quebrar a associação entre a estrutura e um formato (ex.: "vídeo de YouTube").
4. **Toda estrutura e toda curva tem `armadilha`**, que descreve como ela vira clichê *ao pé da letra*. Muitas armadilhas avisam contra a estrutura aparecer nas palavras (escrever "mas" e "portanto", anunciar "a verdade é").
5. **A estrutura aparece na mudança do público, não no texto.** A lógica de cada estrutura explica o movimento que ela produz. Se o autor entende o movimento, pode chegar a ele por caminhos que não se parecem com o esqueleto.

**Sugestões de interface (não são dados):** mostrar as etapas como "funções" e perguntas, nunca como campos a preencher com texto; mostrar sempre as três realizações juntas, para que nenhuma vire "a" versão; não ter geração automática de texto a partir de uma estrutura.

---

## Parte 5. O que NÃO usar, e por quê

| Ideia | Por que ficou de fora |
|---|---|
| **"Regra dos 10 minutos" como intervalo fixo** | A revisão de Wilson e Korn (2007) encontrou pouca evidência; Bunce et al. (2010) mostram lapsos curtos durante toda a aula. Usar um intervalo fixo levaria a curvas de "alarme a cada X minutos", o oposto do brief. |
| **"A atenção humana dura 8 segundos, menos que a de um peixinho dourado"** | Número de relatório de marketing (2015) sem base científica rastreável; desmontado em revisões como Bradbury (2016). |
| **Curvas de retenção de plataformas como modelo** | Medem se alguém continua assistindo, não se entendeu, lembrou ou mudou de ideia. Otimizar por elas é a "lógica de retenção constante" que o brief rejeita. |
| **As seis formas de Reagan et al. como curvas diretas** | Medem valência (felicidade das palavras), não intensidade. Aplicá-las direto faria "tragédia" virar uma curva de intensidade decrescente, o que não faz sentido. Serviram só de inspiração, convertida. |
| **"Formas de histórias" de Kurt Vonnegut** | Ideia de palestra e tese recusada, influente e divertida, mas sem método; e também é valência. A versão empírica é Reagan et al. |
| **Jornada do herói de Campbell/Vogler (12 ou 17 passos) como estrutura** | Aplicada como checklist, é a máquina de clichês mais conhecida do roteiro. O monomito é criticado por generalizar a partir de exemplos escolhidos. Entra só como origem do `circulo-de-historia`, com armadilha. |
| **Folhas de batidas por página (ex.: *Save the Cat*, de Blake Snyder, 2005)** | Prescrevem o que acontece em qual página. Úteis para quem escreve dentro de um mercado específico, mas homogeneizam e contradizem "estrutura a serviço de uma intenção". |
| **Posições fixas de viradas em três atos (páginas 25 e 85, 25%/75%)** | Regra de bolso derivada de Field. As curvas têm marcos, mas a armadilha manda movê-los. |
| **Sequência de Monroe vendida como "fórmula que convence"** | O único teste controlado encontrado (Micciche et al., 2000) não achou diferença na mudança de atitude. Ficou, mas como estrutura de organização. |
| **Kishōtenketsu como "estrutura sem conflito"** | Simplificação popularizada em blogs; a forma tem virada, só que por justaposição. Ficou com a descrição corrigida. |
| **"Cone da aprendizagem" (retemos 10% do que lemos, 90% do que fazemos)** | Números sem estudo de origem; frequentemente atribuídos a Edgar Dale, que nunca os publicou. |
| **Promessas de efeito neuroquímico ("cada gancho libera dopamina")** | Extrapolação de estudos de recompensa (como Kang et al., 2009) para afirmações de marketing. A pesquisa de curiosidade é usada aqui pelo que ela mostra sobre lacunas e memória, não como mecanismo de "vício". |
| **Freytag como forma universal** | Descrevia tragédia em cinco atos. Ficou como uma das estruturas, com o pico central marcado como escolha, não regra. |

---

## Parte 6. Como os dados foram montados

**Intensidade (1 a 5).** 1 é vale de respiro; 2 é contexto calmo; 3 é atenção ativa (algo em jogo); 4 é tensão ou virada; 5 é clímax. Os valores das etapas são *intenção típica*, calibrados de forma relativa dentro de cada estrutura (o que importa é o contraste entre etapas, não o número absoluto). Não foram medidos em público real.

**Peso.** Duração relativa entre as etapas da mesma estrutura. Os valores seguem o que as fontes dizem sobre proporção quando dizem algo (a exposição de Freytag é mais curta que a subida; a avaliação de Labov é breve), e bom senso de ofício quando não dizem. Etapas de virada e de quebra tendem a ser curtas: surpresa longa vira explicação.

**Funções de ritmo.** Nove funções: `respiro`, `contexto`, `preparacao`, `gatilho`, `tensao`, `virada`, `climax`, `resolucao`, `eco`. Cada etapa de cada estrutura aponta para uma delas, e sua intensidade cai dentro (ou a no máximo 0,3) da faixa da função. `gatilho` e `tensao` têm a mesma faixa mas papéis opostos: o gatilho é uma mudança pontual que reabre a atenção; a tensão é uma questão que se sustenta.

**Curvas.** Os pontos são posições relativas (0 a 1), nunca minutos. Todas começam em 0 e terminam em 1, estão em ordem, e têm vales deliberados. Os marcos nomeiam momentos de função, não conteúdo.

**Fontes nos dados.** Cada estrutura e curva cita só fontes discutidas neste documento. Livros sem versão aberta estável ficaram sem URL; artigos têm DOI.

---

## Decisões para o autor revisar

1. **Nomes de estruturas.** Alguns ids foram escolhidos por clareza em português, não pelo nome consagrado: `situacao-complicacao-pergunta-resposta` (SCQA de Minto), `argumento-com-ressalva` (Toulmin), `caso-nucleo-desenvolvimento` (fórmula WSJ / *nut graf*), `concreto-para-abstrato` (*concreteness fading*).
2. **`estado-ruptura-novo-estado` com só três etapas.** Todorov tem cinco. Mantive três para ficar fiel ao exemplo do brief e para deixar a "travessia" como convite ao zoom. Se o autor preferir, dá para adicionar "desequilíbrio" e "reconhecimento".
3. **Disposição clássica sem a "divisão".** A parte que anuncia os pontos foi fundida à narração para manter cinco etapas.
4. **Ampulheta, *story spine* (Kenn Adams) e três atos puros não viraram estruturas.** A primeira é combinação de duas existentes; a segunda é quase uma frase-molde ("era uma vez... todo dia... até que um dia..."), exatamente o que o brief quer evitar; os três atos estão na curva `escalada-com-pico-tardio`.
5. **O vale fundo antes do clímax** em `transformacao` (1,8 em 0,74) é uma escolha forte. Funciona para histórias de mudança, mas pode parecer "fundo do poço obrigatório". A armadilha avisa; o autor pode achar que deve ser mais raso.
6. **Intensidade da `conclusao` em `problema-virada-solucao` (3).** A regra do pico e fim pede um fim pensado; deixei em 3 com função `eco`, e não mais alto, para o fim ser "de sentido" e não "de volume". Pode ser subida para 3,5 se o autor quiser fechos mais fortes.
7. **Nenhum modelo "retenção de plataforma".** Foi deliberado (Parte 5). Se o autor quiser um modelo para vídeos curtos de rede social, ele deveria nascer de uma intenção (ex.: "surpreender em pouco tempo"), não da métrica.

---

## Referências

### Dramaturgia, roteiro e teoria da narrativa
- Aristóteles. *Poética*. c. 335 a.C. Trad. inglesa de S. H. Butcher: https://www.gutenberg.org/ebooks/1974
- Campbell, J. (1949). *The Hero with a Thousand Faces*. Nova York: Pantheon.
- Chklóvski, V. (1917). "A arte como procedimento" (Iskusstvo kak priyom). Em *Teoria da literatura: formalistas russos*.
- Field, S. (1979). *Screenplay: The Foundations of Screenwriting*. Nova York: Dell.
- Freytag, G. (1863). *Die Technik des Dramas*. Leipzig: Hirzel. Trad. inglesa de E. J. MacEwan (1894), *Technique of the Drama*: https://archive.org/details/freytagstechniqu00freyuoft
- Harmon, D. (c. 2009). "Story Structure 101: Super Basic Shit". Channel 101 Wiki: https://channel101.fandom.com/wiki/Story_Structure_101:_Super_Basic_Shit
- McKee, R. (1997). *Story: Substance, Structure, Style, and the Principles of Screenwriting*. Nova York: ReganBooks.
- Parker, T., e Stone, M. (2011). Aula no curso "Storytelling Strategies", Tisch School of the Arts (NYU), gravada para a série *Stand In*, mtvU (estreia em 4 out. 2011).
- Propp, V. (1928). *Morfologia do conto maravilhoso*. Leningrado. Trad. inglesa: *Morphology of the Folktale* (1958; 2ª ed. 1968), University of Texas Press.
- Snyder, B. (2005). *Save the Cat!* Studio City: Michael Wiese Productions. (citado em "O que NÃO usar")
- Tchekhov, A. (1889). Carta a A. S. Lazarev-Gruzinsky, 1º de novembro de 1889.
- Todorov, T. (1971). "The Two Principles of Narrative". *Diacritics*, 1(1), 37-44. https://doi.org/10.2307/464558
- Truffaut, F. (1966). *Hitchcock/Truffaut*. Paris: Robert Laffont (ed. inglesa 1967, Simon & Schuster).

### Retórica e argumentação
- Aristóteles. *Retórica*. c. 350 a.C. Trad. inglesa de W. Rhys Roberts: http://classics.mit.edu/Aristotle/rhetoric.html
- Cícero. *De Inventione*. c. 85 a.C.
- *Rhetorica ad Herennium*. Autor anônimo, c. 85 a.C.
- Micciche, T., Pryor, B., e Butler, J. (2000). "A Test of Monroe's Motivated Sequence for Its Effects on Ratings of Message Organization and Attitude Change". *Psychological Reports*, 86(3), 1135-1138. https://doi.org/10.2466/pr0.2000.86.3c.1135
- Minto, B. (1985). *The Pyramid Principle: Logic in Writing and Thinking*. Londres: Minto International. (Ed. ampliada: *The Minto Pyramid Principle*, 1996.)
- Monroe, A. H. (1935). *Principles and Types of Speech*. Chicago: Scott, Foresman.
- Quintiliano. *Institutio Oratoria*. c. 95. https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Quintilian/Institutio_Oratoria/home.html
- Toulmin, S. (1958). *The Uses of Argument*. Cambridge: Cambridge University Press.

### Jornalismo e não-ficção
- Blundell, W. E. (1988). *The Art and Craft of Feature Writing: Based on The Wall Street Journal Guide*. Nova York: Plume.
- Clark, R. P. (1984). "A new shape for the news". *Washington Journalism Review*, março de 1984.
- Heath, C., e Heath, D. (2007). *Made to Stick: Why Some Ideas Survive and Others Die*. Nova York: Random House.
- Pöttker, H. (2003). "News and its communicative quality: the inverted pyramid — when and why did it appear?". *Journalism Studies*, 4(4), 501-511. https://doi.org/10.1080/1461670032000136596
- Scanlan, C. (2000). *Reporting and Writing: Basics for the 21st Century*. Fort Worth: Harcourt College Publishers.

### Psicologia da narrativa, da expectativa e da emoção
- Berlyne, D. E. (1960). *Conflict, Arousal, and Curiosity*. Nova York: McGraw-Hill.
- Berlyne, D. E. (1971). *Aesthetics and Psychobiology*. Nova York: Appleton-Century-Crofts.
- Boyd, R. L., Blackburn, K. G., e Pennebaker, J. W. (2020). "The narrative arc: Revealing core narrative structures through text analysis". *Science Advances*, 6(32), eaba2196. https://doi.org/10.1126/sciadv.aba2196
- Brewer, W. F., e Lichtenstein, E. H. (1982). "Stories are to entertain: A structural-affect theory of stories". *Journal of Pragmatics*, 6(5-6), 473-486. https://doi.org/10.1016/0378-2166(82)90021-2
- Cohn, N. (2013). "Visual Narrative Structure". *Cognitive Science*, 37(3), 413-452. https://doi.org/10.1111/cogs.12016
- Gerrig, R. J. (1993). *Experiencing Narrative Worlds: On the Psychological Activities of Reading*. New Haven: Yale University Press.
- Green, M. C., e Brock, T. C. (2000). "The role of transportation in the persuasiveness of public narratives". *Journal of Personality and Social Psychology*, 79(5), 701-721. https://doi.org/10.1037/0022-3514.79.5.701
- Gruber, M. J., Gelman, B. D., e Ranganath, C. (2014). "States of Curiosity Modulate Hippocampus-Dependent Learning via the Dopaminergic Circuit". *Neuron*, 84(2), 486-496. https://doi.org/10.1016/j.neuron.2014.08.060
- Hoeken, H., e van Vliet, M. (2000). "Suspense, curiosity, and surprise: How discourse structure influences the affective and cognitive processing of a story". *Poetics*, 27(4), 277-286. https://doi.org/10.1016/S0304-422X(99)00021-2
- Huron, D. (2006). *Sweet Anticipation: Music and the Psychology of Expectation*. Cambridge, MA: MIT Press.
- Kang, M. J., Hsu, M., Krajbich, I. M., Loewenstein, G., McClure, S. M., Wang, J. T., e Camerer, C. F. (2009). "The Wick in the Candle of Learning: Epistemic Curiosity Activates Reward Circuitry and Enhances Memory". *Psychological Science*, 20(8), 963-973. https://doi.org/10.1111/j.1467-9280.2009.02402.x
- Labov, W. (1972). *Language in the Inner City: Studies in the Black English Vernacular*. Filadélfia: University of Pennsylvania Press.
- Labov, W., e Waletzky, J. (1967). "Narrative Analysis: Oral Versions of Personal Experience". Em J. Helm (org.), *Essays on the Verbal and Visual Arts*. Seattle: University of Washington Press. Reed. em *Journal of Narrative and Life History*, 7(1-4), 3-38, 1997. https://doi.org/10.1075/jnlh.7.02nar
- Loewenstein, G. (1994). "The psychology of curiosity: A review and reinterpretation". *Psychological Bulletin*, 116(1), 75-98. https://doi.org/10.1037/0033-2909.116.1.75
- Reagan, A. J., Mitchell, L., Kiley, D., Danforth, C. M., e Dodds, P. S. (2016). "The emotional arcs of stories are dominated by six basic shapes". *EPJ Data Science*, 5, 31. https://doi.org/10.1140/epjds/s13688-016-0093-1
- Suls, J. M. (1972). "A two-stage model for the appreciation of jokes and cartoons: An information-processing analysis". Em J. H. Goldstein e P. E. McGhee (orgs.), *The Psychology of Humor*, 81-100. Nova York: Academic Press.
- Trabasso, T., e van den Broek, P. (1985). "Causal thinking and the representation of narrative events". *Journal of Memory and Language*, 24(5), 612-630. https://doi.org/10.1016/0749-596X(85)90049-X
- Zillmann, D. (1971). "Excitation transfer in communication-mediated aggressive behavior". *Journal of Experimental Social Psychology*, 7(4), 419-434. https://doi.org/10.1016/0022-1031(71)90075-8
- Zillmann, D. (1996). "The psychology of suspense in dramatic exposition". Em P. Vorderer, H. J. Wulff e M. Friedrichsen (orgs.), *Suspense: Conceptualizations, Theoretical Analyses, and Empirical Explorations*, 199-231. Mahwah, NJ: Lawrence Erlbaum.

### Atenção, memória e aprendizagem
- Alaybek, B., Dalal, R. S., Fyffe, S., Aitken, J. A., e outros (2022). "All's well that ends (and peaks) well? A meta-analysis of the peak-end rule and duration neglect". *Organizational Behavior and Human Decision Processes*, 170, 104149. https://doi.org/10.1016/j.obhdp.2022.104149
- Ausubel, D. P. (1960). "The use of advance organizers in the learning and retention of meaningful verbal material". *Journal of Educational Psychology*, 51(5), 267-272. https://doi.org/10.1037/h0046669
- Bradbury, N. A. (2016). "Attention span during lectures: 8 seconds, 10 minutes, or more?". *Advances in Physiology Education*, 40(4), 509-513. https://doi.org/10.1152/advan.00109.2016
- Bunce, D. M., Flens, E. A., e Neiles, K. Y. (2010). "How Long Can Students Pay Attention in Class? A Study of Student Attention Decline Using Clickers". *Journal of Chemical Education*, 87(12), 1438-1443. https://doi.org/10.1021/ed100409p
- Fredrickson, B. L., e Kahneman, D. (1993). "Duration neglect in retrospective evaluations of affective episodes". *Journal of Personality and Social Psychology*, 65(1), 45-55. https://doi.org/10.1037/0022-3514.65.1.45
- Fyfe, E. R., McNeil, N. M., Son, J. Y., e Goldstone, R. L. (2014). "Concreteness Fading in Mathematics and Science Instruction: a Systematic Review". *Educational Psychology Review*, 26(1), 9-25. https://doi.org/10.1007/s10648-014-9249-3
- Hunt, R. R. (1995). "The subtlety of distinctiveness: What von Restorff really did". *Psychonomic Bulletin & Review*, 2(1), 105-112. https://doi.org/10.3758/BF03214414
- Kahneman, D., Fredrickson, B. L., Schreiber, C. A., e Redelmeier, D. A. (1993). "When More Pain Is Preferred to Less: Adding a Better End". *Psychological Science*, 4(6), 401-405. https://doi.org/10.1111/j.1467-9280.1993.tb00589.x
- Mackworth, N. H. (1948). "The breakdown of vigilance during prolonged visual search". *Quarterly Journal of Experimental Psychology*, 1(1), 6-21. https://doi.org/10.1080/17470214808416738
- Mayer, R. E. (2020). *Multimedia Learning* (3ª ed.). Cambridge: Cambridge University Press.
- Mayer, R. E., e Moreno, R. (2003). "Nine Ways to Reduce Cognitive Load in Multimedia Learning". *Educational Psychologist*, 38(1), 43-52. https://doi.org/10.1207/S15326985EP3801_6
- Miller, N., e Campbell, D. T. (1959). "Recency and primacy in persuasion as a function of the timing of speeches and measurements". *Journal of Abnormal and Social Psychology*, 59(1), 1-9. https://doi.org/10.1037/h0049330
- Murdock, B. B., Jr. (1962). "The serial position effect of free recall". *Journal of Experimental Psychology*, 64(5), 482-488. https://doi.org/10.1037/h0045106
- Nelson, L. D., e Meyvis, T. (2008). "Interrupted Consumption: Disrupting Adaptation to Hedonic Experiences". *Journal of Marketing Research*, 45(6), 654-664. https://doi.org/10.1509/jmkr.45.6.654
- Nelson, L. D., Meyvis, T., e Galak, J. (2009). "Enhancing the Television-Viewing Experience through Commercial Interruptions". *Journal of Consumer Research*, 36(2), 160-172. https://doi.org/10.1086/597030
- Sweller, J. (1988). "Cognitive Load During Problem Solving: Effects on Learning". *Cognitive Science*, 12(2), 257-285. https://doi.org/10.1207/s15516709cog1202_4
- Warm, J. S., Parasuraman, R., e Matthews, G. (2008). "Vigilance Requires Hard Mental Work and Is Stressful". *Human Factors*, 50(3), 433-441. https://doi.org/10.1518/001872008X312152
- Wilson, K., e Korn, J. H. (2007). "Attention During Lectures: Beyond Ten Minutes". *Teaching of Psychology*, 34(2), 85-89. https://doi.org/10.1080/00986280701291291
- Zacks, J. M., Speer, N. K., Swallow, K. M., Braver, T. S., e Reynolds, J. R. (2007). "Event perception: A mind-brain perspective". *Psychological Bulletin*, 133(2), 273-293. https://doi.org/10.1037/0033-2909.133.2.273

### Texto e discurso
- Hinds, J. (1983). "Contrastive rhetoric: Japanese and English". *Text*, 3(2), 183-195. https://doi.org/10.1515/text.1.1983.3.2.183
- Hoey, M. (1983). *On the Surface of Discourse*. Londres: George Allen & Unwin.
- Kintsch, W., e van Dijk, T. A. (1978). "Toward a model of text comprehension and production". *Psychological Review*, 85(5), 363-394. https://doi.org/10.1037/0033-295X.85.5.363
- Maynard, S. K. (1998). *Principles of Japanese Discourse: A Handbook*. Cambridge: Cambridge University Press.
