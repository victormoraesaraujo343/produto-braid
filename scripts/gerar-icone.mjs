// Gera build/icon.png (ícone do app de computador) a partir de public/favicon.svg.
import { readFileSync, writeFileSync } from 'node:fs'
import { Resvg } from '@resvg/resvg-js'

const svg = readFileSync(new URL('../public/favicon.svg', import.meta.url), 'utf8')
const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1024 } }).render().asPng()
writeFileSync(new URL('../build/icon.png', import.meta.url), png)
console.log('build/icon.png pronto')
