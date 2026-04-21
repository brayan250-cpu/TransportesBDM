import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import { DeviceTierProvider } from './context/DeviceTierContext'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DeviceTierProvider>
      <App />
    </DeviceTierProvider>
  </StrictMode>
)
