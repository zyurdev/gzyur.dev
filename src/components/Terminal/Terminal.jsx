// Componente principal do terminal — junta output + input
import { useTerminal } from '../../hooks/useTerminal'
import TerminalOutput from './TerminalOutput'
import TerminalInput from './TerminalInput'
import styles from './Terminal.module.css'

function Terminal({ t, onNavigate, onShutdown, onLangChange }) {
  const { lines, processCommand, navigateHistory } = useTerminal({
    t,
    onNavigate,
    onShutdown,
    onLangChange,
  })

  return (
    <div className={styles.terminal}>

      {/* Barra de título do terminal */}
      <div className={styles.titleBar}>
        <span className={styles.titleText}>{t.pageHome}</span>
        <div className={styles.titleRight}>
          <span className={styles.recDot} />
          CAM_01 &nbsp;·&nbsp; REC &nbsp;·&nbsp; SIGNAL_STRONG
        </div>
      </div>

      {/* Hint bar — atalhos clicáveis */}
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

      <TerminalOutput lines={lines} />
      <TerminalInput
        onCommand={processCommand}
        onHistoryNavigate={navigateHistory}
      />
    </div>
  )
}

export default Terminal