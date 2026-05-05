// Barra superior fixa — informações do sistema
import { useUptime } from '../../hooks/useUptime'
import styles from './SysHeader.module.css'

function SysHeader() {
  const uptime = useUptime()

  return (
    <header className={styles.header}>

      {/* Coluna esquerda — identidade do sistema */}
      <div className={styles.col}>
        <div className={styles.row}>
          <span className={styles.key}>SYS.NAME</span>
          <span className={`${styles.val} ${styles.red}`}>3D_OS v1.0.0</span>
        </div>
        <div className={styles.row}>
          <span className={styles.key}>SYS.AUTH</span>
          <span className={`${styles.val} ${styles.green}`}>GUEST_ACCESS_GRANTED</span>
        </div>
        <div className={styles.row}>
          <span className={styles.key}>SYS.NODE</span>
          <span className={styles.val}>gzyur.dev</span>
        </div>
      </div>

      {/* Coluna direita — status do sistema */}
      <div className={`${styles.col} ${styles.right}`}>
        <div className={styles.row}>
          <span className={styles.key}>UPTIME</span>
          <span className={styles.val}>{uptime}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.key}>TERMINAL</span>
          <span className={styles.val}>TTY0</span>
        </div>
        <div className={styles.row}>
          <span className={styles.key}>STATUS</span>
          <span className={`${styles.val} ${styles.red}`}>200 OK</span>
        </div>
      </div>

    </header>
  )
}

export default SysHeader