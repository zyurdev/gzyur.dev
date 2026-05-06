// Renderiza as linhas de output do terminal
import { useEffect, useRef } from 'react'
import styles from './Terminal.module.css'

function TerminalOutput({ lines }) {
  const bottomRef = useRef(null)

  // Scroll automático para o final ao adicionar linhas
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  return (
    <div className={styles.output}>
      {lines.map((line, i) => (
        <div key={i} className={styles.entry}>

          {/* Linha do comando digitado */}
          <div className={styles.cmdLine}>
            <span className={styles.prompt}>$&nbsp;</span>
            <span className={styles.cmd}>{line.cmd}</span>
          </div>

          {/* Output do comando */}
          {line.result && <OutputResult result={line.result} />}

        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  )
}

// Renderiza o resultado dependendo do tipo
function OutputResult({ result }) {
  const s = styles

  if (result.type === 'output') {
    // Lista de arquivos (ls)
    if (result.isList) {
      return (
        <div className={s.block}>
          {result.content.map((item, i) => (
            <div key={i} className={s.listRow}>
              <span className={s.listLabel}>{item.label}</span>
              <span className={s.listText}>{item.text}</span>
            </div>
          ))}
        </div>
      )
    }
    // Texto simples
    return <div className={s.block}>{result.content}</div>
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

  if (result.type === 'help') {
    return (
      <div className={s.block}>
        <div className={s.helpGroup}>— terminal —</div>
        {result.content.terminal.map((item, i) => (
          <div key={i} className={s.helpRow}>
            <span className={s.helpCmd}>{item.cmd}</span>
            <span className={s.helpDesc}>— {item.desc}</span>
          </div>
        ))}
        <div className={s.helpGroup} style={{ marginTop: '8px' }}>— páginas —</div>
        {result.content.pages.map((item, i) => (
          <div key={i} className={s.helpRow}>
            <span className={s.helpCmd}>{item.cmd}</span>
            <span className={s.helpDesc}>— {item.desc}</span>
          </div>
        ))}
      </div>
    )
  }

  if (result.type === 'error') {
    return <div className={`${s.block} ${s.error}`}>{result.content}</div>
  }

  if (result.type === 'shutdown') {
    return (
      <div className={s.block}>
        <div className={s.error}>Iniciando sequência de shutdown...</div>
        <div>Salvando estado do sistema...</div>
        <div>Desmontando módulos 3D...</div>
      </div>
    )
  }

  return null
}

export default TerminalOutput