# Enredo

Ferramenta de escrita para quem pensa de forma não linear: você joga as ideias numa mesa, liga e agrupa, dá uma ordem (o fio), vê a narrativa no tempo com a curva de intensidade, e no fim tira um texto linear pronto. O nome vem do duplo sentido: enredo é a trama de uma história e também um emaranhado. O app vai de um para o outro.

## Rodar

```bash
npm install
npm run dev      # abre em http://localhost:5173
npm test         # regras do roteiro
npm run build    # versão final em dist/
```

### Laboratório (painel de Refinamento)

Com `npm run dev` aberto, aperte **R** para abrir o painel de Refinamento (o mesmo do lab das lojas). Cada seção do app tem variações para comparar, status, anotação, alfinete na tela (P) e antes/depois por commit (A). As anotações ficam em `laboratorio/app/ANOTACOES.md`; o protocolo está em `laboratorio/refinamento/README.md`. Seções e variações: `src/lab/refinamento.ts`. O painel não existe no build final.

Os roteiros ficam guardados no navegador. Para levar para outro lugar, use "Salvar cópia em arquivo" no menu do roteiro.

## Onde está cada coisa

- `docs/brief.md`: o brief do produto nas palavras do Victor. É a fonte da intenção.
- `SPEC.md`: especificação v1 (modelo, regras, interação).
- `docs/pesquisa-biblioteca.md`: pesquisa por trás das estruturas e curvas, com fontes e grau de evidência.
- `src/model/`: tipos, regras (funções puras), estado, exemplo, com testes em `modelo.test.ts`.
- `src/biblioteca/`: estruturas, curvas e funções de ritmo (dados).
- `src/canvas/`: a mesa (React Flow), cartões, partes, ligações.
- `src/timeline/`: a faixa com trechos e curva.
- `src/painel/`: barra do topo, intenção, biblioteca, texto final.
- `prototipo/`: primeira prova de conceito, arquivo único (histórico).
