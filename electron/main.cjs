// Braid no computador: uma janela que abre o build do Vite (dist/). Os roteiros ficam no
// armazenamento da própria janela (IndexedDB), igual ao navegador, só que separados dele.
const { app, BrowserWindow, shell } = require('electron')
const path = require('node:path')

if (!app.requestSingleInstanceLock()) app.quit()

let janela = null

function abrir() {
  janela = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 960,
    minHeight: 600,
    title: 'Braid',
    icon: path.join(__dirname, '..', 'build', 'icon.png'),
    autoHideMenuBar: true,
    show: false,
    webPreferences: { contextIsolation: true, sandbox: true },
  })
  janela.setMenuBarVisibility(false)
  janela.once('ready-to-show', () => janela.show())
  // Links para fora (fontes da biblioteca etc.) abrem no navegador, não dentro do app.
  janela.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/.test(url)) shell.openExternal(url)
    return { action: 'deny' }
  })
  janela.webContents.on('will-navigate', (e, url) => {
    if (!url.startsWith('file:')) { e.preventDefault(); if (/^https?:/.test(url)) shell.openExternal(url) }
  })
  janela.loadFile(path.join(__dirname, '..', 'dist', 'index.html'))
}

app.on('second-instance', () => {
  if (!janela) return
  if (janela.isMinimized()) janela.restore()
  janela.focus()
})
app.whenReady().then(abrir)
app.on('window-all-closed', () => app.quit())
