// Componente raiz — controla boot e monta o layout principal
import { useState } from 'react'
import Boot from './components/Boot/Boot'
import SysHeader from './components/SysHeader/SysHeader'
import Terminal from './components/Terminal/Terminal'

function App() {
  const [booted, setBooted] = useState(false)

  function handleNavigate(page) {
    // navegação será implementada na fase dos painéis
    console.log('navegar para:', page)
  }

  function handleShutdown() {
    window.location.reload()
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {!booted && <Boot onComplete={() => setBooted(true)} />}

      {booted && (
        <>
          <SysHeader />
          <Terminal
            onNavigate={handleNavigate}
            onShutdown={handleShutdown}
          />
        </>
      )}
    </div>
  )
}

export default App