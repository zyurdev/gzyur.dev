// Componente principal do terminal
import { useState, useEffect, useRef, useCallback } from 'react'
import { useTerminal } from '../../hooks/useTerminal'
import TerminalOutput from './TerminalOutput'
import TerminalInput from './TerminalInput'
import styles from './Terminal.module.css'

const ASCII_ZYUR = [
  "  _______ ___ ___ ___ ___   _______ ",
  " |   _   |   Y   |   Y   | |   _   \\",
  " |___|   |   1   |.  |   | |.  l   /",
  "  /  ___/ \\_   _/|.  |   | |.  _   1",
  " |:  1  \\  |:  | |:  1   | |:  |   |",
  " |::.. . | |::.| |::.. . | |::.|:. |",
  " `-------' `---' `-------` --- ---' ",
]

const ASCII_DEV = [
  "    ______   _______ ___ ___ ",
  "   |   _  \\ |   _   |   Y   |",
  "   |.  |   \\|.  1___|.  |   |",
  "   |.  |    |.  __)_|.  |   |",
  "   |:  1    |:  1   |:  1   |",
  "   |::.. . /|::.. . |\\:.. ./ ",
  "   `------' `-------' `---'  ",
]

function typeText(text, onChar, onComplete, speed = 30) {
  let i = 0
  function next() {
    if (i >= text.length) { onComplete(); return }
    onChar(text[i])
    i++
    setTimeout(next, speed + Math.random() * 15)
  }
  next()
}

function Terminal({ t, onNavigate, onShutdown, onLangChange }) {
  const [bootLines, setBootLines]   = useState([])
  const [typingCmd, setTypingCmd]   = useState(null)
  const [typingText, setTypingText] = useState('')
  const bootDone  = useRef(false)
  const scrollRef = useRef(null)

  // Clear — mantém só o whoami (índice 0)
  const handleClear = useCallback(() => {
    setBootLines(prev => prev.slice(0, 1))
  }, [])

  const { lines, processCommand, navigateHistory } = useTerminal({
    t, onNavigate, onShutdown, onLangChange, onClear: handleClear,
  })

  // Scroll automático
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [bootLines, typingCmd, typingText, lines])

  // Sequência inicial — roda uma vez, guarda o TIPO não o conteúdo
  useEffect(() => {
    if (bootDone.current) return
    bootDone.current = true

    const seq = [
      { cmd: 'whoami',          type: 'whoami'   },
      { cmd: 'status',          type: 'status'   },
      { cmd: 'cat tutorial.txt', type: 'tutorial' },
    ]

    let delay = 600

    seq.forEach((item) => {
      const cmdDelay       = delay
      const typingDuration = item.cmd.length * 38

      setTimeout(() => {
        setTypingCmd(item.cmd)
        setTypingText('')

        typeText(
          item.cmd,
          (char) => setTypingText(prev => prev + char),
          () => {
            setTypingCmd(null)
            setTypingText('')
            // Guarda apenas o tipo — o conteúdo vem de `t` na hora de renderizar
            setBootLines(prev => [...prev, { cmd: item.cmd, type: item.type }])
          },
          38,
        )
      }, cmdDelay)

      delay += typingDuration + 950
    })
  }, [])

  // Hint bar — ordem fixa
  const hintCmds = ['whoami', 'ls', 'help', 'status', 'clear', 'reboot', 'lang pt', 'lang es', 'lang en']

  return (
    <div className={styles.terminal}>

      {/* Barra de título */}
      <div className={styles.titleBar}>
        <span className={styles.titleText}>{t.pageHome}</span>
        <div className={styles.titleRight}>
          <span className={styles.recDot} />
          CAM_01 &nbsp;·&nbsp; REC &nbsp;·&nbsp; SIGNAL_STRONG
        </div>
      </div>

      {/* Hint bar */}
      <div className={styles.hintBar}>
        <div className={styles.hintGroup}>
          <span className={styles.hintLabel}>{t.hintTerminal}</span>
          {hintCmds.map(cmd => (
            <span key={cmd} className={styles.hintCmd} onClick={() => processCommand(cmd)}>
              {cmd}
            </span>
          ))}
        </div>
        <div className={styles.hintSep} />
        <div className={styles.hintGroup}>
          <span className={styles.hintLabel}>{t.hintPages}</span>
          {t.helpPages.map(item => (
            <span key={item.cmd} className={styles.hintCmd} onClick={() => processCommand(item.cmd)}>
              {item.cmd}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll principal */}
      <div
        className={styles.scroll}
        ref={scrollRef}
        onClick={() => document.getElementById('zyur-input')?.focus()}
      >

        {/* ASCII ZYUR cinza + DEV vermelho */}
        <div className={styles.asciiWrap}>
          <pre className={styles.ascii}>
            {ASCII_ZYUR.map((line, i) => (
              <span key={i}>
                <span className={styles.asciiGray}>{line}</span>
                <span className={styles.asciiRed}>{ASCII_DEV[i]}</span>
                {'\n'}
              </span>
            ))}
          </pre>
        </div>

        {/* Boot lines — conteúdo vem de `t` para ser reativo ao idioma */}
        {bootLines.map((line, i) => (
          <BootLine key={i} line={line} t={t} styles={styles} />
        ))}

        {/* Comando sendo digitado */}
        {typingCmd !== null && (
          <div className={styles.cmdLine}>
            <span className={styles.prompt}>$&nbsp;</span>
            <span className={styles.cmd}>{typingText}</span>
            <span className={styles.caret} />
          </div>
        )}

        {/* Linhas interativas */}
        <TerminalOutput lines={lines} />

        {/* Input */}
        <TerminalInput
          onCommand={processCommand}
          onHistoryNavigate={navigateHistory}
        />

      </div>
    </div>
  )
}

// Linha de boot — recebe `t` e resolve o conteúdo na hora de renderizar
function BootLine({ line, t, styles: s }) {
  return (
    <div className={s.entry}>
      <div className={s.cmdLine}>
        <span className={s.prompt}>$&nbsp;</span>
        <span className={s.cmd}>{line.cmd}</span>
      </div>
      <BootOutput type={line.type} t={t} styles={s} />
    </div>
  )
}

// Output reativo — usa `t` no momento do render, não no momento do boot
function BootOutput({ type, t, styles: s }) {
  if (type === 'whoami') {
    return (
      <div className={s.block} style={{ whiteSpace: 'pre-line' }}>
        {t.whoami}
      </div>
    )
  }

  if (type === 'status') {
    return (
      <div className={s.block}>
        {t.sysStatus.map((row, i) => (
          <div key={i} className={s.kvRow}>
            <span className={s.kvKey}>{row.key}</span>
            <span className={row.highlight ? s.kvValHi : s.kvVal}>{row.value}</span>
          </div>
        ))}
      </div>
    )
  }

  if (type === 'tutorial') {
    return (
      <div className={s.block}>
        {t.tutorial.map((line, i) => (
          <div key={i} className={
            i === 0                                               ? s.tutorialTitle :
            line.startsWith('TIP:') || line.startsWith('DICA:') ? s.tutorialTip   :
            line.startsWith(' →')                                ? s.tutorialItem  :
            line === ''                                          ? s.tutorialBlank :
            s.tutorialText
          }>
            {line.startsWith('TIP:') || line.startsWith('DICA:') ? (
              <>
                <span className={s.tutorialTipLabel}>{line.split(':')[0]}:</span>
                {line.slice(line.indexOf(':') + 1)}
              </>
            ) : line}
          </div>
        ))}
      </div>
    )
  }

  return null
}

export default Terminal