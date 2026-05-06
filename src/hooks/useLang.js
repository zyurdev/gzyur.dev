// Hook que controla o idioma ativo do site
import { useState, useCallback } from 'react'
import translations from '../data/translations'

export function useLang() {
  const [lang, setLang] = useState('en')

  // Troca o idioma — chamado pelo comando lang pt/en/es
  const changeLang = useCallback((code) => {
    if (translations[code]) setLang(code)
  }, [])

  return {
    lang,
    t: translations[lang],
    changeLang,
  }
}