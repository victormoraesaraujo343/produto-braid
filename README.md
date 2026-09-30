# Enredo

Ferramenta de escrita para quem pensa de forma não linear: você joga as ideias numa mesa, liga e agrupa, dá uma ordem (o fio), vê a narrativa no tempo com a curva de intensidade, e no fim tira um texto linear pronto. O nome vem do duplo sentido: enredo é a trama de uma história e também um emaranhado. O app vai de um para o outro.

## Estado real hoje (30/09/2026)

- **Existe e funciona:** a v1 do app (React + Vite), com mesa, cartões de ideia, partes, ligações, fio, timeline com curva de intensidade, biblioteca de estruturas e texto final. Conferido em 30/09/2026: `npm test` (18 testes), `npm run typecheck` e `npm run build` passam.
- **Onde ficam os roteiros:** só no navegador (IndexedDB). Não há conta nem servidor. Para levar um roteiro para outro lugar, use "Salvar cópia em arquivo" no menu do roteiro (gera um `.enredo.json`); "Abrir arquivo…" traz de volta.
- **Laboratório:** a rodada R1 do painel de Refinamento está aberta. Barra do topo, Intenção e Cartão de ideia estão aprovados. As seções 4 a 9 estão marcadas "precisa de ajuste", sem anotação escrita. Biblioteca e Texto final ainda não foram revisados. Nenhuma rodada foi fechada.
- **Build x laboratório:** o build final usa sempre a **primeira** opção de cada variação. As escolhas feitas no painel não vão para o build (não existe um passo que leve essas escolhas). Exemplo: a Barra do topo foi aprovada na opção "completa", mas o build sai com a "enxuta".
- **Não há** deploy, CI nem publicação configurados.
- **Histórico:** 5 commits, todos de 29/09/2026. O projeto começou com o nome provisório "Montagem" (o `prototipo/` ainda tem esse nome).

## Rodar

```bash
npm install
npm run dev        # abre em http://localhost:5173
npm test           # regras do roteiro (src/model/modelo.test.ts)
npm run typecheck  # checagem de tipos
npm run build      # versão final em dist/
npm run preview    # serve o dist/ para conferir
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

## Repos relacionados

- [`lab-bioma`](https://github.com/victormoraesaraujo343/lab-bioma): onde nasceu o laboratório de design e o painel de Refinamento.
- [`lab-modelo-loja`](https://github.com/victormoraesaraujo343/lab-modelo-loja): o modelo de loja que usa o mesmo painel.
- [`victor-moraes-identidade`](https://github.com/victormoraesaraujo343/victor-moraes-identidade): a identidade visual de onde vêm as cores.
