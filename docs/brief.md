# Brief do produto — palavras do Victor (2026-09-29)

> Textos originais, sem edição. São a fonte da intenção do produto. Qualquer decisão de design deve poder ser justificada por aqui.

## 1. A ideia

Seguinte: tenho uma ideia de um software para criação de roteiros e textos baseado em um free canvas, tipo Figma, mas com interações de node-based editor.
A ideia é que a escrita não aconteça como em um editor de texto tradicional, de cima para baixo, e sim de forma horizontal e espacial. Cada trecho, assunto ou bloco do roteiro pode existir como um node no canvas, ser movido livremente e conectado a outros blocos, permitindo enxergar visualmente como as ideias se relacionam.
Ao mesmo tempo, esses blocos formam automaticamente uma timeline da narrativa. Meu processo de escrita é muito baseado em visualizar o conteúdo ao longo do tempo: onde determinado assunto entra, quanto espaço ele ocupa e como ele se conecta ao próximo.
Além disso, quero representar uma segunda dimensão dessa timeline que eu costumo chamar de “vales de interação”: uma curva que mostra a variação de atenção, intensidade, energia ou ritmo ao longo do roteiro. Alguns momentos são deliberadamente mais calmos e explicativos; outros precisam crescer, gerar tensão, surpresa ou chamar muito mais atenção.
Então o produto teria essencialmente duas representações sincronizadas da mesma narrativa: o canvas, onde eu penso, escrevo e conecto os blocos livremente, e a timeline, onde eu visualizo a sequência, duração e curva de intensidade do conteúdo.
Alterar um bloco no canvas deve alterar sua representação na timeline, e reorganizar a timeline deve refletir na estrutura do canvas. Não quero que sejam duas ferramentas separadas, mas duas formas de enxergar e manipular o mesmo roteiro.
No final, os nodes de texto conectados formam uma sequência de leitura definitiva, como uma montagem. A partir dessa sequência, o software teria uma área de Exportar / Renderizar, inspirada em softwares de edição de vídeo, que compila todos os blocos conectados em um único documento contínuo, respeitando a ordem definida no canvas e na timeline. Assim, o processo de criação pode ser totalmente espacial e modular, mas o resultado final continua sendo um roteiro ou texto linear, pronto para leitura, revisão ou exportação.
A proposta é criar um editor em que seja possível pensar a arquitetura de um texto visualmente, e não apenas escrever parágrafos em sequência.

## 2. Para a equipe de produto

Eu passaria para a equipe de produto mais ou menos assim:
Quero que o produto seja pensado para uma pessoa que não pensa necessariamente de forma linear. É alguém que começa um roteiro com várias ideias soltas, trechos de texto, referências, frases, argumentos e possíveis caminhos, e que precisa capturar tudo isso sem ter que decidir imediatamente qual é a ordem final. O canvas precisa funcionar como uma extensão desse raciocínio: rápido para criar, fácil para mover, conectar, agrupar, separar e reorganizar. A sensação deve ser muito mais próxima de “colocar as ideias na mesa e trabalhar em cima delas” do que de preencher campos ou operar uma ferramenta complexa.
O principal problema que quero resolver é a distância entre ter ideias e transformá-las em uma narrativa coerente. Hoje, um editor de texto força linearidade cedo demais; um whiteboard dá liberdade, mas não entende que aquilo vai virar um texto; e um software de roteiro normalmente começa quando a estrutura já está relativamente definida. Quero ocupar justamente o espaço entre essas coisas. O usuário deve conseguir começar caótico e, progressivamente, transformar esse caos em estrutura sem precisar sair da ferramenta.
Por isso, o canvas é o ambiente principal de pensamento, mas os nodes não podem ser apenas post-its sofisticados. Eles representam partes reais do conteúdo. Uma frase pode crescer para um parágrafo, um tópico pode virar uma seção inteira, e esses blocos podem se relacionar, receber hierarquia e formar caminhos. Conectar nodes deve ter significado narrativo: “isso vem depois disso”, “isso explica aquilo”, “isso pertence a esta parte”, “essas duas ideias podem virar uma só”. A ferramenta deve ajudar a tornar essas relações visíveis sem obrigar o usuário a lidar com uma linguagem técnica de grafos.
A timeline é a segunda leitura do mesmo conteúdo. Ela deve ajudar o usuário a sair da organização espacial e enxergar a narrativa no tempo: qual é a ordem, quanto peso cada parte tem, onde o conteúdo desacelera, onde precisa ganhar intensidade e onde estão os principais momentos da história. É também nela que entram os vales de interação, como uma camada autoral para controlar ritmo, atenção e intensidade. Canvas e timeline precisam estar permanentemente sincronizados; não quero duas funcionalidades separadas, mas duas perspectivas sobre a mesma estrutura.
Também quero que o produto seja capaz de trabalhar a narrativa em macro e micro. No macro, o usuário define primeiro a intenção da peça inteira e depois a estrutura que vai sustentar essa intenção. Dentro de cada parte, ele pode fazer o mesmo em escala menor: definir o que aquele trecho precisa provocar e escolher uma estrutura adequada para construí-lo. A biblioteca de padrões narrativos entra como suporte a esse processo, mostrando esqueletos e possibilidades de construção sem entregar frases prontas ou transformar todo mundo na mesma fórmula de escrita.
No fim, toda essa liberdade precisa convergir para alguma coisa concreta. Os nodes conectados formam uma sequência final de leitura, quase como uma montagem em um editor de vídeo. Quando o usuário estiver satisfeito com essa montagem, ele deve conseguir ir para uma área de Exportar/Renderizar e transformar aquela estrutura modular em um único documento contínuo, pronto para leitura, revisão ou entrega.
A experiência inteira precisa seguir uma regra: baixa fricção para pensar, alta clareza para estruturar. Eu não quero um Figma genérico com caixas de texto, nem um Miro com uma timeline encaixada, nem um editor de texto com um canvas por cima. Quero uma ferramenta construída especificamente para transformar pensamento não linear em narrativa estruturada — sem tirar do autor o controle sobre a escrita.

## 3. Vales de interação, macro e micro

Quero que os **vales de interação** sejam tratados como uma camada estrutural da narrativa, não como um gráfico decorativo de “engajamento”. A ideia é permitir que o autor enxergue e planeje como a intensidade do conteúdo varia ao longo do tempo: onde ele quer desacelerar, explicar, criar expectativa, gerar contraste, recuperar atenção, provocar uma virada ou chegar a um clímax. Essa curva precisa ser **autoral e manipulável**, porque ela representa uma intenção de ritmo — não uma promessa de que o público necessariamente vai reagir daquela forma.

Essa camada deve conversar diretamente com a timeline. Cada bloco do roteiro ocupa uma posição e uma duração, mas também participa de uma determinada região da curva de intensidade. Um trecho mais explicativo pode existir deliberadamente em um vale; outro pode funcionar como preparação para uma subida; um gatilho de atenção pode marcar uma mudança mais brusca. O importante é que o usuário consiga olhar para o roteiro e perceber visualmente não só **o que acontece e em qual ordem**, mas também **como a energia narrativa está sendo distribuída**.

Também não quero que exista uma ideia de que “mais intensidade é sempre melhor”. Uma narrativa boa precisa de contraste. Se tudo estiver no máximo o tempo inteiro, nada realmente chama atenção. Os vales são tão importantes quanto os picos, porque criam espaço para compreensão, antecipação, respiro e preparação. O produto deve ajudar o autor a pensar nessa modulação, e não simplesmente empurrá-lo para uma lógica de retenção constante.

Com o tempo, quero que essa camada possa receber **modelos de curvas narrativas**. Não como presets que escrevem o roteiro pelo usuário, mas como referências estruturais. Por exemplo: uma curva para apresentar um assunto e construir curiosidade, outra para uma narrativa de transformação, outra para uma explicação que alterna contexto e reengajamento. O usuário poderia aplicar uma dessas referências à timeline, entender a lógica dela e depois adaptá-la livremente.

Esses modelos precisam nascer de uma base muito mais profunda do que “templates de conteúdo”. A interface pode apresentar algo simples, mas por trás deve existir pesquisa séria sobre narrativa, roteiro, dramaturgia, retórica, atenção, memória, psicologia cognitiva e práticas documentadas de construção de conteúdo. A intenção é transformar conhecimento complexo em uma ferramenta utilizável sem reduzir esse conhecimento a fórmulas rasas.

A segunda dimensão importante do produto é a relação entre **macroestrutura e microestrutura narrativa**. Quero que o sistema deixe claro que um roteiro possui uma arquitetura em diferentes escalas e que essas escalas precisam conversar entre si.

No nível **macro**, o primeiro passo não deveria ser escolher uma estrutura. Antes disso existe uma **intenção narrativa**. O autor precisa conseguir responder algo como: “o que eu quero que essa peça inteira provoque ou transforme em quem está assistindo?”. Por exemplo: *quero levar o público da percepção de que trabalhar mais resolve o problema para a percepção de que o problema real é trabalhar sem prioridade*. Só depois dessa intenção vem a estrutura que sustenta esse movimento: `problema → aprofundamento → virada → solução → conclusão`.

Essa separação é importante porque não quero que o software incentive o usuário a escolher uma estrutura porque “esse é um bom formato de vídeo”. A estrutura deve existir **a serviço de uma intenção**. O produto pode ajudar a visualizar a relação entre as duas: qual é o objetivo macro da narrativa e qual função cada etapa desempenha para aproximar o público daquele objetivo.

Dentro de cada uma dessas etapas entra a **microestrutura**. A mesma lógica se repete em escala menor. Se existe uma etapa macro chamada “virada”, por exemplo, esse bloco também possui uma intenção própria: *fazer o público questionar a crença de que falta tempo*. E essa intenção pode ser construída com uma estrutura micro como `expectativa → quebra → nova interpretação`.

Portanto, quero que o produto trabalhe sempre com uma lógica semelhante a:

**Intenção → Estrutura → Realização**

Isso vale tanto para o roteiro inteiro quanto para uma pequena parte dele. A intenção define **o que aquele trecho precisa provocar**. A estrutura define **qual lógica narrativa será usada para chegar lá**. A realização é **o texto concreto escrito pelo autor**.

Essa hierarquia precisa ser navegável. O usuário pode estar olhando para a narrativa inteira e enxergando sua macroestrutura, entrar em um node específico e descobrir que aquele trecho possui sua própria intenção, estrutura e curva de intensidade, e depois voltar para o macro sem perder a relação entre as duas escalas. Eu quero que exista a sensação de **zoom narrativo**: quanto mais o usuário entra em uma parte do roteiro, mais estrutura ele consegue enxergar.

É aí que entra também a biblioteca de **padrões narrativos**. Esses padrões não devem ser frases prontas. Uma estrutura como `estado inicial → ruptura → novo estado` ou `expectativa → quebra → nova interpretação` é apenas um esqueleto abstrato. O produto precisa deixar claro que esse esqueleto pode resultar em dezenas de realizações completamente diferentes, desde uma frase curta até uma sequência narrativa sofisticada.

Quero evitar justamente o problema atual de estruturas boas virarem clichês porque são aplicadas literalmente. “Eu fazia X, aconteceu Y e agora faço Z” pode servir para explicar uma estrutura, mas não deve virar o texto que o sistema incentiva o usuário a copiar. O produto precisa ensinar **a arquitetura invisível**, não uma formulação superficial.

A relação final entre essas partes deveria ser algo próximo de:

**Intenção macro → Estrutura macro → Vales de interação → Blocos narrativos → Intenções micro → Estruturas micro → Texto**

Tudo isso representa a mesma narrativa em diferentes níveis de abstração. A função do produto é permitir que o autor transite entre esses níveis sem perder contexto e, principalmente, sem substituir o trabalho criativo dele. O sistema deve ajudar a **pensar melhor a narrativa**, e não simplesmente produzir texto mais rápido.
