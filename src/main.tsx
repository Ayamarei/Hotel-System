import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AuthContextProvider from './context/AuthContextProvider.tsx'
import  ThemeContextProvider  from './context/ThemeContext.tsx'
import FavoriteContextProvider from './context/FavoriteContext .tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
    <AuthContextProvider>
    <ThemeContextProvider>
      <FavoriteContextProvider>
      <App />
      </FavoriteContextProvider>
      </ThemeContextProvider>
    </AuthContextProvider>
   
  </StrictMode>,
)
