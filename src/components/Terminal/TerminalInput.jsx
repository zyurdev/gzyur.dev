// Linha de input do terminal
import { useState, useEffect, useRef } from 'react'
import styles from './Terminal.module.css'

function TerminalInput({ onCommand, onHistoryNavigate }) {
  const [value, setValue] = useState('')
  const inputRef = useRef(null)

  // Foca automaticamente ao montar
  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 300)
  }, [])

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      onCommand(value)
      setValue('')
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      onHistoryNavigate('up', value, setValue)
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      onHistoryNavigate('down', value, setValue)
    }
  }

  return (
    <div className={styles.inputLine}>
      <span className={styles.prompt}>zyur@3d:~$&nbsp;</span>
      <input
        id="zyur-input"
        ref={inputRef}
        className={styles.input}
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
      />
    </div>
  )
}

export default TerminalInput