// Popup de projeto — abre quando o usuário clica em um projeto no WorkPanel
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import projects from '../../data/projects'
import styles from './ProjectPopup.module.css'

function ProjectPopup({ projectIndex, onClose, t }) {
  const isOpen = projectIndex !== null
  const [openTabs, setOpenTabs] = useState([])
  const [activeTab, setActiveTab] = useState(null)

  // Adiciona aba ao abrir novo projeto
  if (projectIndex !== null && !openTabs.includes(projectIndex)) {
    setOpenTabs(prev => [...prev, projectIndex])
    setActiveTab(projectIndex)
  }

  // Fecha uma aba individual
  function closeTab(idx, e) {
    e.stopPropagation()
    const remaining = openTabs.filter(i => i !== idx)
    setOpenTabs(remaining)
    if (remaining.length === 0) {
      onClose()
    } else if (activeTab === idx) {
      setActiveTab(remaining[remaining.length - 1])
    }
  }

  const project     = activeTab !== null ? projects[activeTab]      : null
  const projectText = activeTab !== null ? t?.projects?.[activeTab] : null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          <motion.div
            className={styles.window}
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Barra de título — tabs + fechar */}
            <div className={styles.titleBar}>
              <div className={styles.tabs}>
                {openTabs.map(idx => {
                  const p    = projects[idx]
                  const pTxt = t?.projects?.[idx]
                  return (
                    <div
                      key={idx}
                      className={`${styles.tab} ${activeTab === idx ? styles.tabActive : ''}`}
                      onClick={() => setActiveTab(idx)}
                    >
                      <span className={styles.tabDot} />
                      <span className={styles.tabName}>
                        [{p.tag}] {pTxt ? pTxt.name.split(' ').slice(0, 2).join(' ') : p.tag}
                      </span>
                      <button className={styles.tabClose} onClick={(e) => closeTab(idx, e)}>×</button>
                    </div>
                  )
                })}
              </div>
              <button className={styles.closeBtn} onClick={onClose}>✕</button>
            </div>

            {/* Corpo */}
            {project && projectText && (
              <div className={styles.body}>
                <div className={styles.output}>

                  <div className={styles.cmdLine}>
                    <span className={styles.prompt}>$</span>
                    <span className={styles.cmd}>open {project.id}/project.md</span>
                  </div>

                  <div className={styles.projectHeader}>
                    <div className={styles.projectTitle}>[{project.tag}] {projectText.name}</div>
                    <div className={styles.projectTags}>
                      {project.tags.map(tag => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                      ))}
                      <span className={styles.year}>{project.year}</span>
                    </div>
                  </div>

                  <div className={styles.imgPlaceholder}>
                    <div className={`${styles.imgCorner} ${styles.imgTl}`} />
                    <div className={`${styles.imgCorner} ${styles.imgTr}`} />
                    <div className={`${styles.imgCorner} ${styles.imgBl}`} />
                    <div className={`${styles.imgCorner} ${styles.imgBr}`} />
                    <span className={styles.imgLabel}>[ PREVIEW ]</span>
                    <span className={styles.imgSub}>add your image here</span>
                  </div>

                  <div className={styles.cmdLine}>
                    <span className={styles.prompt}>$</span>
                    <span className={styles.cmd}>cat brief.txt</span>
                  </div>
                  <div className={styles.block}>{projectText.desc}</div>

                  <div className={styles.cmdLine}>
                    <span className={styles.prompt}>$</span>
                    <span className={styles.cmd}>cat details.json</span>
                  </div>
                  <div className={styles.block}>
                    {Object.entries(projectText.details).map(([key, val]) => (
                      <div key={key} className={styles.kvRow}>
                        <span className={styles.kvKey}>{key}</span>
                        <span className={styles.kvVal}>{val}</span>
                      </div>
                    ))}
                  </div>

                  <div className={styles.separator} />
                  <div className={styles.contactHint}>
                    {t?.comingSoon ?? 'interested in something similar?'}{' '}
                    <span className={styles.contactLink} onClick={onClose}>→ cd contact</span>
                  </div>

                </div>

                <div className={styles.statusBar}>
                  <span>{project.id} — READ_ONLY</span>
                  <span className={styles.statusRight}>{project.cat.toUpperCase()}</span>
                </div>
              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ProjectPopup