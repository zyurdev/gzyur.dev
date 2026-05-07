// Barra de navegação inferior
import styles from './NavBar.module.css'

function NavBar({ t, page, onNavigate }) {
  const items = [
    { id: null,      label: t.navHome },
    { id: 'work',    label: t.navWork },
    { id: 'about',   label: t.navAbout },
    { id: 'contact', label: t.navContact },
  ]

  return (
    <nav className={styles.nav}>
      <div className={styles.prompt}>
        <span>root@3d/nav</span> &gt; {t.navPrompt.split('>')[1]}
      </div>
      <div className={styles.buttons}>
        {items.map(item => (
          <button
            key={item.label}
            className={`${styles.btn} ${page === item.id ? styles.active : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  )
}

export default NavBar