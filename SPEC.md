# Montagem — especificação v0

> Nome provisório. Editor de roteiros e textos em canvas livre, com timeline sincronizada e curva de intensidade.
> Ideia do Victor, 2026-09-29. Protótipo: `prototipo/index.html`.

## 1. A ideia em uma frase

Um roteiro só, visto de dois jeitos: o **canvas**, onde você pensa, escreve e liga blocos; e a **timeline**, onde você vê a ordem, quanto tempo cada parte ocupa e a curva de energia. No fim, **Renderizar** junta tudo num texto corrido.

## 2. Para quem e para quê

- Quem escreve roteiro de vídeo, aula, palestra, podcast, apresentação ou texto longo e pensa **no tempo**: onde um assunto entra, quanto dura e como passa para o próximo.
- O problema: editor de texto obriga a pensar de cima para baixo. Ferramentas de canvas (Milanote, Heptabase, Kinopio) deixam pensar no espaço, mas não dão tempo, ritmo nem um texto final.
- O que ninguém junta (a checar melhor): canvas livre + timeline com duração + curva de intensidade + exportação linear.

## 3. Conceitos

| Conceito | O que é |
|---|---|
| **Bloco** | Um trecho do roteiro. Tem título, texto, intensidade e posição no canvas. |
| **Ligação de sequência** | Seta sólida. Diz "depois deste vem aquele". Forma a montagem. |
| **Ligação de relação** | Linha tracejada. Diz "isso tem a ver com aquilo". Não entra na montagem. |
| **Caminho principal** | A corrente de ligações de sequência que começa no bloco marcado como **Início**. É a montagem. |
| **Blocos soltos** | Blocos fora do caminho principal. Ficam no canvas e na "gaveta" da timeline, como o *bin* de um editor de vídeo. |
| **Intensidade** | Nível de energia do bloco, de 1 (calmo, explicativo) a 5 (pico, tensão, surpresa). |
| **Curva real** | A linha que passa pela intensidade de cada bloco ao longo do tempo. Os "vales de interação". |
| **Curva planejada** | Opcional. Uma curva desenhada à mão antes de escrever, que serve de alvo. |

## 4. Regras (o coração do produto)

### 4.1 Caminho principal x ligações soltas
- Cada bloco tem **no máximo uma** saída de sequência e **uma** entrada de sequência.
- Ligar a saída de um bloco que já tem sequência **substitui** a ligação antiga (a antiga some; os blocos seguintes viram soltos se ficarem sem caminho).
- Ligações de relação são livres: qualquer número, qualquer direção.
- Só um bloco é o **Início**. Se não houver um marcado, o primeiro criado assume.
- Ciclos: se a sequência voltar a um bloco já visitado, o caminho para ali e o bloco que fecha o ciclo ganha um aviso.

### 4.2 Duração sai do texto
- Duração = palavras ÷ ritmo. Ritmo padrão: **150 palavras/min** (fala). Opções: 130 (fala lenta), 150, 180 (fala rápida), 230 (leitura silenciosa).
- Futuro: duração manual por bloco (ex.: um bloco de "respiro" ou de imagem sem fala) e marcações de pausa.

### 4.3 Canvas → timeline
- A timeline mostra só o caminho principal, na ordem da corrente.
- Largura do clipe = duração. Altura do ponto na curva = intensidade.
- Editar texto no canvas muda a largura do clipe na hora.

### 4.4 Timeline → canvas
- **Arrastar um clipe** para outra posição reescreve as ligações de sequência. A posição dos blocos no canvas **não muda**: o espaço é do pensamento, a ordem é da timeline.
- **Arrastar um ponto da curva** para cima ou para baixo muda a intensidade do bloco.
- **Arrastar um bloco da gaveta** para a timeline insere ele na sequência naquele ponto.
- **Tirar um clipe** da timeline (botão ou arrastar para a gaveta) desfaz a sequência dele e emenda o anterior com o seguinte.
- Clicar num clipe seleciona o bloco e centraliza ele no canvas.
- Futuro: botão **Organizar** que alinha o caminho principal na horizontal no canvas, se o Victor quiser.

### 4.5 Curva planejada (opcional)
- Desligada por padrão. Quem não quiser nunca vê.
- Ligada: desenha arrastando sobre a área da curva. Aparece tracejada atrás da curva real.
- A diferença entre as duas fica marcada onde passar de 1 nível (ex.: "aqui você planejou pico e o texto está calmo").

### 4.6 Renderizar
Painel inspirado no *export* de editor de vídeo.
- **Formatos:** texto corrido · roteiro com tempos (`[00:42] Título`) · Markdown.
- **Opções:** incluir títulos dos blocos · separador entre blocos · incluir intensidade como nota.
- **Resumo antes:** número de blocos, duração total, blocos soltos ignorados, blocos vazios (aviso).
- **Saída:** copiar e baixar `.md`/`.txt`. Futuro: `.docx`, PDF, modo teleprompter.

## 5. Tela

```
┌──────────────────────────────────────────────────────────┐
│ Montagem · título do roteiro   ritmo 150/min   Renderizar│
├──────────────────────────────────────────────────────────┤
│                                                          │
│   CANVAS  (blocos, setas de sequência, linhas tracejadas)│
│                                                          │
├──────────────────────────────────────────────────────────┤
│ 00:00     00:30      01:00      01:30        │ GAVETA    │
│ ╭─╮    ╱╲         curva                      │ soltos    │
│ ▓▓▓▓|▓▓▓▓▓▓|▓▓|▓▓▓▓▓▓▓▓|▓▓▓   clipes         │           │
└──────────────────────────────────────────────────────────┘
```

## 6. Interações do canvas
- Duplo clique no fundo: cria bloco.
- Arrastar o fundo: move a vista. Roda do mouse: zoom (com Ctrl) ou rolagem.
- Arrastar da bolinha da direita até outro bloco: sequência. Com **Shift** (ou modo "relação" na barra): ligação de relação.
- Clicar numa ligação: seleciona; Delete apaga.
- Delete com bloco selecionado (fora da edição): apaga o bloco e emenda a sequência.

## 7. Dados

```ts
Bloco   { id, titulo, texto, x, y, intensidade: 1..5, criadoEm }
Ligacao { id, de, para, tipo: 'sequencia' | 'relacao' }
Roteiro { id, titulo, inicio: blocoId, ritmo, blocos[], ligacoes[], curvaPlanejada?: [t 0..1, nivel 1..5][] }
```
- v1: salva no navegador (localStorage) + exportar/importar `.json`.
- Depois: arquivo local ou nuvem; colaboração.

## 8. O que entra em cada versão

**Protótipo (agora):** canvas com blocos, dois tipos de ligação, início, timeline com clipes por duração, curva real editável, gaveta, reordenar pela timeline, curva planejada opcional, Renderizar com 3 formatos, salvar no navegador, roteiro de exemplo.

**v1:** desfazer/refazer, duração manual, organizar, exportar/importar `.json`, atalhos, busca.

**Depois:** takes (versões alternativas do mesmo bloco, troca rápida na timeline), trilhas paralelas (ex.: fala + imagem/B-roll, como faixas de vídeo), notas de direção, IA que lê a curva e aponta trechos planos demais, colaboração.

## 9. Em aberto
- Nome do produto.
- Trilhas paralelas: roteiro de vídeo quase sempre tem fala + imagem. Isso vira faixa extra na timeline? (forte candidato)
- Intensidade 1–5 é suficiente, ou precisa de mais de uma curva (atenção x emoção x ritmo)?
- Web app, desktop ou os dois.
- Concorrência: pesquisar Arc Studio, Plottr, Twine, Scrivener, Milanote, Heptabase, Kinopio, Descript antes de decidir o posicionamento.
