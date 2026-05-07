import { createContext, useContext, useState } from 'react'
import { translations } from '../utils/translations'

// Apply saved theme immediately to avoid flash on load
const savedTheme = localStorage.getItem('appTheme') || 'light'
document.documentElement.classList.toggle('dark', savedTheme === 'dark')

const AppConfigContext = createContext()

export function useAppConfig() {
  return useContext(AppConfigContext)
}

export function AppConfigProvider({ children }) {
  const [theme, setThemeState] = useState(savedTheme)
  const [language, setLanguageState] = useState(localStorage.getItem('appLanguage') || 'en')

  const setTheme = (newTheme) => {
    setThemeState(newTheme)
    localStorage.setItem('appTheme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  const setLanguage = (newLang) => {
    setLanguageState(newLang)
    localStorage.setItem('appLanguage', newLang)
  }

  const t = (key) => translations[language]?.[key] ?? key

  return (
    <AppConfigContext.Provider value={{ theme, language, setTheme, setLanguage, t }}>
      {children}
    </AppConfigContext.Provider>
  )
}
