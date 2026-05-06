// Lógica do terminal — comandos, histórico e output
import { useState, useCallback } from 'react'

// Comandos disponíveis e seus outputs
const COMMANDS = {
  whoami: () => ({
    type: 'output',
    content: `Modelador 3D — props, cenários e MLOs para games e FiveM.\n5+ anos transformando briefs em assets que funcionam no pipeline real.`
  }),

  ls: () => ({
    type: 'output',
    content: [
      { label: 'drwxr-xr-x', text: '2024  [ENV]  cidade-fivem-roleplay/' },
      { label: 'drwxr-xr-x', text: '2024  [PROP] prop-pack-urbano/' },
      { label: 'drwxr-xr-x', text: '2023  [ENV]  armazem-abandonado/' },
      { label: 'drwxr-xr-x', text: '2023  [CHAR] soldado-tatico/' },
      { label: 'drwxr-xr-x', text: '2023  [MLO]  delegacia-federal/' },
    ],
    isList: true
  }),

  help: () => ({
    type: 'help',
    content: {
      terminal: [
        { cmd: 'whoami',       desc: 'exibe identidade' },
        { cmd: 'ls',           desc: 'lista projetos' },
        { cmd: 'sys status',   desc: 'status do sistema' },
        { cmd: 'clear',        desc: 'limpa o terminal' },
        { cmd: 'shutdown sys', desc: 'reinicia o sistema' },
      ],
      pages: [
        { cmd: 'cd work',    desc: 'abre seção de projetos' },
        { cmd: 'cd about',   desc: 'abre seção sobre' },
        { cmd: 'cd contact', desc: 'abre seção de contato' },
        { cmd: 'cd ..',      desc: 'fecha painel / volta' },
      ]
    }
  }),

  'sys status': () => ({
    type: 'status',
    content: [
      { key: 'IDENTITY', value: 'ZYUR — Modelador 3D' },
      { key: 'LOCATION', value: 'São Paulo, Brasil — remoto' },
      { key: 'FOCUS',    value: 'Props · FiveM MLO · Environments' },
      { key: 'TOOLS',    value: 'Blender · Substance Painter · UE5' },
      { key: 'CONTACT',  value: 'artstation.com/zyur', highlight: true },
      { key: 'STATUS',   value: 'OPEN_TO_WORK', highlight: true },
      { key: 'RESPOSTA', value: 'até 24h' },
    ]
  }),
}

export function useTerminal({ onNavigate, onShutdown }) {
  const [lines, setLines]     = useState([])
  const [history, setHistory] = useState([])
  const [histIdx, setHistIdx] = useState(-1)

  // Adiciona uma linha de comando + output ao terminal
  function pushLine(cmd, result) {
    setLines(prev => [...prev, { cmd, result }])
  }

  // Processa o comando digitado
  const processCommand = useCallback((raw) => {
    const input = raw.trim()
    const lower = input.toLowerCase()
    if (!input) return

    // Salva no histórico
    setHistory(prev => [input, ...prev])
    setHistIdx(-1)

    // Comandos de navegação
    if (lower === 'cd work')    { pushLine(input, null); onNavigate('work');    return }
    if (lower === 'cd about')   { pushLine(input, null); onNavigate('about');   return }
    if (lower === 'cd contact') { pushLine(input, null); onNavigate('contact'); return }
    if (lower === 'cd ..' || lower === 'cd') { pushLine(input, null); onNavigate(null); return }

    // Shutdown
    if (lower === 'shutdown sys') {
      pushLine(input, { type: 'shutdown' })
      setTimeout(onShutdown, 1500)
      return
    }

    // Clear
    if (lower === 'clear') {
      setLines([])
      return
    }

    // Comandos normais
    const fn = COMMANDS[lower]
    if (fn) {
      pushLine(input, fn())
    } else {
      pushLine(input, {
        type: 'error',
        content: `bash: ${input}: command not found — digite help`
      })
    }
  }, [onNavigate, onShutdown])

  // Navega no histórico com seta pra cima/baixo
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