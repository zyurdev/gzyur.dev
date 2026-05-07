// Painel direito — container que recebe work, about ou contact
import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import WorkPanel    from '../panels/WorkPanel'
import AboutPanel   from '../panels/AboutPanel'
import ContactPanel from '../panels/ContactPanel'
import styles from './RightPanel.module.css'

function RightPanel({ page, t, onClose, onOpenProject }) {
  const isOpen = page !== null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.panel}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '50%', opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Header do painel com título e botão fechar */}
          <div className={styles.header}>
            <span className={styles.title}>
              {page === 'work'    && t.pageWork}
              {page === 'about'   && t.pageAbout}
              {page === 'contact' && t.pageContact}
            </span>
            <button className={styles.close} onClick={onClose}>
              {t.closePanel}
            </button>
          </div>

          {/* Conteúdo da página ativa */}
          <div className={styles.content}>
            {page === 'work'    && <WorkPanel    t={t} onOpenProject={onOpenProject} />}
            {page === 'about'   && <AboutPanel   t={t} />}
            {page === 'contact' && <ContactPanel t={t} />}
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default RightPanel