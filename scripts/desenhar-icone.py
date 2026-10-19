# Desenha o ícone de trança do Braid em SVG (opções A–D). A escolhida (A: trança horizontal que atravessa o
# ícone de ponta a ponta) virou public/favicon.svg e a Marca do topo. Uso: python3 scripts/desenhar-icone.py <pasta>
import math, sys
out = sys.argv[1]
CLARO, GRAF, CINZA, LARANJA = '#EEEAE3', '#26292D', '#B9BEC4', '#FF7300'

def icone(nome, ondas=1.0, A=5.6, x0=5.0, x1=27.0, larg=3.2, borda=1.5, fase0=0.0, cores=(GRAF, CINZA, LARANJA), fundo=CLARO, rx=7, pontas='corte', env=None):
    """Trança horizontal de três fios senoidais (defasados 120°). Em cada cruzamento, passa por cima o fio
    que está indo para o centro — a regra da trança de verdade. As pontas são cortadas retas, alinhadas."""
    w = x1 - x0; k = 2 * math.pi * ondas / w
    fases = [fase0 + 2 * math.pi * i / 3 for i in range(3)]
    E = (lambda x: 1.0) if env is None else (lambda x: max(0.0, math.sin(math.pi * min(max((x - x0) / w, 0), 1))) ** env)
    y = lambda i, x: 16 + A * E(x) * math.sin(k * (x - x0) + fases[i])
    dy = lambda i, x: (y(i, x + 1e-4) - y(i, x - 1e-4)) / 2e-4
    def caminho(i, a, b, n=60):
        a, b = max(a, x0 if pontas == 'livre' else x0 - 1), min(b, x1 if pontas == 'livre' else x1 + 1)
        pts = [(a + (b - a) * t / n) for t in range(n + 1)]
        return 'M' + 'L'.join(f'{x:.3f} {y(i, x):.3f}' for x in pts)
    cap = 'round' if pontas == 'livre' else 'butt'
    s = [f'<path d="{caminho(i, x0 - 1, x1 + 1, 240)}" stroke="{cores[i]}" stroke-width="{larg}" stroke-linecap="{cap}" fill="none"/>' for i in range(3)]
    # cruzamentos
    cruz = []
    N = 4000
    for i in range(3):
        for j in range(i + 1, 3):
            for t in range(N):
                xa = x0 - 1 + (w + 2) * t / N; xb = x0 - 1 + (w + 2) * (t + 1) / N
                if (y(i, xa) - y(j, xa)) * (y(i, xb) - y(j, xb)) < 0:
                    xc = (xa + xb) / 2
                    yc = y(i, xc)
                    # vai para o centro = |y-16| diminuindo
                    ri = -(y(i, xc) - 16) * dy(i, xc); rj = -(y(j, xc) - 16) * dy(j, xc)
                    cruz.append((xc, i if ri > rj else j))
    d = 3.6
    for xc, f in sorted(cruz):
        c = caminho(f, xc - d, xc + d)
        s.append(f'<path d="{c}" stroke="{fundo}" stroke-width="{larg + 2 * borda}" stroke-linecap="butt" fill="none"/>')
        perto_fim = pontas == 'livre' and (xc - d - 0.3 <= x0 or xc + d + 0.3 >= x1)
        s.append(f'<path d="{caminho(f, xc - d - 0.3, xc + d + 0.3)}" stroke="{cores[f]}" stroke-width="{larg}" stroke-linecap="{'round' if perto_fim else 'butt'}" fill="none"/>')
    corpo = '\n'.join(s)
    if pontas == 'some':
        f = 4.5 / w
        defs = (f'<linearGradient id="g{nome}" x1="{x0}" x2="{x1}" y1="0" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff" stop-opacity="0"/>'
                f'<stop offset="{f:.3f}" stop-color="#fff"/><stop offset="{1 - f:.3f}" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>'
                f'<mask id="c{nome}" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32"><rect x="{x0}" y="0" width="{w}" height="32" fill="url(#g{nome})"/></mask>')
        uso = 'mask="url(#c{nome})"'
    elif pontas == 'redonda':
        defs = f'<clipPath id="c{nome}"><rect x="{x0}" y="{16 - A - larg / 2 - 0.2:.2f}" width="{w}" height="{2 * A + larg + 0.4:.2f}" rx="{A:.2f}"/></clipPath>'
        uso = 'clip-path="url(#c{nome})"'
    elif pontas == 'sangra':
        defs = f'<clipPath id="c{nome}"><rect width="32" height="32" rx="{rx}"/></clipPath>'; uso = f'clip-path="url(#c{nome})"'
    elif pontas == 'livre':
        defs = ''; uso = ''
    else:
        defs = f'<clipPath id="c{nome}"><rect x="{x0}" y="0" width="{w}" height="32"/></clipPath>'; uso = 'clip-path="url(#c{nome})"'
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><defs>{defs}</defs>'
           f'<rect width="32" height="32" rx="{rx}" fill="{fundo}"/>\n<g {uso}>\n{corpo}\n</g>\n</svg>\n')
    open(f'{out}/{nome}.svg', 'w').write(svg)

# sangrando: a trança atravessa o ícone de ponta a ponta; quem corta é a borda do próprio ícone.
# fase0 = -k*(16-x0): no centro do ícone os três fios ficam igualmente espaçados (simetria).
def sangra(nome, onda, A, larg, borda, **kw):
    x0, x1 = -4.0, 36.0
    ondas = (x1 - x0) / onda
    k = 2 * math.pi / onda
    icone(nome, ondas=ondas, x0=x0, x1=x1, A=A, larg=larg, borda=borda, fase0=-k * (16 - x0), pontas='sangra', **kw)
sangra('A', 22, 6.2, 3.6, 1.6)
sangra('B', 18, 5.6, 3.2, 1.5)
sangra('C', 26, 7.0, 4.0, 1.7)
sangra('D', 22, 6.2, 3.6, 1.6, fundo=GRAF, cores=('#EEEAE3', '#7D8894', LARANJA))
