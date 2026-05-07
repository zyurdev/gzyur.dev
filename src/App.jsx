// Componente raiz — controla boot, idioma, navegação e layout
import { useState } from 'react'
import Boot       from './components/Boot/Boot'
import SysHeader  from './components/SysHeader/SysHeader'
import Terminal   from './components/Terminal/Terminal'
import RightPanel from './components/RightPanel/RightPanel'
import { useLang } from './hooks/useLang'

function App() {
  const [booted, setBooted]   = useState(false)
  const [page, setPage]       = useState(null)
  const { t, changeLang }     = useLang()

  function handleShutdown() {
    window.location.reload()
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

      {!booted && <Boot onComplete={() => setBooted(true)} t={t} />}

      {booted && (
        <>
          <SysHeader t={t} />

          {/* Área principal — terminal + painel direito lado a lado */}
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
              onOpenProject={(i) => console.log('abrir projeto', i)}
            />
          </div>
        </>
      )}

    </div>
  )
}

export default App