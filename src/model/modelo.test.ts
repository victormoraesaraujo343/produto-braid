import { describe, it, expect } from 'vitest'
import { RAIZ } from './tipos'
import * as op from './operacoes'
import { leitura, duracao, compilar, analisarRitmo, trechos, alvoEm, posAbs } from './derivar'
import type { Estrutura } from '../biblioteca/tipos'

const palavras = (n: number) => Array.from({ length: n }, (_, i) => `p${i}`).join(' ')

function base() {
  const d = op.docVazio('Teste')
  const p1 = op.criarParte(d, RAIZ, 0, 0, 'Começo')
  const p2 = op.criarParte(d, RAIZ, 400, 0, 'Fim')
  const a = op.criarIdeia(d, p1, 20, 100, 'A a a')
  const b = op.criarIdeia(d, p1, 20, 200, 'B b')
  const c = op.criarIdeia(d, p2, 20, 100, 'C')
  const solta = op.criarIdeia(d, RAIZ, 900, 900, 'solta')
  return { d, p1, p2, a, b, c, solta }
}

describe('fio e leitura', () => {
  it('lê em profundidade, na ordem das sequências', () => {
    const { d, a, b, c } = base()
    expect(leitura(d)).toEqual([a, b, c])
  })
  it('ideia criada na mesa fica fora do fio', () => {
    const { d, solta } = base()
    expect(leitura(d)).not.toContain(solta)
    expect(d.nos[RAIZ].sequencia).not.toContain(solta)
  })
  it('vem depois só vale no mesmo recipiente', () => {
    const { d, a, c } = base()
    expect(op.ligarDepois(d, a, c)).toBe(false)
  })
  it('vem depois move B para logo depois de A', () => {
    const { d, p1, a, b } = base()
    op.ligarDepois(d, b, a)
    expect(d.nos[p1].sequencia).toEqual([b, a])
  })
  it('reparentar entra no fio da parte e mantém a posição absoluta', () => {
    const { d, p2, solta } = base()
    const antes = posAbs(d, solta)
    op.reparentar(d, solta, p2)
    expect(d.nos[p2].sequencia.at(-1)).toBe(solta)
    const depois = posAbs(d, solta)
    expect(depois.x).toBe(antes.x)
    expect(depois.y).toBe(antes.y)
  })
  it('não deixa uma parte entrar nela mesma', () => {
    const { d, p1 } = base()
    const sub = op.criarParte(d, p1, 0, 100)
    expect(op.reparentar(d, p1, sub)).toBe(false)
  })
})

describe('duração', () => {
  it('sai das palavras e do ritmo', () => {
    const d = op.docVazio()
    const p = op.criarParte(d, RAIZ, 0, 0)
    op.criarIdeia(d, p, 0, 0, palavras(150))
    expect(duracao(d, RAIZ)).toBeCloseTo(60)
    d.ritmo = 300
    expect(duracao(d, RAIZ)).toBeCloseTo(30)
  })
})

describe('operações de estrutura', () => {
  it('juntar une os textos e B some', () => {
    const { d, p1, a, b } = base()
    op.juntar(d, a, b)
    expect(d.nos[b]).toBeUndefined()
    expect(d.nos[a].texto).toBe('A a a\n\nB b')
    expect(d.nos[p1].sequencia).toEqual([a])
  })
  it('juntar solta com ideia no fio: a solta assume o lugar', () => {
    const { d, p1, a, b } = base()
    const s = op.criarIdeia(d, p1, 0, 0, 'S', false)
    op.juntar(d, s, a)
    expect(d.nos[p1].sequencia).toEqual([s, b])
  })
  it('virar parte mantém o lugar no fio', () => {
    const { d, p1, a, b } = base()
    const np = op.virarParte(d, a)!
    expect(d.nos[p1].sequencia).toEqual([np, b])
    expect(d.nos[a].pai).toBe(np)
    expect(leitura(d, p1)).toEqual([a, b])
  })
  it('desfazer parte devolve o conteúdo na mesma ordem', () => {
    const { d, p1, a, b, c } = base()
    op.desfazerParte(d, p1)
    expect(d.nos[RAIZ].sequencia[0]).toBe(a)
    expect(leitura(d)).toEqual([a, b, c])
  })
  it('agrupar cria parte no lugar do primeiro', () => {
    const { d, p1, a, b } = base()
    const g = op.agrupar(d, [b, a], 'Grupo')!
    expect(d.nos[p1].sequencia).toEqual([g])
    expect(d.nos[g].sequencia).toEqual([a, b])
  })
  it('apagar parte leva os filhos e limpa ligações', () => {
    const { d, p1, a, c } = base()
    op.ligar(d, a, c, 'explica')
    op.apagar(d, [p1])
    expect(d.nos[a]).toBeUndefined()
    expect(d.ligacoes).toHaveLength(0)
    expect(d.nos[RAIZ].sequencia).not.toContain(p1)
  })
  it('aplicar estrutura cria vagas e deixa o que existia solto', () => {
    const { d, p1, a } = base()
    const e: Estrutura = {
      id: 'x', nome: 'X', escala: 'micro', serve: '', logica: '', origem: '', fontes: [], armadilha: '', realizacoes: [],
      etapas: [
        { chave: 'um', nome: 'Um', funcao: '', pergunta: '', intensidade: 2, peso: 1 },
        { chave: 'dois', nome: 'Dois', funcao: '', pergunta: '', intensidade: 5, peso: 3 },
      ],
    }
    const vagas = op.aplicarEstrutura(d, p1, e, { x: 0, y: 300 })
    expect(d.nos[p1].sequencia).toEqual(vagas)
    expect(d.nos[a].pai).toBe(p1)
    expect(d.nos[p1].alvo?.pontos).toEqual([[0.125, 2], [0.625, 5]])
  })
})

describe('texto final', () => {
  it('compila na ordem e aponta ideias fora do fio', () => {
    const { d, solta } = base()
    const r = compilar(d, { formato: 'corrido', titulosPartes: false, intencoes: false })
    expect(r.texto.trim()).toBe('A a a\n\nB b\n\nC')
    expect(r.foraDoFio).toEqual([solta])
  })
  it('markdown usa títulos por nível', () => {
    const { d } = base()
    const r = compilar(d, { formato: 'markdown', titulosPartes: true, intencoes: false })
    expect(r.texto).toContain('# Teste')
    expect(r.texto).toContain('## Começo')
  })
})

describe('ritmo', () => {
  it('aponta trecho longo no alto', () => {
    const d = op.docVazio()
    const p = op.criarParte(d, RAIZ, 0, 0)
    for (let i = 0; i < 4; i++) {
      const id = op.criarIdeia(d, p, 0, 0, palavras(60))
      d.nos[id].intensidade = i === 0 ? 1 : 5
    }
    const av = analisarRitmo(trechos(d))
    expect(av.some((a) => a.tipo === 'alto-demais')).toBe(true)
  })
  it('curva-alvo interpola', () => {
    expect(alvoEm([[0, 1], [1, 5]], 0.5)).toBe(3)
  })
})
