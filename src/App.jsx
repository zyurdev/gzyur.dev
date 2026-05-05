// Componente raiz — controla se o boot já terminou
import { useState } from 'react'
import Boot from './components/Boot/Boot'
import SysHeader from './components/SysHeader/SysHeader'

function App() {
  const [booted, setBooted] = useState(false)

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

      {/* Boot aparece até o usuário pressionar qualquer tecla */}
      {!booted && <Boot onComplete={() => setBooted(true)} />}

      {/* Site principal — só renderiza após o boot */}
      {booted && <SysHeader />}

    </div>
  )
}

export default App