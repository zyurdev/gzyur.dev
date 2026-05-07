// Componente raiz — controla boot, idioma, navegação e popup
import { useState } from 'react'
import Boot         from './components/Boot/Boot'
import SysHeader    from './components/SysHeader/SysHeader'
import Terminal     from './components/Terminal/Terminal'
import RightPanel   from './components/RightPanel/RightPanel'
import ProjectPopup from './components/ProjectPopup/ProjectPopup'
import BgCanvas     from './components/BgCanvas/BgCanvas'
import NavBar       from './components/NavBar/NavBar'
import { useLang }  from './hooks/useLang'

function App() {
  const [booted, setBooted]           = useState(false)
  const [page, setPage]               = useState(null)
  const [openProject, setOpenProject] = useState(null)
  const { t, changeLang }             = useLang()

  function handleShutdown() {
    window.location.reload()
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

      <BgCanvas />

      {!booted && <Boot onComplete={() => setBooted(true)} t={t} />}

      {booted && (
        <>
          <SysHeader t={t} />

          <div style={{ display: 'flex', flex: 1, overflow: 'hidden', minHeight: 0 }}>
            <Terminal
              t={t}
              onNavigate={setPage}
              onShutdown={handleShutdown}
              onLangChange={changeLang}
            />
            <RightPanel
              page={page}
              t={t}
              onClose={() => setPage(null)}
              onOpenProject={setOpenProject}
            />
          </div>

          <NavBar
            t={t}
            page={page}
            onNavigate={setPage}
          />

          <ProjectPopup
            projectIndex={openProject}
            onClose={() => setOpenProject(null)}
          />
        </>
      )}

    </div>
  )
}

export default App