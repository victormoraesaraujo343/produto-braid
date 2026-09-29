# Design system — Montagem (v1)

> Simples de propósito. Fonte da verdade: `src/design/tokens.css` (significado) sobre `src/design/identidade.css` (cores da identidade do Victor, sincronizadas com `npm run identidade:sync`).
> Os componentes em `src/styles.css` só usam tokens. Nenhuma cor escrita direto.

## Ideia

Uma mesa de papel onde se pensa com calma. A tinta (grafite) desenha a ordem, e o **laranja é sinal**: aparece onde existe atenção.

| Laranja aparece em | Laranja nunca aparece em |
|---|---|
| seleção e foco | texto pequeno sobre papel |
| ação principal (Texto final, Usar estrutura) | decoração |
| pico de energia na curva e nos medidores | linhas do fio (são grafite) |
| alvo de soltar (parte ou timeline recebendo algo) | fundos grandes |

## Cor

Da identidade: papel `#EEEAE3`, papel claro `#F7F4EE`, carvão `#101112`, grafite `#26292D`, alumínio `#B9BEC4`, laranja `#FF7300`.

| Token | Papel | Claro | Escuro |
|---|---|---|---|
| `--sup-mesa` | o canvas | papel | `#121314` |
| `--sup-painel` | barras e painéis | papel claro | `#18191B` |
| `--sup-folha` | onde se escreve (cartões, página) | `#FCFBF8` | `#202225` |
| `--sup-funda` | poços, hover, segmentado | `#E2DED6` | grafite |
| `--sup-inversa` | chips fortes, avisos | grafite | papel |
| `--txt` / `--txt-2` / `--txt-3` | texto, secundário, legenda | carvão / `#45484B` / `#666869` | papel / `#BDB9B2` / `#908E89` |
| `--borda` / `--borda-forte` | linhas | `#DBD6CD` / `#C3BDB2` | `#2E3135` / `#43474C` |
| `--sinal` | laranja | `#FF7300` | `#FF7300` |
| `--fio` | ordem de leitura | grafite | `#D9D4CA` |
| `--i1…--i5` | energia, do vale ao pico | alumínio → areia → âmbar → laranja claro → laranja | idem, ajustado |

Contraste conferido: `--txt-3` tem 4,7:1 no papel e 5,4:1 no painel escuro. Carvão sobre laranja: 6,9:1. As cores de energia são só marcas; a intensidade também é lida pela altura da curva e pelo tamanho das barras.

## Tipografia

| Papel | Família | Tamanhos |
|---|---|---|
| Escrita (cartões, intenção, texto final) | Literata | 15 (cartão), 18 (página), 36 (título da página) |
| Interface | Hanken Grotesk | 11 meta · 12 rótulo · 13 controle · 14 corpo · 17 título · 21 título de painel |
| Tempo e números | Geist Mono | 10–12, sempre com algarismos tabulares |

Pesos: 450 normal, 550 médio, 650 forte. Frases em caixa normal, sem rótulos em caixa alta.

## Espaço, raio, elevação

- Grade de 4: 4 · 8 · 12 · 16 · 20 · 24 · 32.
- Raio cresce com o tamanho do objeto: controle 7 · cartão 10 · moldura (parte, painel) 16 · pílula.
- Três elevações: `--sombra-cartao` (no chão da mesa), `--sombra-flutua` (painéis, barra de seleção), `--sombra-alta` (menus, avisos).

## Movimento

- `--d-rapida` 120 ms: hover e cor.
- `--d-media` 200 ms: menus, painéis, trechos da timeline deslizando, pontos da curva.
- `--d-lenta` 420 ms: câmera (entrar numa parte) e foco.
- Curva de saída `--ease-sai`. Tudo desliga com "reduzir movimento".
- Movimento só responde a uma ação. Nada anima sozinho.

## Componentes

| Componente | Onde | Regra |
|---|---|---|
| Botão (`.botao`, `-primario`, `-fantasma`) | ações | primário é laranja com texto carvão; um por área |
| Botão de ícone (`.icone-btn`) | desfazer, fechar | sempre com `aria-label` e título |
| Seletor (`ui/Seletor.tsx`) | função no ritmo, ritmo | substitui o select do navegador; cada opção pode ter descrição |
| Camada flutuante (`ui/Popover.tsx`) | curva-alvo, atalhos | fecha com Esc e clique fora; vira para cima se faltar espaço |
| Aviso (`ui/Toasts.tsx`) | depois de ações que mudam estrutura | frase curta + "Desfazer"; some em 4 s |
| Medidor | intensidade | 5 barras crescentes, na cor da energia |
| Segmentado | formato do texto, abas | opção ativa vira "folha" com sombra |
| Chip de etapa | estrutura aplicada | pílula na folha, número em mono |

## Linguagem das linhas na mesa

| Linha | Significa |
|---|---|
| grafite contínua com seta | vem depois (o fio) · mais grossa entre partes |
| cinza tracejada com "explica" | explica |
| pontilhada âmbar com "Juntar em uma" | podem virar uma só |
| moldura | pertence a esta parte |

O menu que aparece ao ligar mostra uma amostra de cada linha, para a legenda ser aprendida no uso.

## Em aberto

- Tipografia da identidade (Barlow Condensed e IBM Plex) ainda não aplicada: foi pedido só a cor, por enquanto.
- Ícones próprios desenhados à mão (hoje são traços simples de 16 px).
