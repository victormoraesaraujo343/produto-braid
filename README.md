# Braid

Ferramenta de escrita para quem pensa de forma não linear: você joga as ideias numa mesa, liga e agrupa, dá uma ordem (o fio), vê a narrativa no tempo com a curva de intensidade, e no fim tira um texto linear pronto. O nome é a imagem do app: vários fios (as ideias, as subtramas) trançados até virar uma peça só.

## Instalar

Baixe a versão mais nova em [Releases](https://github.com/victormoraesaraujo343/produto-braid/releases/latest):

- **Windows:** `Braid-<versão>-win-x64.exe`. O instalador não é assinado, então o Windows pode mostrar "O Windows protegeu o computador": clique em "Mais informações" e depois em "Executar assim mesmo".
- **Linux:** `Braid-<versão>-linux-x86_64.AppImage`. Marque como executável (`chmod +x Braid-*.AppImage`) e abra.

## Estado real hoje (19/10/2026)

- **Nome:** Braid desde 19/10/2026. Antes foi "Enredo" e, no começo, "Montagem" (o `prototipo/` ainda tem esse nome). As chaves de armazenamento continuam com o prefixo `montagem:` de propósito, para não perder roteiros já salvos.
- **Existe e funciona:** a v1 do app (React + Vite), com mesa, cartões de ideia, partes, ligações, fio, timeline com curva de intensidade, biblioteca de estruturas e texto final. Roda no navegador (`npm run dev`) e como app de computador (Electron), com instalador para Windows e AppImage para Linux.
- **Onde ficam os roteiros:** no armazenamento local do app (IndexedDB). Não há conta nem servidor. O app de computador e o navegador guardam roteiros separados. Para levar um roteiro de um para o outro, use "Salvar cópia em arquivo" no menu do roteiro (gera um `.braid.json`); "Abrir arquivo…" traz de volta e também abre os `.enredo.json` antigos.
- **Laboratório:** a rodada R1 do painel de Refinamento está aberta. Barra do topo, Intenção e Cartão de ideia estão aprovados. As seções 4 a 9 estão marcadas "precisa de ajuste", sem anotação escrita. Biblioteca e Texto final ainda não foram revisados. Nenhuma rodada foi fechada.
- **Build x laboratório:** o build final usa sempre a **primeira** opção de cada variação. As escolhas feitas no painel não vão para o build.
- **Lançamento:** subir uma tag `v*` dispara `.github/workflows/lancar.yml`, que monta o `.exe` e o AppImage e publica a Release. Não há atualização automática nem assinatura de código.

## Rodar

```bash
npm install
npm run dev        # abre em http://localhost:5173
npm test           # regras do roteiro (src/model/modelo.test.ts)
npm run typecheck  # checagem de tipos
npm run build      # versão final em dist/
npm run preview    # serve o dist/ para conferir
npm run app        # abre como app de computador (Electron)
npm run instalador # gera o instalador do sistema atual em release/
```

### Laboratório (painel de Refinamento)

Com `npm run dev` aberto, aperte **R** para abrir o painel de Refinamento. É o mesmo painel do laboratório das lojas (nasceu no `lab-bioma`), copiado para cá em 29/09/2026.

- Cada seção do app tem variações para comparar, status, anotação, alfinete na tela (P) e antes/depois por commit (A).
- As seções e variações ficam em `src/lab/refinamento.ts`. No código, cada seção é marcada com `data-lab="<n>"`.
- As anotações ficam em `laboratorio/app/anotacoes.json` (estado) e `laboratorio/app/ANOTACOES.md` (leitura). O protocolo da IA está em `laboratorio/refinamento/README.md`.
- O servidor que grava as anotações é um plugin em `vite.config.ts` e só roda no `npm run dev`. Diferença para as lojas: aqui a "página" é o app React inteiro, então a versão antiga do antes/depois leva `index.html`, `src/` e `public/`.
- O painel não existe no build final.

### Identidade visual

`npm run identidade:sync` copia os tokens de cor da identidade do Victor para `src/design/identidade.css`. Defina `IDENTIDADE_DIR` apontando para o clone de `victor-moraes-identidade`: sem isso, o script procura uma pasta vizinha com o nome antigo do repositório e pode não achar.

## Onde está cada coisa

- `docs/brief.md`: o brief do produto nas palavras do Victor. É a fonte da intenção.
- `SPEC.md`: especificação v1 (modelo, regras, interação).
- `docs/pesquisa-biblioteca.md`: pesquisa por trás das estruturas e curvas, com fontes e grau de evidência.
- `docs/DESIGN-SYSTEM.md`: cores, tokens e regras visuais (o laranja é sinal).
- `src/model/`: tipos, regras (funções puras), estado, persistência e exemplo, com testes em `modelo.test.ts`.
- `src/biblioteca/`: estruturas, curvas e funções de ritmo (dados).
- `src/canvas/`: a mesa (React Flow), cartões, partes, ligações e controles.
- `src/timeline/`: a faixa com trechos e curva.
- `src/painel/`: barra do topo, intenção, biblioteca, texto final.
- `src/ui/`: peças pequenas (popover, seletor, avisos, ícones).
- `src/design/`: `tokens.css` (significado) e `identidade.css` (cores sincronizadas).
- `src/lab/refinamento.ts`: seções e variações do painel.
- `laboratorio/`: o painel de Refinamento (`refinamento/`) e as anotações do app (`app/`).
- `scripts/sync-identidade.mjs`: o script do `identidade:sync`.
- `prototipo/`: primeira prova de conceito, arquivo único (histórico).
- `electron/main.cjs`: a janela do app de computador (abre o `dist/`).
- `build/icon.png`: ícone do app (a trança), gerado de `public/favicon.svg` com `npm run icone`. As opções do desenho saem de `scripts/desenhar-icone.py`.
- `.github/workflows/lancar.yml`: monta e publica os instaladores ao subir uma tag `v*`.

Para lançar uma versão nova: suba o número em `package.json`, faça o commit e rode `git tag v<versão> && git push --tags`.

## Repos relacionados

- [`lab-bioma`](https://github.com/victormoraesaraujo343/lab-bioma): onde nasceu o laboratório de design e o painel de Refinamento.
- [`lab-modelo-loja`](https://github.com/victormoraesaraujo343/lab-modelo-loja): o modelo de loja que usa o mesmo painel.
- [`victor-moraes-identidade`](https://github.com/victormoraesaraujo343/victor-moraes-identidade): a identidade visual de onde vêm as cores.
