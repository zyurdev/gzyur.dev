// Painel sobre — exibido ao digitar cd about
import styles from './Panels.module.css'

function AboutPanel({ t }) {
  const skills = {
    Modeling:   ['Blender', 'ZBrush', 'Maya'],
    Texturing:  ['Substance Painter', 'Marmoset', 'UDIM'],
    'Real-time': ['Unreal 5', 'FiveM', 'Unity', 'GLB'],
    Rendering:  ['Cycles', 'Eevee', 'Arnold'],
  }

  const diagnostic = [
    { label: 'Props / Hard Surface', value: 92 },
    { label: 'MLO / FiveM',          value: 90 },
    { label: 'Environment / Scene',  value: 85 },
    { label: 'Character / Organic',  value: 75 },
    { label: 'Texturing / PBR',      value: 88 },
  ]

  return (
    <div className={styles.panel}>

      {/* Cabeçalho */}
      <div className={styles.panelHeader}>
        <span className={styles.prompt}>$</span>
        <span className={styles.cmd}>cat ./about.md</span>
      </div>

      <div className={styles.aboutWrap}>

        {/* Coluna esquerda — foto e card de identidade */}
        <div className={styles.aboutLeft}>

          {/* Foto placeholder */}
          <div className={styles.photo}>
            <div className={styles.photoCrossH} />
            <div className={styles.photoCrossV} />
            <div className={`${styles.photoCorner} ${styles.tl}`} />
            <div className={`${styles.photoCorner} ${styles.tr}`} />
            <div className={`${styles.photoCorner} ${styles.bl}`} />
            <div className={`${styles.photoCorner} ${styles.br}`} />
            <span className={styles.photoLabel}>[ YOUR PHOTO ]</span>
            <span className={styles.photoName}>ZYUR</span>
            <span className={styles.photoId}>ID_FACE 99.9%</span>
          </div>

          {/* Stats do card */}
          <div className={styles.cardStats}>
            <div className={styles.statItem}>
              <span className={styles.statKey}>CLASS</span>
              <span className={styles.statVal}>{t.aboutClass}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statKey}>XP_LEVEL</span>
              <span className={styles.statVal}>{t.aboutXp}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statKey}>BASE</span>
              <span className={styles.statVal}>{t.aboutBase}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statKey}>LANG</span>
              <span className={styles.statVal}>{t.aboutLang}</span>
            </div>
          </div>

          {/* Alert de disponibilidade */}
          <div className={styles.alert}>
            <div className={styles.alertTag}>_SYSTEM_ALERT</div>
            <div className={styles.alertTitle}>{t.aboutAlert}</div>
            <div className={styles.alertSub}>
              <span>{t.aboutContracts}</span>
              <span>{t.aboutRemote}</span>
            </div>
          </div>

        </div>

        {/* Coluna direita — bio, skills e diagnostic */}
        <div className={styles.aboutRight}>

          {/* Bio */}
          <div className={styles.sectionTitle}>// bio.txt</div>
          <p className={styles.bio}>{t.aboutBio}</p>

          {/* Skills */}
          <div className={styles.sectionTitle}>EQUIPMENT_INVENTORY</div>
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className={styles.skillGroup}>
              <span className={styles.skillCategory}>{category}</span>
              <div className={styles.skillTags}>
                {items.map(item => (
                  <span key={item} className={styles.tag}>{item}</span>
                ))}
              </div>
            </div>
          ))}

          {/* Diagnostic */}
          <div className={styles.sectionTitle}>// DIAGNOSTIC</div>
          {diagnostic.map(item => (
            <div key={item.label} className={styles.barRow}>
              <span className={styles.barLabel}>{item.label}</span>
              <div className={styles.barTrack}>
                <div className={styles.barFill} style={{ width: `${item.value}%` }} />
              </div>
              <span className={styles.barVal}>{item.value}%</span>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}

export default AboutPanel