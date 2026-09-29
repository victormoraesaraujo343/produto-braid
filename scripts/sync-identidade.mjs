// Copia os tokens da identidade visual do Victor para este projeto.
// Ordem de busca: IDENTIDADE_DIR/fundacao, ../victor-moraes-identidade-visual/fundacao, ../novo-portifolio (cópia sincronizada).
import { readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const candidatos = [
  process.env.IDENTIDADE_DIR && path.join(process.env.IDENTIDADE_DIR, 'fundacao', 'tokens.css'),
  path.resolve('..', 'victor-moraes-identidade-visual', 'fundacao', 'tokens.css'),
  path.resolve('..', 'novo-portifolio', 'src', 'styles', 'identidade', 'tokens.css'),
].filter(Boolean)

const origem = candidatos.find((c) => existsSync(c))
if (!origem) {
  console.error('Identidade não encontrada. Defina IDENTIDADE_DIR ou clone victor-moraes-identidade-visual ao lado deste repo.')
  process.exit(1)
}
const css = (await readFile(origem, 'utf8')).split('\n').slice(2).join('\n')
const cabecalho = `/* Cópia da fundação de identidade do Victor (via ${path.relative(process.cwd(), origem)}).\n   Não editar aqui: rode 'npm run identidade:sync'. */\n`
await writeFile('src/design/identidade.css', cabecalho + css)
console.log(`Identidade sincronizada de ${origem}`)
