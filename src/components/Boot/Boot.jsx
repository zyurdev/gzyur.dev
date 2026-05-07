// Tela de boot — exibida antes do site carregar
import { useState, useEffect, useRef, useCallback } from 'react'
import bootLines from '../../data/bootLines'
import styles from './Boot.module.css'

function Boot({ onComplete, t }) {
  const [visibleLines, setVisibleLines]   = useState([])
  const [progress, setProgress]           = useState(0)
  const [progressLabel, setProgressLabel] = useState('Initializing modules...')
  const [showDone, setShowDone]           = useState(false)
  const [showEnter, setShowEnter]         = useState(false)
  const [booted, setBooted]               = useState(false)
  const bottomRef = useRef(null)

  const startProgress = useCallback(() => {
    const labels = t.bootLabels
    let v = 0, labelIdx = 0, prevSeg = 0

    const interval = setInterval(() => {
      v += 100 / 60
      if (v >= 100) {
        v = 100
        clearInterval(interval)
        setProgress(100)
        setShowDone(true)
        setTimeout(() => { setShowEnter(true); setBooted(true) }, 400)
        return
      }
      setProgress(Math.round(v))
      const seg = Math.floor(v / 25)
      if (seg > prevSeg && labelIdx < labels.length) {
        setProgressLabel(labels[labelIdx])
        labelIdx++
        prevSeg = seg
      }
    }, 1100 / 60)
  }, [t.bootLabels])

  useEffect(() => {
    let timeout
    let i = 0
    function showNext() {
      if (i >= bootLines.length) { startProgress(); return }
      const line = bootLines[i]
      const delay = line.type === 'info' ? 70 : line.type === 'warn' ? 180 : 35 + Math.random() * 45
      timeout = setTimeout(() => {
        setVisibleLines(prev => [...prev, line])
        i++
        showNext()
      }, delay)
    }
    const initial = setTimeout(showNext, 200)
    return () => { clearTimeout(timeout); clearTimeout(initial) }
  }, [startProgress])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [visibleLines])

  useEffect(() => {
    if (!booted) return
    function handleEnter() { onComplete() }
    window.addEventListener('keydown', handleEnter)
    return () => window.removeEventListener('keydown', handleEnter)
  }, [booted, onComplete])

  return (
    <div className={styles.boot} onClick={() => booted && onComplete()}>
      <div className={styles.lines}>
        {visibleLines.map((line, i) => (
          <div key={i} className={`${styles.line} ${styles[line.type]}`}>
            <span className={styles.tag}>{line.tag}</span>
            <span className={styles.text}>{line.text}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {progress > 0 && (
        <div className={styles.progress}>
          <div className={styles.progressLabel}>{progressLabel}</div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {showDone && (
        <div className={styles.done}>
          <div className={styles.doneTitle}>{t.bootComplete}</div>
          <div className={styles.doneSub}>{t.bootSub}</div>
        </div>
      )}

      {showEnter && (
        <div className={styles.enter}>{t.bootEnter}</div>
      )}
    </div>
  )
}

export default Boot