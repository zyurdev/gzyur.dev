// Hook que calcula e atualiza o uptime do sistema em tempo real
import { useState, useEffect } from 'react'

export function useUptime() {
  const [uptime, setUptime] = useState('')

  useEffect(() => {
    // Marca o momento em que o site foi aberto
    const start = Date.now()

    // Valores base de uptime (anos de experiência)
    const base = { y: 5, d: 3, h: 12, m: 0 }

    function tick() {
      const diff = Math.floor((Date.now() - start) / 1000)
      const totalM = base.m + Math.floor(diff / 60)
      const h = (base.h + Math.floor(totalM / 60)) % 24
      const m = totalM % 60
      setUptime(`${base.y}y ${base.d}d ${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}m`)
    }

    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])

  return uptime
}