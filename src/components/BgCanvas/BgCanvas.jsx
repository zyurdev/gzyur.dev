// Canvas de fundo — grid de pontos vermelhos com pulso suave
import { useEffect, useRef } from 'react'
import styles from './BgCanvas.module.css'

function BgCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId
    let dots = []

    // Gera os pontos do grid
    function buildDots() {
      dots = []
      const spacing = 40
      for (let x = spacing / 2; x < canvas.width; x += spacing) {
        for (let y = spacing / 2; y < canvas.height; y += spacing) {
          dots.push({
            x,
            y,
            phase: Math.random() * Math.PI * 2,
            speed: 0.003 + Math.random() * 0.005,
          })
        }
      }
    }

    // Ajusta o canvas ao tamanho da janela
    function resize() {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      buildDots()
    }

    // Loop de animação
    function draw(time) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      dots.forEach(dot => {
        const alpha = 0.5 + 0.5 * Math.sin(dot.phase + time * dot.speed)
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, 0.9, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(232, 35, 26, ${alpha})`
        ctx.fill()
      })
      animationId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    animationId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.canvas} />
}

export default BgCanvas