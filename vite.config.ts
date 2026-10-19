import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

/* SERVIDOR DO LABORATÓRIO — só no `npm run dev`, a serviço do painel de Refinamento
   (laboratorio/refinamento/, copiado do lab das lojas, 29/09/2026):
   - grava as anotações em laboratorio/<pagina>/anotacoes.json + ANOTACOES.md e cada rodada em rodadas/R<n>.md;
   - informa o commit atual (carimbo das rodadas);
   - monta versões antigas do app em laboratorio/_versoes/<hash>/ (fora do git) para o antes e depois.
   A diferença para o lab das lojas: aqui a "página" é o app React, então a versão antiga leva index.html, src e public. */

const RAIZ = path.dirname(fileURLToPath(import.meta.url))
const LAB = path.join(RAIZ, 'laboratorio')
const VERSOES = path.join(LAB, '_versoes')
const STATUS: Record<string, string> = { revisar: 'Em revisão', pronta: 'Pronta para revisar', aprovada: 'Aprovada', ajustar: 'Precisa de ajuste', descartar: 'Descartar' }

type Alfinete = { secao: string; vista?: string; resolvido?: boolean; alvo?: string; x: number; y: number; texto?: string }
type Secao = { nome?: string; status?: string; nota?: string; variantes?: Record<string, string>; pedido?: { rodada: number; nota: string }; resposta?: { texto: string; rodada?: number } }
type Rodada = { numero: number; aberta_em?: string; fechada_em?: string; commit?: { hash?: string; curto?: string; sujo?: boolean }; geral?: string; secoes?: Record<string, Secao>; alfinetes?: Alfinete[] }
type Anotacoes = { atualizado?: string; rodada?: { numero: number }; geral?: string; secoes?: Record<string, Secao>; alfinetes?: Alfinete[]; rodadas?: Rodada[]; pedidoDeRevisao?: { em: string; rodada: number; atendido?: boolean }; pedidoGeral?: { rodada: number; texto: string } }

const git = (...args: string[]) => execFileSync('git', args, { cwd: RAIZ, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim()
const pastaDa = (pagina: string | null) => {
  if (!/^[a-z0-9-]+$/.test(pagina ?? '')) throw new Error('página inválida')
  return path.join(LAB, pagina!)
}
const lerCorpo = (req: NodeJS.ReadableStream) => new Promise<string>((ok, erro) => { let c = ''; req.on('data', (x) => (c += x)); req.on('end', () => ok(c)); req.on('error', erro) })
const responder = (res: import('node:http').ServerResponse, dado: unknown, status = 200) => { res.statusCode = status; res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(dado)) }

function secoesEmMarkdown(secoes: Record<string, Secao> = {}, alfinetes: Alfinete[] = [], { atual = true } = {}) {
  const linhas: string[] = []
  const todas: Record<string, Secao> = { ...Object.fromEntries(alfinetes.map((a) => [a.secao, { status: 'revisar', variantes: {} }])), ...secoes }
  for (const [n, s] of Object.entries(todas).sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]))) {
    const vars = Object.entries(s.variantes ?? {}).map(([k, v]) => `${k}: **${v}**`).join(' · ')
    const pins = alfinetes.filter((a) => a.secao === n)
    const temAlgo = s.nota?.trim() || (s.status ?? 'revisar') !== 'revisar' || vars || pins.length || s.pedido || s.resposta
    if (!temAlgo) continue
    linhas.push(`## ${n} · ${s.nome ?? ''}`, '', `Status: **${STATUS[s.status ?? 'revisar'] ?? s.status}**${vars ? `  \nVariantes vistas: ${vars}` : ''}`, '')
    if (atual && s.pedido?.nota) linhas.push(`> **Pedido da R${s.pedido.rodada}:** ${s.pedido.nota.replace(/\n/g, '\n> ')}`, '')
    if (atual && s.resposta?.texto) linhas.push(`> **Resposta da IA${s.resposta.rodada ? ` (R${s.resposta.rodada})` : ''}:** ${s.resposta.texto.replace(/\n/g, '\n> ')}`, '')
    if (s.nota?.trim()) linhas.push(s.nota.trim(), '')
    for (const a of pins) linhas.push(`- 📍 ${a.vista === 'mobile' ? '**[mobile]** ' : ''}${a.resolvido ? '~~' : ''}${a.alvo} (x ${Math.round(a.x * 100)}%, y ${Math.round(a.y * 100)}% da seção): ${a.texto?.trim() || 'sem texto'}${a.resolvido ? '~~ (resolvido)' : ''}`)
    if (pins.length) linhas.push('')
  }
  return linhas
}

function emMarkdown(d: Anotacoes, pagina: string) {
  const r = d.rodada ?? { numero: 1 }
  const linhas = [`# Refinamento — ${pagina} · rodada R${r.numero}`, '', `Gerado pelo painel de Refinamento em ${d.atualizado ?? '—'}. Não editar à mão: o painel regrava este arquivo. A IA responde em \`anotacoes.json\` (\`secoes[n].resposta\` + status \`pronta\`).`, '']
  if (d.pedidoDeRevisao && !d.pedidoDeRevisao.atendido) linhas.push(`**Revisão pedida à IA** em ${d.pedidoDeRevisao.em} (pedidos da R${d.pedidoDeRevisao.rodada}).`, '')
  if (d.pedidoGeral?.texto) linhas.push(`## Geral · pedido da R${d.pedidoGeral.rodada}`, '', d.pedidoGeral.texto, '')
  if (d.geral?.trim()) linhas.push(`## Geral · R${r.numero}`, '', d.geral.trim(), '')
  linhas.push(...secoesEmMarkdown(d.secoes, d.alfinetes ?? []))
  if (d.rodadas?.length) linhas.push('## Rodadas fechadas', '', ...d.rodadas.map((x) => `- R${x.numero} · ${x.fechada_em} · commit ${x.commit?.curto ?? '—'}${x.commit?.sujo ? '+alterações' : ''} → \`rodadas/R${x.numero}.md\``), '')
  return linhas.join('\n')
}

function rodadaEmMarkdown(x: Rodada, pagina: string) {
  const linhas = [`# Refinamento — ${pagina} · R${x.numero} (fechada)`, '', `Aberta em ${x.aberta_em ?? '—'} · fechada em ${x.fechada_em} · commit ${x.commit?.hash ?? '—'}${x.commit?.sujo ? ' (com alterações não commitadas)' : ''}`, '']
  if (x.geral?.trim()) linhas.push('## Geral', '', x.geral.trim(), '')
  linhas.push(...secoesEmMarkdown(x.secoes, x.alfinetes ?? [], { atual: false }))
  return linhas.join('\n')
}

function refinamento(): Plugin {
  return {
    name: 'lab-refinamento',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/__lab/anotacoes', async (req, res) => {
        try {
          const pagina = new URL(req.url!, 'http://x').searchParams.get('pagina') ?? 'app'
          const pasta = pastaDa(pagina)
          const arqJson = path.join(pasta, 'anotacoes.json')
          if (req.method === 'GET') return responder(res, existsSync(arqJson) ? JSON.parse(readFileSync(arqJson, 'utf8')) : {})
          if (req.method !== 'POST') return responder(res, { ok: false }, 405)
          const d = JSON.parse(await lerCorpo(req)) as Anotacoes
          d.atualizado = new Date().toISOString()
          mkdirSync(pasta, { recursive: true })
          writeFileSync(arqJson, JSON.stringify(d, null, 2) + '\n')
          writeFileSync(path.join(pasta, 'ANOTACOES.md'), emMarkdown(d, pagina) + '\n')
          for (const x of d.rodadas ?? []) {
            const alvo = path.join(pasta, 'rodadas', `R${x.numero}.md`)
            if (existsSync(alvo)) continue
            mkdirSync(path.dirname(alvo), { recursive: true })
            writeFileSync(alvo, rodadaEmMarkdown(x, pagina) + '\n')
          }
          responder(res, { ok: true, atualizado: d.atualizado })
        } catch (e) { responder(res, { ok: false, erro: String(e) }, 400) }
      })

      server.middlewares.use('/__lab/git', (_req, res) => {
        try { responder(res, { hash: git('rev-parse', 'HEAD'), curto: git('rev-parse', '--short', 'HEAD'), sujo: git('status', '--porcelain', '--', 'src', 'index.html').length > 0 }) }
        catch { responder(res, null) }
      })

      server.middlewares.use('/__lab/versoes', (_req, res) => {
        try {
          const log = git('log', '-n', '20', '--date=format:%d/%m %H:%M', '--format=%H%x09%h%x09%ad%x09%s', '--', 'src', 'index.html')
          responder(res, log ? log.split('\n').map((l) => { const [hash, curto, data, msg] = l.split('\t'); return { hash, curto, data, msg } }) : [])
        } catch { responder(res, []) }
      })

      server.middlewares.use('/__lab/versao', (req, res) => {
        try {
          const hash = new URL(req.url!, 'http://x').searchParams.get('hash') ?? ''
          if (!/^[0-9a-f]{7,40}$/.test(hash)) return responder(res, { ok: false, erro: 'hash inválido' }, 400)
          const destino = path.join(VERSOES, hash)
          if (!existsSync(path.join(destino, 'src'))) {
            mkdirSync(destino, { recursive: true })
            const itens = ['index.html', 'src', 'public', 'laboratorio/refinamento'].filter((p) => { try { git('cat-file', '-e', `${hash}:${p}`); return true } catch { return false } })
            const tar = execFileSync('git', ['archive', '--format=tar', hash, ...itens], { cwd: RAIZ, maxBuffer: 1 << 30 })
            execFileSync('tar', ['-x', '-C', destino], { input: tar })
            // Versões antigas apontavam o script de entrada para a raiz; aqui ele precisa ser relativo.
            const idx = path.join(destino, 'index.html')
            if (existsSync(idx)) writeFileSync(idx, readFileSync(idx, 'utf8').replace('src="/src/main.tsx"', 'src="./src/main.tsx"'))
          }
          responder(res, { ok: true })
        } catch (e) { responder(res, { ok: false, erro: String(e) }, 500) }
      })
    },
  }
}

export default defineConfig({
  // Caminhos relativos: o app de computador abre o dist/ direto do disco.
  base: './',
  plugins: [react(), refinamento()],
  optimizeDeps: { entries: ['index.html'] },
  server: {
    watch: { ignored: ['**/laboratorio/*/anotacoes.json', '**/laboratorio/*/ANOTACOES.md', '**/laboratorio/*/rodadas/**', '**/laboratorio/_versoes/**'] },
  },
  test: { environment: 'jsdom', exclude: ['**/node_modules/**', 'laboratorio/**'] },
} as never)
