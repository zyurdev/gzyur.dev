// Tela de boot — exibida antes do site carregar
import { useState, useEffect, useRef } from 'react'
import bootLines from '../../data/bootLines'
import styles from './Boot.module.css'

function Boot({ onComplete }) {
  const [visibleLines, setVisibleLines]     = useState([])
  const [progress, setProgress]             = useState(0)
  const [progressLabel, setProgressLabel]   = useState('Inicializando módulos...')
  const [showDone, setShowDone]             = useState(false)
  const [showEnter, setShowEnter]           = useState(false)
  const [booted, setBooted]                 = useState(false)
  const bottomRef = useRef(null)

  // Barra de progresso — declarada antes do useEffect que a usa
  function startProgress() {
    const labels = [
      'Iniciando interface HUD...',
      'Montando câmeras...',
      'Carregando assets...',
      'Sistema online...',
    ]
    let v = 0
    let labelIdx = 0
    let prevSeg = 0

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
  }

  // Exibe as linhas do boot uma por uma com delay
  useEffect(() => {
    let timeout
    let i = 0

    function showNext() {
      if (i >= bootLines.length) {
        startProgress()
        return
      }

      const line = bootLines[i]
      const delay =
        line.type === 'info' ? 70 :
        line.type === 'warn' ? 180 :
        35 + Math.random() * 45

      timeout = setTimeout(() => {
        setVisibleLines(prev => [...prev, line])
        i++
        showNext()
      }, delay)
    }

    const initial = setTimeout(showNext, 200)
    return () => { clearTimeout(timeout); clearTimeout(initial) }
  }, [])

  // Scroll automático para o final
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [visibleLines])

  // Entra no site ao clicar ou pressionar qualquer tecla
  useEffect(() => {
    if (!booted) return
    function handleEnter() { onComplete() }
    window.addEventListener('keydown', handleEnter)
    return () => window.removeEventListener('keydown', handleEnter)
  }, [booted, onComplete])

  return (
    <div className={styles.boot} onClick={() => booted && onComplete()}>

      {/* Linhas do boot */}
      <div className={styles.lines}>
        {visibleLines.map((line, i) => (
          <div key={i} className={`${styles.line} ${styles[line.type]}`}>
            <span className={styles.tag}>{line.tag}</span>
            <span className={styles.text}>{line.text}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Barra de progresso */}
      {progress > 0 && (
        <div className={styles.progress}>
          <div className={styles.progressLabel}>{progressLabel}</div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {/* Boot completo */}
      {showDone && (
        <div className={styles.done}>
          <div className={styles.doneTitle}>3D_OS v1.0.0 — BOOT COMPLETO</div>
          <div className={styles.doneSub}>Todos os módulos carregados. Sistema operacional.</div>
        </div>
      )}

      {/* Prompt para continuar */}
      {showEnter && (
        <div className={styles.enter}>
          [ Clique ou pressione qualquer tecla para continuar ]
        </div>
      )}

    </div>
  )
}

export default Boot