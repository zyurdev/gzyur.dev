// Barra superior fixa — informações do sistema
import styles from './SysHeader.module.css'
import { useUptime } from '../../hooks/useUptime'

function SysHeader({ t }) {
  const uptime = useUptime()

  return (
    <header className={styles.header}>
      <div className={styles.col}>
        <div className={styles.row}>
          <span className={styles.key}>SYS.NAME</span>
          <span className={`${styles.val} ${styles.red}`}>{t.sysName}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.key}>SYS.AUTH</span>
          <span className={`${styles.val} ${styles.green}`}>{t.sysAuth}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.key}>SYS.NODE</span>
          <span className={styles.val}>{t.sysNode}</span>
        </div>
      </div>

      <div className={`${styles.col} ${styles.right}`}>
        <div className={styles.row}>
          <span className={styles.key}>UPTIME</span>
          <span className={styles.val}>{uptime}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.key}>TERMINAL</span>
          <span className={styles.val}>{t.terminal}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.key}>STATUS</span>
          <span className={`${styles.val} ${styles.red}`}>{t.status}</span>
        </div>
      </div>
    </header>
  )
}

export default SysHeader