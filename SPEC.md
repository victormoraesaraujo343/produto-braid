# Montagem — especificação v1

> Nome provisório. Ferramenta para transformar pensamento não linear em narrativa estruturada, sem tirar do autor o controle da escrita.
> Fonte da intenção: `docs/brief.md` (palavras do Victor). Base de pesquisa da biblioteca: `docs/pesquisa-biblioteca.md`.

## 1. Regra do produto

**Baixa fricção para pensar, alta clareza para estruturar.** Não é um Figma com caixas de texto, nem um Miro com timeline, nem um editor com canvas por cima.

Para quem: alguém que começa com ideias soltas (trechos, frases, argumentos, referências, caminhos possíveis) e precisa chegar a um texto linear coerente sem decidir a ordem cedo demais.

## 2. Modelo: Intenção → Estrutura → Realização, em toda escala

Tudo é um nó. Existem dois tipos:

| Nó | O que é | Tem |
|---|---|---|
| **Parte** (e a raiz, que é a peça inteira) | Um recipiente narrativo | título, **intenção** ("o que precisa provocar"), **estrutura** (da biblioteca), **fio** (ordem de leitura dos filhos), **curva-alvo** opcional |
| **Ideia** | A realização: texto concreto | texto, intensidade (1 vale a 5 pico), função no ritmo |

Partes contêm ideias e outras partes. Isso dá o **zoom narrativo**: a peça tem intenção e estrutura; cada parte também; e assim por diante.

Cadeia completa (do brief): Intenção macro → Estrutura macro → Vales → Blocos → Intenções micro → Estruturas micro → Texto.

## 3. Ligações com sentido narrativo

Ao ligar dois nós, a pessoa escolhe o significado em linguagem de texto, não de grafo:

| Frase | Efeito |
|---|---|
| **vem depois** | Entra no fio (a ordem de leitura). Só entre nós do mesmo recipiente; entre partes, a ordem vem da ordem das partes. |
| **explica** | Linha tracejada com o rótulo "explica". Não muda a ordem. |
| **podem virar uma só** | Linha pontilhada com o botão "Juntar em uma": une os textos (dá para desfazer). |
| **pertence a esta parte** | Move o nó para dentro da parte (também dá para arrastar para dentro). |

Soltar a ligação no vazio cria a próxima ideia ali, já no fio.

## 4. O fio (a montagem)

- Cada recipiente tem uma sequência ordenada: o fio daquele nível. A ordem final de leitura percorre os fios em profundidade.
- Ideia solta na mesa (raiz) fica fora do fio até alguém ligá-la. Dentro de uma parte, o que entra passa a fazer parte do fio dela.
- No canvas, o fio é a linha azul: mais grossa entre partes, mais fina dentro delas. A numeração hierárquica (3.2.1) diz a posição exata na montagem.
- Cortar o fio num ponto tira a ideia seguinte da montagem; ela continua na mesa.

## 5. Timeline e vales de interação

- Mostra o nível em foco (a peça inteira ou a parte em que você entrou).
- **Trechos:** cada item do fio com largura proporcional à duração. Parte mostra uma faixa com as intensidades de dentro.
- **Duração:** sai do texto (palavras ÷ ritmo). Ritmos: 120, 150, 180 e 230 palavras/min.
- **Curva:** passa pela intensidade de cada ideia. É autoral: arrasta o ponto para cima ou para baixo. Cada ponto mostra a função no ritmo (respiro, contexto, preparação, gatilho, tensão, virada, clímax, resolução, eco).
- **Curva-alvo (opcional):** vem de uma estrutura, de um modelo de curva, ou é desenhada à mão. Aparece tracejada e marca onde o texto se afasta dela.
- **Contraste, não retenção:** a timeline aponta trechos longos no alto sem vale, trechos planos demais, e peça sem nenhum vale. Nunca pontua "engajamento".
- Arrastar trecho reordena o fio. Arrastar para cima da faixa tira do fio. Arrastar uma ideia da mesa para a faixa põe no fio naquele ponto.

## 6. Biblioteca

- **Estruturas** (19): esqueletos abstratos com etapas; cada etapa tem função, pergunta-guia, intensidade típica, peso e função de ritmo. Cada estrutura mostra lógica, "o mesmo esqueleto pode virar" (escalas de realização), "quando vira clichê" e fontes.
- **Curvas de ritmo** (9): referências de modulação com marcos, lógica, armadilha e fontes.
- **Usar uma estrutura** num nível cria uma **vaga** (parte vazia) por etapa, que vira o novo fio daquele nível. O que já existia fica solto ao lado, para ser arrastado para as vagas. A estrutura também sugere a curva-alvo.
- A biblioteca sempre mostra a intenção do nível antes da estrutura, e avisa quando ela ainda não foi escrita.
- Nunca gera texto.

## 7. Texto final

Compila o fio em profundidade num documento contínuo.
- Formatos: texto corrido, com tempos, Markdown.
- Opções: títulos das partes; intenções como notas (para revisão).
- Sumário com tempos, contagem de palavras e duração; avisos de partes vazias e ideias fora do fio.
- Copiar ou baixar `.txt`/`.md`.

## 8. Interação

- Dois cliques na mesa: nova ideia solta. Dois cliques dentro de uma parte: nova ideia no fio dela.
- Colar texto na mesa: cada parágrafo ou item de lista vira uma ideia.
- Clique seleciona; clique de novo (ou Enter) escreve. Ctrl+Enter: próxima ideia logo abaixo.
- Arrastar da mesa: arrasto seleciona várias; espaço + arrastar ou rolagem movem a vista; Ctrl + rolagem dá zoom.
- Selecionar vários do mesmo nível: "Agrupar em parte". Ideia que cresceu: "Virar parte". Parte: "Desfazer parte".
- Entrar numa parte: botão no canto, dois cliques no trecho da timeline, ou Enter. Esc volta um nível.
- Ctrl+Z / Ctrl+Shift+Z desfazem e refazem (um gesto = um passo).

## 9. Técnica

- React 18 + TypeScript + Vite; canvas com React Flow (xyflow); estado com Zustand + zundo (desfazer); IndexedDB para guardar vários roteiros no navegador; salvar/abrir arquivo `.json`.
- Regras em `src/model/` (funções puras, com testes em `modelo.test.ts`); interface em `src/canvas`, `src/timeline`, `src/painel`.
- Visual: mesa calma, o fio é o único elemento forte. Literata para o texto, Hanken Grotesk para a interface, Geist Mono só para tempos. Claro e escuro.

## 10. Em aberto

- Nome do produto.
- Trilhas paralelas (fala + imagem) na timeline.
- Uma curva só (intensidade) ou mais de uma (a pesquisa escolheu só intensidade; ver `docs/pesquisa-biblioteca.md`).
- Decisões da pesquisa para revisar: seção "Decisões para revisar" em `docs/pesquisa-biblioteca.md`.
- Exportar `.docx`/PDF, modo teleprompter, colaboração, app de computador (Tauri).
