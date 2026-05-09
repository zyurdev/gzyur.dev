// Componente principal do terminal
import { useState, useEffect, useRef } from 'react'
import { useTerminal } from '../../hooks/useTerminal'
import TerminalOutput from './TerminalOutput'
import TerminalInput from './TerminalInput'
import styles from './Terminal.module.css'

// ZYUR — cinza, linha por linha
const ASCII_ZYUR = [
  "  _______ ___ ___ ___ ___   _______ ",
  " |   _   |   Y   |   Y   | |   _   \\",
  " |___|   |   1   |.  |   | |.  l   /",
  "  /  ___/ \\_   _/|.  |   | |.  _   1",
  " |:  1  \\  |:  | |:  1   | |:  |   |",
  " |::.. . | |::.| |::.. . | |::.|:. |",
  " `-------' `---' `-------` --- ---' ",
]

// DEV — vermelho, linha por linha (mesmo número de linhas que ZYUR)
const ASCII_DEV = [
  "    ______   _______ ___ ___ ",
  "   |   _  \\ |   _   |   Y   |",
  "   |.  |   \\|.  1___|.  |   |",
  "   |.  |    |.  __)_|.  |   |",
  "   |:  1    |:  1   |:  1   |",
  "   |::.. . /|::.. . |\\:.. ./ ",
  "   `------' `-------' `---'  ",
]

// Digita um texto caractere por caractere
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
  const { lines, processCommand, navigateHistory } = useTerminal({
    t, onNavigate, onShutdown, onLangChange,
  })

  // Linhas da sequência de boot (separadas das interativas)
  const [bootLines, setBootLines] = useState([])
  const [typingCmd, setTypingCmd] = useState(null)
  const [typingText, setTypingText] = useState('')
  const bootDone = useRef(false)
  const scrollRef = useRef(null)

  // Scroll automático
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [bootLines, typingCmd, typingText, lines])

  // Sequência inicial com efeito de digitação
  useEffect(() => {
    if (bootDone.current) return
    bootDone.current = true

    const seq = [
      {
        cmd: 'whoami',
        output: {
          type: 'output',
          content: `Props, environments and MLOs for games and FiveM.\n5+ years turning briefs into production-ready assets.`,
        },
      },
      {
        cmd: 'sys status',
        output: { type: 'status', content: t.sysStatus },
      },
      {
        cmd: 'cat tutorial.txt',
        output: {
          type: 'tutorial',
          content: [
            `Welcome to ZYUR DEV portfolio.`,
            `This is an interactive terminal.`,
            ``,
            ` → type commands in the input below`,
            ` → or click shortcuts in the hint bar above`,
            ` → opening a section splits the screen in two`,
            ` → use  cd ..  to close the right panel`,
            ` → the left terminal is always active`,
            ``,
            `TIP: start with  cd work ,  cd about  or  cd contact`,
          ],
        },
      },
    ]

    let delay = 600

    seq.forEach((item) => {
      const cmdDelay = delay
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
            setBootLines(prev => [...prev, { cmd: item.cmd, result: item.output }])
          },
          38,
        )
      }, cmdDelay)

      delay += typingDuration + 950
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
          {t.helpTerminal.map(item => (
            <span key={item.cmd} className={styles.hintCmd} onClick={() => processCommand(item.cmd)}>
              {item.cmd}
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

        {/* ASCII art — ZYUR cinza + DEV vermelho lado a lado */}
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

        {/* Linhas do boot com typewriter */}
        {bootLines.map((line, i) => (
          <BootLine key={i} line={line} styles={styles} />
        ))}

        {/* Comando sendo digitado */}
        {typingCmd !== null && (
          <div className={styles.cmdLine}>
            <span className={styles.prompt}>$&nbsp;</span>
            <span className={styles.cmd}>{typingText}</span>
            <span className={styles.caret} />
          </div>
        )}

        {/* Linhas interativas do usuário */}
        <TerminalOutput lines={lines} />

        {/* Input sempre no final */}
        <TerminalInput
          onCommand={processCommand}
          onHistoryNavigate={navigateHistory}
        />

      </div>
    </div>
  )
}

// Linha de boot individual
function BootLine({ line, styles: s }) {
  const r = line.result

  return (
    <div className={s.entry}>
      <div className={s.cmdLine}>
        <span className={s.prompt}>$&nbsp;</span>
        <span className={s.cmd}>{line.cmd}</span>
      </div>
      {r && <BootOutput result={r} styles={s} />}
    </div>
  )
}

// Output de cada tipo de linha de boot
function BootOutput({ result, styles: s }) {

  if (result.type === 'output') {
    return (
      <div className={s.block} style={{ whiteSpace: 'pre-line' }}>
        {result.content}
      </div>
    )
  }

  if (result.type === 'status') {
    return (
      <div className={s.block}>
        {result.content.map((row, i) => (
          <div key={i} className={s.kvRow}>
            <span className={s.kvKey}>{row.key}</span>
            <span className={row.highlight ? s.kvValHi : s.kvVal}>{row.value}</span>
          </div>
        ))}
      </div>
    )
  }

  if (result.type === 'tutorial') {
    return (
      <div className={s.block}>
        {result.content.map((line, i) => (
          <div key={i} className={
            i === 0              ? s.tutorialTitle :
            line.startsWith('TIP:') ? s.tutorialTip  :
            line.startsWith(' →')  ? s.tutorialItem :
            line === ''            ? s.tutorialBlank :
            s.tutorialText
          }>
            {line.startsWith('TIP:') ? (
              <><span className={s.tutorialTipLabel}>TIP:</span>{line.slice(4)}</>
            ) : line}
          </div>
        ))}
      </div>
    )
  }

  return null
}

export default Terminal