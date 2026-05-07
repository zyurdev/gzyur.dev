// Renderiza as linhas de output do terminal
import { useEffect, useRef } from 'react'
import styles from './Terminal.module.css'

function TerminalOutput({ lines }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  return (
    <div className={styles.output}>
      {lines.map((line, i) => (
        <div key={i} className={styles.entry}>
          <div className={styles.cmdLine}>
            <span className={styles.prompt}>$&nbsp;</span>
            <span className={styles.cmd}>{line.cmd}</span>
          </div>
          {line.result && <OutputResult result={line.result} />}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  )
}

function OutputResult({ result }) {
  const s = styles

  if (result.type === 'output') {
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
    return <div className={s.block} style={{ whiteSpace: 'pre-line' }}>{result.content}</div>
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
        <div className={s.helpGroup} style={{ marginTop: '8px' }}>— pages —</div>
        {result.content.pages.map((item, i) => (
          <div key={i} className={s.helpRow}>
            <span className={s.helpCmd}>{item.cmd}</span>
            <span className={s.helpDesc}>— {item.desc}</span>
          </div>
        ))}
      </div>
    )
  }

  if (result.type === 'lang') {
    return <div className={`${s.block} ${s.lang}`}>{result.content}</div>
  }

  if (result.type === 'error') {
    return <div className={`${s.block} ${s.error}`}>{result.content}</div>
  }

  if (result.type === 'shutdown') {
    return (
      <div className={s.block}>
        {result.content.map((line, i) => (
          <div key={i} className={i === 0 ? s.error : ''}>{line}</div>
        ))}
      </div>
    )
  }

  return null
}

export default TerminalOutput