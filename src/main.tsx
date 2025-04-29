import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AuthContextProvider from './context/AuthContextProvider.tsx'
import  ThemeContextProvider  from './context/ThemeContext.tsx'
import {  FiltersProvider } from './context/FilterContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FiltersProvider >
    <AuthContextProvider>
    <ThemeContextProvider>
      <App />
      </ThemeContextProvider>
    </AuthContextProvider>
    </FiltersProvider>
   
  </StrictMode>,
)
