import { useRef, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { drawPendulum, updatePendulum, handleMouseInteraction } from './doublePendulumUtils'

export default function DoublePendulumSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let pendulumState = {
      theta1: Math.PI / 2,
      theta2: Math.PI / 2,
      omega1: 0,
      omega2: 0,
      isMouseDown: false,
      selectedMass: null as number | null,
      mouseX: 0,
      mouseY: 0
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawPendulum(ctx, pendulumState, canvas.width, canvas.height, theme === 'dark' ? 'white' : 'black')
      pendulumState = updatePendulum(pendulumState)
      animationFrameId = requestAnimationFrame(draw)
    }

    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      pendulumState = handleMouseInteraction(pendulumState, x, y, canvas.width, canvas.height, true)
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (pendulumState.isMouseDown) {
        const rect = canvas.getBoundingClientRect()
        pendulumState.mouseX = e.clientX - rect.left
        pendulumState.mouseY = e.clientY - rect.top
      }
    }

    const handleMouseUp = () => {
      pendulumState.isMouseDown = false
      pendulumState.selectedMass = null
    }

    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseup', handleMouseUp)
    canvas.addEventListener('mouseleave', handleMouseUp)

    draw()

    return () => {
      cancelAnimationFrame(animationFrameId)
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseup', handleMouseUp)
      canvas.removeEventListener('mouseleave', handleMouseUp)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      className="w-full h-full border-0"
    />
  )
}
