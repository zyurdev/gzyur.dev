// Painel de projetos — exibido no lado direito ao digitar cd work
import projects from '../../data/projects'
import styles from './Panels.module.css'

function WorkPanel({ t, onOpenProject }) {
  return (
    <div className={styles.panel}>

      {/* Header do painel */}
      <div className={styles.panelHeader}>
        <span className={styles.prompt}>$</span>
        <span className={styles.cmd}>ls -la ./projects/ &nbsp;·&nbsp; {projects.length} entries</span>
      </div>

      {/* Lista de projetos */}
      <div className={styles.projList}>
        {projects.map((project, i) => (
          <div
            key={project.id}
            className={styles.projItem}
            onClick={() => onOpenProject(i)}
          >
            <div className={styles.projTop}>
              <span className={styles.projName}>[{project.tag}] {project.name}</span>
              <span className={styles.projCat}>{project.cat} ↗</span>
            </div>
            <div className={styles.projTags}>
              {project.tags.map(tag => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
            <div className={styles.projDesc}>{project.year} — {project.brief}</div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default WorkPanel