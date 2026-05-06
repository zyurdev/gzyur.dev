// Componente raiz — controla boot, idioma e layout principal
import { useState } from 'react'
import Boot from './components/Boot/Boot'
import SysHeader from './components/SysHeader/SysHeader'
import Terminal from './components/Terminal/Terminal'
import { useLang } from './hooks/useLang'

function App() {
  const [booted, setBooted] = useState(false)
  const { t, changeLang }   = useLang()

  function handleNavigate(page) {
    console.log('navegar para:', page)
  }

  function handleShutdown() {
    window.location.reload()
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {!booted && <Boot onComplete={() => setBooted(true)} t={t} />}

      {booted && (
        <>
          <SysHeader t={t} />
          <Terminal
            t={t}
            onNavigate={handleNavigate}
            onShutdown={handleShutdown}
            onLangChange={changeLang}
          />
        </>
      )}
    </div>
  )
}

export default App