import { useRef, useEffect, useCallback } from 'react'
import { useTheme } from 'next-themes'
import { drawPendulum, updatePendulum, handleMouseInteraction, type PendulumState } from './doublePendulumUtils'

export default function DoublePendulumSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()
  const lastTimeRef = useRef<number>(0)
  const mouseStartPosRef = useRef<{ x: number; y: number } | null>(null)
  
  const stateRef = useRef<PendulumState>({
    theta1: Math.PI / 2,
    theta2: Math.PI / 2,
    omega1: 0,
    omega2: 0,
    isMouseDown: false,
    selectedMass: null,
    mouseX: 0,
    mouseY: 0,
    trail: []
  })
  
  const { theme } = useTheme()

  // Add cursor state tracking
  const cursorRef = useRef<'default' | 'grab' | 'grabbing'>('default')

  const updateCursor = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX - rect.left) * (canvas.width / rect.width)
    const y = (e.clientY - rect.top) * (canvas.height / rect.height)

    // Check if mouse is over any mass
    const isOverMass = handleMouseInteraction(
      { ...stateRef.current, isMouseDown: false },
      x,
      y,
      canvas.width,
      canvas.height,
      false
    ).selectedMass !== null

    // Update cursor style
    if (stateRef.current.isMouseDown) {
      cursorRef.current = 'grabbing'
    } else if (isOverMass) {
      cursorRef.current = 'grab'
    } else {
      cursorRef.current = 'default'
    }

    canvas.style.cursor = cursorRef.current
  }, [])

  const handleMouseDown = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX - rect.left) * (canvas.width / rect.width)
    const y = (e.clientY - rect.top) * (canvas.height / rect.height)
    
    mouseStartPosRef.current = { x, y }
    
    stateRef.current = handleMouseInteraction(
      stateRef.current,
      x,
      y,
      canvas.width,
      canvas.height,
      true
    )

    // Update cursor on mouse down
    if (stateRef.current.selectedMass !== null) {
      canvas.style.cursor = 'grabbing'
      cursorRef.current = 'grabbing'
    }
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Update cursor state
    updateCursor(e)
    
    if (!stateRef.current.isMouseDown) return
    
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX - rect.left) * (canvas.width / rect.width)
    const y = (e.clientY - rect.top) * (canvas.height / rect.height)
    
    stateRef.current.mouseX = x
    stateRef.current.mouseY = y
  }, [updateCursor])

  const handleMouseUp = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return

    if (mouseStartPosRef.current && stateRef.current.selectedMass) {
      const rect = canvas.getBoundingClientRect()
      const x = (e.clientX - rect.left) * (canvas.width / rect.width)
      const y = (e.clientY - rect.top) * (canvas.height / rect.height)
      
      const dx = (x - mouseStartPosRef.current.x) * 0.05
      const dy = (y - mouseStartPosRef.current.y) * 0.05
      
      if (stateRef.current.selectedMass === 1) {
        stateRef.current.omega1 += dx
      } else {
        stateRef.current.omega2 += dx
      }
    }
    
    mouseStartPosRef.current = null
    stateRef.current.isMouseDown = false
    stateRef.current.selectedMass = null

    // Reset cursor on mouse up
    updateCursor(e)
  }, [updateCursor])

  const animate = useCallback((timestamp: number) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d', { alpha: false })
    if (!canvas || !ctx) return

    // Calculate delta time for smooth animation
    const deltaTime = timestamp - lastTimeRef.current
    lastTimeRef.current = timestamp

    // Clear with solid color for better performance
    ctx.fillStyle = theme === 'dark' ? '#000000' : '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Update state multiple times per frame for better physics
    const steps = Math.ceil(deltaTime / 16) // Aim for 60 FPS
    for (let i = 0; i < steps; i++) {
      stateRef.current = updatePendulum(stateRef.current)
    }
    
    drawPendulum(
      ctx, 
      stateRef.current, 
      canvas.width, 
      canvas.height, 
      theme === 'dark' ? 'white' : 'black',
      theme
    )
    
    animationFrameRef.current = requestAnimationFrame(animate)
  }, [theme])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseup', handleMouseUp)
    canvas.addEventListener('mouseleave', handleMouseUp)

    lastTimeRef.current = performance.now()
    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseup', handleMouseUp)
      canvas.removeEventListener('mouseleave', handleMouseUp)
    }
  }, [animate, handleMouseDown, handleMouseMove, handleMouseUp])

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      className="w-full h-full border-0"
      style={{ 
        touchAction: 'none',
        imageRendering: 'pixelated',
        cursor: cursorRef.current // Initial cursor style
      }}
    />
  )
}
