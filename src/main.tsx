import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AuthContextProvider from './context/AuthContext.tsx'
import  ThemeContextProvider  from './context/ThemeContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
    <AuthContextProvider>
    <ThemeContextProvider>
      <App />
      </ThemeContextProvider>
    </AuthContextProvider>
   
  </StrictMode>,
)
