// Painel de contato — exibido ao digitar cd contact
import styles from './Panels.module.css'

function ContactPanel({ t }) {
  return (
    <div className={styles.panel}>

      {/* Cabeçalho */}
      <div className={styles.panelHeader}>
        <span className={styles.prompt}>$</span>
        <span className={styles.cmd}>contact.init()</span>
      </div>

      <div className={styles.contactWrap}>

        {/* Título */}
        <div className={styles.contactTitle}>
          {t.contactTitle.split('\n').map((line, i) => (
            <div key={i} className={i === 1 ? styles.contactTitleRed : ''}>
              {line}
            </div>
          ))}
        </div>
        <div className={styles.contactSub}>{t.contactSub}</div>

        {/* Formulário */}
        <form className={styles.form} onSubmit={e => e.preventDefault()}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>NAME</label>
              <input className={styles.formInput} type="text" placeholder={t.contactName} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>EMAIL</label>
              <input className={styles.formInput} type="email" placeholder={t.contactEmail} />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>PROJECT</label>
              <select className={styles.formInput}>
                {t.contactOptions.map(opt => <option key={opt}>{opt}</option>)}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>BUDGET</label>
              <select className={styles.formInput}>
                {t.contactBudgets.map(opt => <option key={opt}>{opt}</option>)}
              </select>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>DESCRIPTION</label>
            <textarea className={styles.formInput} rows={3} placeholder={t.contactDesc} />
          </div>
          <button className={styles.formBtn}>{t.contactSend}</button>
        </form>

        {/* Links */}
        <div className={styles.contactLinks}>
          <a className={styles.contactLink} href="https://artstation.com/zyur" target="_blank" rel="noreferrer">ArtStation</a>
          <a className={styles.contactLink} href="#" target="_blank" rel="noreferrer">Behance</a>
          <a className={styles.contactLink} href="#" target="_blank" rel="noreferrer">LinkedIn</a>
          <a className={styles.contactLink} href="#" target="_blank" rel="noreferrer">Instagram</a>
        </div>

      </div>
    </div>
  )
}

export default ContactPanel