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
      <TerminalOutput lines={lines} />
      <TerminalInput
        onCommand={processCommand}
        onHistoryNavigate={navigateHistory}
      />
    </div>
  )
}

export default Terminal