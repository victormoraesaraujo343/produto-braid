import { useEffect, useMemo, useState } from 'react'
import { useStore } from '../model/store'
import { RAIZ } from '../model/tipos'
import { compilar, fmtTempo, rotulo, type Formato } from '../model/derivar'
import { baixarArquivo, cls, nomeArquivo } from '../ui/util'
import { IcoBaixar, IcoCopiar, IcoVoltar } from '../ui/icones'

function lerOpcoes() {
  try {
    const o = JSON.parse(localStorage.getItem('montagem:texto') ?? 'null')
    if (o && o.formato) return o as { formato: Formato; titulosPartes: boolean; intencoes: boolean }
  } catch { /* usa o padrão */ }
  return { formato: 'corrido' as Formato, titulosPartes: true, intencoes: false }
}

/** A montagem compilada: o roteiro linear, pronto para ler, revisar ou entregar. */
export function TextoFinal() {
  const doc = useStore((s) => s.doc)
  const setUI = useStore((s) => s.setUI)
  const mostrar = useStore((s) => s.mostrar)
  const focar = useStore((s) => s.focar)
  const [o, setO] = useState(lerOpcoes)
  const [status, setStatus] = useState('')

  useEffect(() => { try { localStorage.setItem('montagem:texto', JSON.stringify(o)) } catch { /* ok */ } }, [o])
  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setUI({ painel: null }) }
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [setUI])

  const c = useMemo(() => compilar(doc, o), [doc, o])
  const titulo = rotulo(doc.nos[RAIZ])

  const copiar = async () => {
    try { await navigator.clipboard.writeText(c.texto); setStatus('Texto copiado.') }
    catch { setStatus('Não foi possível copiar. Selecione o texto e use Ctrl+C.') }
  }
  const baixar = () => {
    const ext = o.formato === 'markdown' ? 'md' : 'txt'
    baixarArquivo(`${nomeArquivo(titulo)}.${ext}`, c.texto, o.formato === 'markdown' ? 'text/markdown' : 'text/plain')
    setStatus(`Arquivo .${ext} baixado.`)
  }
  const irPara = (id: string) => { setUI({ painel: null }); if (doc.nos[id]?.tipo === 'parte') focar(id); else mostrar(id) }

  return (
    <div className="texto-final" role="dialog" aria-modal="true" aria-label="Texto final" data-lab="11">
      <header className="tf-topo">
        <button className="botao" onClick={() => setUI({ painel: null })}><IcoVoltar /> Voltar para a mesa</button>
        <div className="tf-opcoes">
          <div className="segmentado" role="radiogroup" aria-label="Formato">
            {([['corrido', 'Texto corrido'], ['tempos', 'Com tempos'], ['markdown', 'Markdown']] as const).map(([v, t]) => (
              <button key={v} role="radio" aria-checked={o.formato === v} className={cls(o.formato === v && 'on')}
                onClick={() => setO({ ...o, formato: v })}>{t}</button>
            ))}
          </div>
          <label className="check"><input type="checkbox" checked={o.titulosPartes} onChange={(e) => setO({ ...o, titulosPartes: e.target.checked })} /> Títulos das partes</label>
          <label className="check"><input type="checkbox" checked={o.intencoes} onChange={(e) => setO({ ...o, intencoes: e.target.checked })} /> Intenções como notas</label>
        </div>
        <div className="tf-acoes">
          <span className="tf-status" role="status">{status}</span>
          <button className="botao" onClick={copiar}><IcoCopiar /> Copiar</button>
          <button className="botao botao-primario" onClick={baixar}><IcoBaixar /> Baixar .{o.formato === 'markdown' ? 'md' : 'txt'}</button>
        </div>
      </header>

      <div className="tf-corpo">
        <nav className="tf-sumario" aria-label="Partes">
          <p className="tf-rot">Sequência</p>
          <ol>
            {c.secoes.map((s) => (
              <li key={s.id} style={{ paddingLeft: (s.nivel - 1) * 14 }}>
                <button onClick={() => document.getElementById(`sec-${s.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                  <span className="tf-sum-tempo">{fmtTempo(s.inicio)}</span> {s.titulo}
                </button>
              </li>
            ))}
          </ol>
          <dl className="tf-numeros">
            <div><dt>Palavras</dt><dd>{c.palavras}</dd></div>
            <div><dt>Duração</dt><dd>{fmtTempo(c.duracao)}</dd></div>
            <div><dt>Palavras/min</dt><dd>{doc.ritmo}</dd></div>
          </dl>
          {(c.vagasVazias.length > 0 || c.foraDoFio.length > 0) && (
            <div className="tf-avisos">
              {c.vagasVazias.length > 0 && (
                <p>{c.vagasVazias.length} {c.vagasVazias.length === 1 ? 'parte está vazia' : 'partes estão vazias'}:{' '}
                  {c.vagasVazias.map((id, i) => <span key={id}>{i > 0 && ', '}<button className="botao-link" onClick={() => irPara(id)}>{rotulo(doc.nos[id], 24)}</button></span>)}
                </p>
              )}
              {c.foraDoFio.length > 0 && (
                <p>{c.foraDoFio.length} {c.foraDoFio.length === 1 ? 'ideia ficou' : 'ideias ficaram'} fora do fio e não {c.foraDoFio.length === 1 ? 'entra' : 'entram'} no texto.{' '}
                  <button className="botao-link" onClick={() => { setUI({ painel: null, selecao: c.foraDoFio }); focar(RAIZ) }}>Ver na mesa</button>
                </p>
              )}
            </div>
          )}
        </nav>

        <article className={cls('tf-pagina', `tf-${o.formato}`)}>
          <div className="tf-coluna">
          {o.formato === 'markdown' ? (
            <pre className="tf-md">{c.texto}</pre>
          ) : (
            <>
              <h1 className="tf-titulo">{titulo}</h1>
              {!c.blocos.some((b) => b.tipo === 'texto') && (
                <p className="tf-vazio">Ainda não há texto no fio. Volte para a mesa, ligue as ideias com “vem depois” ou arraste-as para a timeline.</p>
              )}
              {c.blocos.map((b, i) => {
                if (b.tipo === 'titulo') {
                  const Tag = (b.nivel <= 1 ? 'h2' : 'h3') as 'h2' | 'h3'
                  return <Tag key={i} id={`sec-${b.id}`} className="tf-secao">{o.formato === 'tempos' && <span className="tf-tempo">{fmtTempo(b.tempo)}</span>}{b.texto}</Tag>
                }
                if (b.tipo === 'intencao') return <p key={i} className="tf-intencao">Intenção: {b.texto}</p>
                return (
                  <p key={i} className="tf-paragrafo" onDoubleClick={() => irPara(b.id)} title="Dois cliques para ver na mesa">
                    {o.formato === 'tempos' && !o.titulosPartes && <span className="tf-tempo">{fmtTempo(b.tempo)}</span>}
                    {b.texto}
                  </p>
                )
              })}
            </>
          )}
          </div>
        </article>
      </div>
    </div>
  )
}
