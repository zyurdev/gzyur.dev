// Componente principal do terminal — junta output + input
import { useTerminal } from '../../hooks/useTerminal'
import TerminalOutput from './TerminalOutput'
import TerminalInput from './TerminalInput'
import styles from './Terminal.module.css'

function Terminal({ onNavigate, onShutdown }) {
  const { lines, processCommand, navigateHistory } = useTerminal({
    onNavigate,
    onShutdown,
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