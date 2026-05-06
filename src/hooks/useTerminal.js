// Lógica do terminal — comandos, histórico e output
import { useState, useCallback } from 'react'

export function useTerminal({ t, onNavigate, onShutdown, onLangChange }) {
  const [lines, setLines]     = useState([])
  const [history, setHistory] = useState([])
  const [histIdx, setHistIdx] = useState(-1)

  function pushLine(cmd, result) {
    setLines(prev => [...prev, { cmd, result }])
  }

  const processCommand = useCallback((raw) => {
    const input = raw.trim()
    const lower = input.toLowerCase()
    if (!input) return

    setHistory(prev => [input, ...prev])
    setHistIdx(-1)

    // Navegação
    if (lower === 'cd work')    { pushLine(input, null); onNavigate('work');    return }
    if (lower === 'cd about')   { pushLine(input, null); onNavigate('about');   return }
    if (lower === 'cd contact') { pushLine(input, null); onNavigate('contact'); return }
    if (lower === 'cd ..' || lower === 'cd') { pushLine(input, null); onNavigate(null); return }

    // Idioma
    if (lower === 'lang pt') { onLangChange('pt'); pushLine(input, { type: 'lang', content: 'Idioma alterado para Português.' }); return }
    if (lower === 'lang en') { onLangChange('en'); pushLine(input, { type: 'lang', content: 'Language switched to English.' });   return }
    if (lower === 'lang es') { onLangChange('es'); pushLine(input, { type: 'lang', content: 'Idioma cambiado a Español.' });      return }

    // Shutdown
    if (lower === 'shutdown sys') {
      pushLine(input, { type: 'shutdown', content: t.shutdownMsg })
      setTimeout(onShutdown, 1500)
      return
    }

    // Clear
    if (lower === 'clear') { setLines([]); return }

    // Whoami
    if (lower === 'whoami') {
      pushLine(input, { type: 'output', content: t.whoami })
      return
    }

    // Ls
    if (lower === 'ls') {
      pushLine(input, {
        type: 'output',
        isList: true,
        content: [
          { label: 'drwxr-xr-x', text: '2024  [ENV]  cidade-fivem-roleplay/' },
          { label: 'drwxr-xr-x', text: '2024  [PROP] prop-pack-urbano/' },
          { label: 'drwxr-xr-x', text: '2023  [ENV]  armazem-abandonado/' },
          { label: 'drwxr-xr-x', text: '2023  [CHAR] soldado-tatico/' },
          { label: 'drwxr-xr-x', text: '2023  [MLO]  delegacia-federal/' },
        ]
      })
      return
    }

    // Help
    if (lower === 'help') {
      pushLine(input, { type: 'help', content: { terminal: t.helpTerminal, pages: t.helpPages } })
      return
    }

    // Sys status
    if (lower === 'sys status') {
      pushLine(input, { type: 'status', content: t.sysStatus })
      return
    }

    // Comando não encontrado
    pushLine(input, { type: 'error', content: t.cmdNotFound(input) })

  }, [t, onNavigate, onShutdown, onLangChange])

  function navigateHistory(direction, currentValue, setInputValue) {
    if (direction === 'up') {
      const next = Math.min(histIdx + 1, history.length - 1)
      setHistIdx(next)
      setInputValue(history[next] || '')
    } else {
      const next = Math.max(histIdx - 1, -1)
      setHistIdx(next)
      setInputValue(next === -1 ? '' : history[next])
    }
  }

  return { lines, processCommand, navigateHistory }
}