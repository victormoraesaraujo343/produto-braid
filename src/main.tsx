import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/hanken-grotesk'
import '@fontsource-variable/literata'
import '@fontsource-variable/literata/wght-italic.css'
import '@fontsource-variable/geist-mono'
import '@xyflow/react/dist/base.css'
import './design/identidade.css'
import './design/tokens.css'
import './styles.css'
import App from './App'
import { iniciar } from './model/store'
import { aplicarTema } from './painel/BarraTopo'

try { aplicarTema((localStorage.getItem('montagem:tema') as never) || 'sistema') } catch { /* sem armazenamento */ }
iniciar()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
