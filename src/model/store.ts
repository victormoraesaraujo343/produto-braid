import { create } from 'zustand'
import { temporal } from 'zundo'
import { get as idbGet, set as idbSet, del as idbDel } from 'idb-keyval'
import { type Doc, RAIZ } from './tipos'
import { docVazio } from './operacoes'
import { exemplo } from './exemplo'
import { rotulo } from './derivar'

export type Painel = null | 'biblioteca' | 'texto'

export interface LigacaoPendente {
  de: string
  para: string
  x: number
  y: number
}

export interface ItemLista { id: string; titulo: string; editadoEm: number }

interface Estado {
  doc: Doc
  foco: string
  selecao: string[]
  alturas: Record<string, number>
  painel: Painel
  faixaAberta: boolean
  desenhoAlvo: boolean
  pendente: LigacaoPendente | null
  lista: ItemLista[]
  pronto: boolean
  /** Ideia com o texto aberto para edição. */
  editando: string | null
  /** Parte que vai receber o nó que está sendo arrastado. */
  alvoSoltar: string | null
  /** O nó arrastado está em cima da timeline. */
  sobreFaixa: boolean
  /** Pedido para a mesa enquadrar um nó (a câmera obedece e zera). */
  enquadrar: { id: string; n: number } | null

  mudar: (fn: (d: Doc) => void) => void
  setUI: (p: Partial<Omit<Estado, 'doc' | 'mudar' | 'setUI'>>) => void
  focar: (id: string) => void
  mostrar: (id: string) => void
}

let contador = 0

export const useStore = create<Estado>()(
  temporal(
    (set, get) => ({
      doc: docVazio(),
      foco: RAIZ,
      selecao: [],
      alturas: {},
      painel: null,
      faixaAberta: true,
      desenhoAlvo: false,
      pendente: null,
      lista: [],
      pronto: false,
      editando: null,
      alvoSoltar: null,
      sobreFaixa: false,
      enquadrar: null,

      mudar: (fn) => {
        const d = structuredClone(get().doc)
        fn(d)
        d.editadoEm = Date.now()
        set({ doc: d })
      },
      setUI: (p) => set(p as Partial<Estado>),
      focar: (id) => {
        const { doc } = get()
        const alvo = doc.nos[id]?.tipo === 'parte' ? id : RAIZ
        set({ foco: alvo, enquadrar: { id: alvo, n: ++contador } })
      },
      mostrar: (id) => set({ enquadrar: { id, n: ++contador }, selecao: [id] }),
    }),
    {
      partialize: (s) => ({ doc: s.doc }),
      equality: (a, b) => a.doc === b.doc,
      limit: 200,
      // Um gesto (arrastar, digitar uma frase) vira um passo só de desfazer.
      handleSet: (handleSet) => {
        let ultimo = 0
        return (estado) => {
          const agora = Date.now()
          if (agora - ultimo > 700) handleSet(estado)
          ultimo = agora
        }
      },
    },
  ),
)

export const desfazer = () => useStore.temporal.getState().undo()
export const refazer = () => useStore.temporal.getState().redo()

// ---------- persistência (IndexedDB, só neste navegador) ----------

const CHAVE_LISTA = 'montagem:lista'
const CHAVE_ULTIMO = 'montagem:ultimo'
const chaveDoc = (id: string) => `montagem:doc:${id}`

async function salvarAgora(doc: Doc) {
  try {
    await idbSet(chaveDoc(doc.id), doc)
    const item = { id: doc.id, titulo: rotulo(doc.nos[RAIZ]), editadoEm: doc.editadoEm }
    const lista = useStore.getState().lista.filter((i) => i.id !== doc.id)
    const nova = [item, ...lista].sort((a, b) => b.editadoEm - a.editadoEm)
    useStore.setState({ lista: nova })
    await idbSet(CHAVE_LISTA, nova)
    await idbSet(CHAVE_ULTIMO, doc.id)
  } catch {
    // Sem armazenamento disponível: o app segue funcionando, só não guarda.
  }
}

function abrirDoc(doc: Doc) {
  useStore.setState({ doc, foco: RAIZ, selecao: [], painel: null, pendente: null, alturas: {}, editando: null, enquadrar: { id: RAIZ, n: ++contador } })
  useStore.temporal.getState().clear()
}

export async function iniciar() {
  let doc: Doc | undefined
  try {
    const lista = ((await idbGet(CHAVE_LISTA)) as ItemLista[] | undefined) ?? []
    useStore.setState({ lista })
    const ultimo = (await idbGet(CHAVE_ULTIMO)) as string | undefined
    if (ultimo) doc = (await idbGet(chaveDoc(ultimo))) as Doc | undefined
  } catch {
    doc = undefined
  }
  abrirDoc(doc ?? exemplo())
  useStore.setState({ pronto: true })
  if (!doc) await salvarAgora(useStore.getState().doc)

  let t = 0
  useStore.subscribe((s, antes) => {
    if (s.doc === antes.doc) return
    clearTimeout(t)
    t = window.setTimeout(() => salvarAgora(useStore.getState().doc), 400)
  })
}

export async function trocarPara(id: string) {
  await salvarAgora(useStore.getState().doc)
  const doc = (await idbGet(chaveDoc(id))) as Doc | undefined
  if (doc) abrirDoc(doc)
}

export async function novoRoteiro(comExemplo = false) {
  await salvarAgora(useStore.getState().doc)
  const doc = comExemplo ? exemplo() : docVazio()
  abrirDoc(doc)
  await salvarAgora(doc)
}

export async function apagarRoteiro(id: string) {
  try {
    await idbDel(chaveDoc(id))
    const lista = useStore.getState().lista.filter((i) => i.id !== id)
    useStore.setState({ lista })
    await idbSet(CHAVE_LISTA, lista)
    if (useStore.getState().doc.id === id) {
      if (lista[0]) await trocarPara(lista[0].id)
      else await novoRoteiro()
    }
  } catch {
    // ignora: sem armazenamento
  }
}

export async function importarRoteiro(json: string): Promise<boolean> {
  try {
    const doc = JSON.parse(json) as Doc
    if (!doc?.nos?.[RAIZ] || !Array.isArray(doc.ligacoes)) return false
    await salvarAgora(useStore.getState().doc)
    abrirDoc(doc)
    await salvarAgora(doc)
    return true
  } catch {
    return false
  }
}
