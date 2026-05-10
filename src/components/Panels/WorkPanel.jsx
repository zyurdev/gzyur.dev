// Painel de projetos — exibido no lado direito ao digitar cd work
import projects from '../../data/projects'
import styles from './Panels.module.css'

function WorkPanel({ t, onOpenProject }) {
  return (
    <div className={styles.panel}>

      {/* Header do painel */}
      <div className={styles.panelHeader}>
        <span className={styles.prompt}>$</span>
        <span className={styles.cmd}>
          ls -la ./projects/ &nbsp;·&nbsp; {projects.length} {projects.length === 1 ? 'entry' : 'entries'}
        </span>
      </div>

      {/* Lista de projetos */}
      <div className={styles.projList}>
        {projects.map((project, i) => {
          const text = t.projects[i]
          return (
            <div
              key={project.id}
              className={styles.projItem}
              onClick={() => onOpenProject(i)}
            >
              <div className={styles.projTop}>
                <span className={styles.projName}>[{project.tag}] {text.name}</span>
                <span className={styles.projCat}>{project.cat} ↗</span>
              </div>
              <div className={styles.projTags}>
                {project.tags.map(tag => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
              <div className={styles.projDesc}>{project.year} — {text.brief}</div>
            </div>
          )
        })}

        {/* Mensagem de em breve — traduzível */}
        <div className={styles.comingSoon}>
          <span className={styles.comingSoonDot} />
          {t.comingSoon}
        </div>
      </div>

    </div>
  )
}

export default WorkPanel