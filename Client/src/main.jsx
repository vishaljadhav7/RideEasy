import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { WebSocketProvider } from './Context/WebSocketContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WebSocketProvider>
      <App />
    </WebSocketProvider>
  </StrictMode>,
)
