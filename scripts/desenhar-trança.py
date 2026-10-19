# Desenha as opções do ícone de trança (A–D) em SVG. A escolhida (B) virou public/favicon.svg; a A virou a Marca do topo.
# Uso: python3 scripts/desenhar-trança.py <pasta-de-saida>
import sys
out = sys.argv[1]
CLARO, GRAF = '#EEEAE3', '#26292D'

def tranca(cores, fundo, passos=4, topo=5.5, base=26.5, col=(9.5, 16, 22.5), larg=3.2, borda=1.5, junta=False, cor_junta=GRAF, horizontal=False):
    """Trança de três fios: a cada passo, um fio de fora cruza POR CIMA do fio do meio (alternando os lados)."""
    fim = base - (6.5 if junta else 0)
    h = (fim - topo) / passos
    pos = [0, 1, 2]                      # pos[f] = coluna do fio f
    baixo, cima = [], []
    for k in range(passos):
        y0, y1 = topo + k * h, topo + (k + 1) * h
        lado = 0 if k % 2 == 0 else 2    # coluna de fora que cruza
        f_fora = pos.index(lado); f_meio = pos.index(1)
        for f in range(3):
            a = pos[f]
            b = 1 if f == f_fora else lado if f == f_meio else a
            seg = (col[a], y0, col[b], y1, cores[f])
            (cima if f == f_fora else baixo).append(seg)
        pos[f_fora], pos[f_meio] = 1, lado
    # curva suave (Catmull-Rom) passando pelos nós de cada fio, para o fio ondular em vez de dar degraus
    nos = {}
    pos2 = [0, 1, 2]
    for f in range(3): nos[f] = [(col[f], topo)]
    for k in range(passos):
        lado = 0 if k % 2 == 0 else 2
        f_fora = pos2.index(lado); f_meio = pos2.index(1)
        pos2[f_fora], pos2[f_meio] = 1, lado
        for f in range(3): nos[f].append((col[pos2[f]], topo + (k + 1) * h))
    def seg_suave(f, k, tens=0.5):
        P = nos[f]; n = len(P) - 1
        p0 = P[max(k - 1, 0)]; p1 = P[k]; p2 = P[k + 1]; p3 = P[min(k + 2, n)]
        c1 = (p1[0] + (p2[0] - p0[0]) * tens / 3 * 2, p1[1] + (p2[1] - p0[1]) * tens / 3 * 2)
        c2 = (p2[0] - (p3[0] - p1[0]) * tens / 3 * 2, p2[1] - (p3[1] - p1[1]) * tens / 3 * 2)
        return f'M{p1[0]:.2f} {p1[1]:.2f}C{c1[0]:.2f} {c1[1]:.2f} {c2[0]:.2f} {c2[1]:.2f} {p2[0]:.2f} {p2[1]:.2f}'
    ret = []
    def d(x0, y0, x1, y1):
        ym = (y0 + y1) / 2
        return f'M{x0:.2f} {y0:.2f}C{x0:.2f} {ym:.2f} {x1:.2f} {ym:.2f} {x1:.2f} {y1:.2f}'
    por_cima = []
    pos3 = [0, 1, 2]
    for k in range(passos):
        lado = 0 if k % 2 == 0 else 2
        f_fora = pos3.index(lado); f_meio = pos3.index(1)
        for f in range(3):
            if f != f_fora: ret.append(f'<path d="{seg_suave(f, k)}" stroke="{cores[f]}" stroke-width="{larg}" stroke-linecap="round" fill="none"/>')
        por_cima.append((f_fora, k))
        pos3[f_fora], pos3[f_meio] = 1, lado
    for f, k in por_cima:
        ret.append(f'<path d="{seg_suave(f, k)}" stroke="{fundo}" stroke-width="{larg + 2 * borda}" stroke-linecap="butt" fill="none"/>')
        ret.append(f'<path d="{seg_suave(f, k)}" stroke="{cores[f]}" stroke-width="{larg}" stroke-linecap="round" fill="none"/>')
    if junta:   # os três fios se encontram e seguem como um fio só: o texto final
        for f in range(3):
            x = col[pos[f]]
            ret.insert(0, f'<path d="{d(x, fim, 16, fim + 4)}" stroke="{cores[f]}" stroke-width="{larg}" stroke-linecap="round" fill="none"/>')
        ret.append(f'<path d="M16 {fim + 3.6:.2f}L16 {base:.2f}" stroke="{cor_junta}" stroke-width="{larg}" stroke-linecap="round" fill="none"/>')
    corpo = '\n'.join(ret)
    if horizontal: corpo = f'<g transform="rotate(-90 16 16)">{corpo}</g>'
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="{fundo}"/>\n{corpo}\n</svg>\n'

CINZA, OURO, LARANJA = '#97A1AB', '#D6B26A', '#FF7300'
op = {
  'A': tranca([CINZA, OURO, LARANJA], CLARO, passos=5, col=(10, 16, 22), larg=3.0),
  'B': tranca(['#7D8894', '#CDAE68', LARANJA], GRAF, passos=5, col=(10, 16, 22), larg=3.0),
  'C': tranca([CINZA, OURO, LARANJA], CLARO, passos=4, col=(10, 16, 22), larg=3.0, junta=True),
  'D': tranca([GRAF, '#B9BEC4', LARANJA], CLARO, passos=5, col=(10, 16, 22), larg=3.0, horizontal=True),
}
for n, s in op.items(): open(f'{out}/{n}.svg', 'w').write(s)
