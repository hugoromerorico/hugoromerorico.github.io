// Constants
const PHYSICS = {
  g: 9.81 * 2,
  L1: 150,
  L2: 150,
  m1: 1,
  m2: 1,
  damping: 0.9998,
  dragForceMultiplier: 0.5,
  timeStep: 0.016 * 1.5,
  maxAngularVelocity: 5, // Maximum angular velocity (radians per second)
  maxDragForce: 5 // Maximum force that can be applied through dragging
}

const VISUAL = {
  massRadius: 15,
  innerMassRadius: 7.5,
  anchorRadius: 8,
  anchorInnerRadius: 4,
  lineWidth: 3, // Increased for better visibility
  trailLength: 2000,
  trailOpacityStep: 0.008,
  trailWidth: 3,
  trailColors: [
    '#FF0000',
    '#FF9900',
    '#FFFF00',
    '#00FF00',
    '#00FFFF',
    '#0000FF',
    '#9900FF'
  ],
  // Add glow effects
  glowColor: 'rgba(255, 255, 255, 0.2)',
  glowSize: 20,
  // Mass gradients
  massGradient: {
    inner: '#ffffff',
    outer: '#cccccc'
  }
}

// Types
interface PendulumState {
  theta1: number
  theta2: number
  omega1: number
  omega2: number
  isMouseDown: boolean
  selectedMass: number | null
  mouseX: number
  mouseY: number
  trail: Array<{ x: number; y: number }> // Add trail for second mass
}

// Physics calculations
function calculateDerivatives(t1: number, t2: number, w1: number, w2: number): [number, number, number, number] {
  const { g, L1, L2, m1, m2 } = PHYSICS
  const delta = t2 - t1
  const den1 = (m1 + m2) * L1 - m2 * L1 * Math.cos(delta) * Math.cos(delta)
  const den2 = (L2 / L1) * den1

  const dtheta1 = w1
  const dtheta2 = w2
  
  const domega1 = (
    m2 * L1 * w1 * w1 * Math.sin(delta) * Math.cos(delta) +
    m2 * g * Math.sin(t2) * Math.cos(delta) +
    m2 * L2 * w2 * w2 * Math.sin(delta) -
    (m1 + m2) * g * Math.sin(t1)
  ) / den1

  const domega2 = (
    -m2 * L2 * w2 * w2 * Math.sin(delta) * Math.cos(delta) +
    (m1 + m2) * g * Math.sin(t1) * Math.cos(delta) -
    (m1 + m2) * L1 * w1 * w1 * Math.sin(delta) -
    (m1 + m2) * g * Math.sin(t2)
  ) / den2

  return [dtheta1, dtheta2, domega1, domega2]
}

// RK4 integration for more accurate physics
function rungeKutta4(state: PendulumState): void {
  const { timeStep, damping, maxAngularVelocity } = PHYSICS
  const { theta1, theta2, omega1, omega2 } = state
  
  const k1 = calculateDerivatives(theta1, theta2, omega1, omega2)
  const k2 = calculateDerivatives(
    theta1 + k1[0] * timeStep / 2,
    theta2 + k1[1] * timeStep / 2,
    omega1 + k1[2] * timeStep / 2,
    omega2 + k1[3] * timeStep / 2
  )
  const k3 = calculateDerivatives(
    theta1 + k2[0] * timeStep / 2,
    theta2 + k2[1] * timeStep / 2,
    omega1 + k2[2] * timeStep / 2,
    omega2 + k2[3] * timeStep / 2
  )
  const k4 = calculateDerivatives(
    theta1 + k3[0] * timeStep,
    theta2 + k3[1] * timeStep,
    omega1 + k3[2] * timeStep,
    omega2 + k3[3] * timeStep
  )

  state.theta1 += (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]) * timeStep / 6
  state.theta2 += (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]) * timeStep / 6
  
  const newOmega1 = (state.omega1 + (k1[2] + 2 * k2[2] + 2 * k3[2] + k4[2]) * timeStep / 6) * damping
  const newOmega2 = (state.omega2 + (k1[3] + 2 * k2[3] + 2 * k3[3] + k4[3]) * timeStep / 6) * damping
  
  state.omega1 = clamp(newOmega1, -maxAngularVelocity, maxAngularVelocity)
  state.omega2 = clamp(newOmega2, -maxAngularVelocity, maxAngularVelocity)
  
  state.theta1 = normalizeAngle(state.theta1)
  state.theta2 = normalizeAngle(state.theta2)
}

export function updatePendulum(state: PendulumState): PendulumState {
  const newState = { ...state }
  
  if (state.isMouseDown && state.selectedMass !== null) {
    applyDragForce(newState)
  }

  rungeKutta4(newState)
  updateTrail(newState)
  
  return newState
}

function applyDragForce(state: PendulumState): void {
  const { L1, dragForceMultiplier, maxDragForce } = PHYSICS
  const centerX = 400
  const centerY = 200
  
  const x1 = L1 * Math.sin(state.theta1)
  const y1 = L1 * Math.cos(state.theta1)
  
  if (state.selectedMass === 1) {
    const targetAngle = Math.atan2(state.mouseX - centerX, state.mouseY - centerY)
    const angleDiff = normalizeAngle(targetAngle - state.theta1)
    const force = clamp(angleDiff * dragForceMultiplier, -maxDragForce, maxDragForce)
    state.omega1 += force
  } else if (state.selectedMass === 2) {
    const targetAngle = Math.atan2(state.mouseX - (centerX + x1), state.mouseY - (centerY + y1))
    const angleDiff = normalizeAngle(targetAngle - state.theta2)
    const force = clamp(angleDiff * dragForceMultiplier, -maxDragForce, maxDragForce)
    state.omega2 += force
  }
}
function updateTrail(state: PendulumState): void {
  const { L1, L2 } = PHYSICS
  const x1 = L1 * Math.sin(state.theta1)
  const y1 = L1 * Math.cos(state.theta1)
  const x2 = x1 + L2 * Math.sin(state.theta2)
  const y2 = y1 + L2 * Math.cos(state.theta2)
  
  state.trail.push({ x: x2, y: y2 })
  if (state.trail.length > VISUAL.trailLength) {
    state.trail.shift()
  }
}

// Drawing functions
export function drawPendulum(
  ctx: CanvasRenderingContext2D,
  state: PendulumState,
  width: number,
  height: number,
  color: string,
  theme: string
): void {
  const centerX = width / 2
  const centerY = height / 2 - 100

  // Draw in specific order for proper layering
  drawTrail(ctx, state.trail, centerX, centerY)
  drawRods(ctx, state, centerX, centerY, color)
  drawMasses(ctx, state, centerX, centerY, color, theme)
  drawAnchor(ctx, centerX, centerY, color, theme) // New anchor drawing function
}

function drawTrail(
  ctx: CanvasRenderingContext2D,
  trail: Array<{ x: number; y: number }>,
  centerX: number,
  centerY: number,
): void {
  if (trail.length < 2) return;

  // Draw rainbow trail
  for (let i = 1; i < trail.length; i++) {
    const pos = trail[i];
    const prevPos = trail[i - 1];
    const progress = i / trail.length;
    
    // Calculate color index
    const colorIndex = Math.floor(progress * (VISUAL.trailColors.length - 1));
    const nextColorIndex = Math.min(colorIndex + 1, VISUAL.trailColors.length - 1);
    const colorProgress = (progress * (VISUAL.trailColors.length - 1)) % 1;
    
    // Interpolate between colors
    const currentColor = VISUAL.trailColors[colorIndex];
    const nextColor = VISUAL.trailColors[nextColorIndex];
    
    ctx.beginPath();
    ctx.strokeStyle = interpolateColors(currentColor, nextColor, colorProgress);
    ctx.lineWidth = VISUAL.trailWidth * (0.3 + progress * 0.7); // Trail gets thinner towards the end
    ctx.globalAlpha = progress; // Fade out
    
    ctx.moveTo(centerX + prevPos.x, centerY + prevPos.y);
    ctx.lineTo(centerX + pos.x, centerY + pos.y);
    ctx.stroke();
  }
  
  ctx.globalAlpha = 1; // Reset alpha
  ctx.lineWidth = VISUAL.lineWidth; // Reset line width
}

// Helper function to interpolate between colors
function interpolateColors(color1: string, color2: string, progress: number): string {
  const r1 = parseInt(color1.slice(1, 3), 16);
  const g1 = parseInt(color1.slice(3, 5), 16);
  const b1 = parseInt(color1.slice(5, 7), 16);
  
  const r2 = parseInt(color2.slice(1, 3), 16);
  const g2 = parseInt(color2.slice(3, 5), 16);
  const b2 = parseInt(color2.slice(5, 7), 16);
  
  const r = Math.round(r1 + (r2 - r1) * progress);
  const g = Math.round(g1 + (g2 - g1) * progress);
  const b = Math.round(b1 + (b2 - b1) * progress);
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function drawRods(
  ctx: CanvasRenderingContext2D,
  state: PendulumState,
  centerX: number,
  centerY: number,
  color: string
): void {
  const { L1, L2 } = PHYSICS
  const { lineWidth, glowColor } = VISUAL
  const x1 = L1 * Math.sin(state.theta1)
  const y1 = L1 * Math.cos(state.theta1)
  const x2 = x1 + L2 * Math.sin(state.theta2)
  const y2 = y1 + L2 * Math.cos(state.theta2)

  // Draw glow effect
  ctx.beginPath()
  ctx.strokeStyle = glowColor
  ctx.lineWidth = lineWidth + 4
  ctx.moveTo(centerX, centerY)
  ctx.lineTo(centerX + x1, centerY + y1)
  ctx.lineTo(centerX + x2, centerY + y2)
  ctx.stroke()

  // Draw main rods
  ctx.beginPath()
  ctx.strokeStyle = color
  ctx.lineWidth = lineWidth
  ctx.moveTo(centerX, centerY)
  ctx.lineTo(centerX + x1, centerY + y1)
  ctx.lineTo(centerX + x2, centerY + y2)
  ctx.stroke()
}

function drawMasses(
  ctx: CanvasRenderingContext2D,
  state: PendulumState,
  centerX: number,
  centerY: number,
  color: string,
  theme: string
): void {
  const { L1, L2 } = PHYSICS
  const { massRadius, innerMassRadius, glowSize } = VISUAL
  
  const x1 = L1 * Math.sin(state.theta1)
  const y1 = L1 * Math.cos(state.theta1)
  const x2 = x1 + L2 * Math.sin(state.theta2)
  const y2 = y1 + L2 * Math.cos(state.theta2)

  // Helper function to draw a mass
  const drawMass = (x: number, y: number, isSelected: boolean) => {
    // Draw glow
    ctx.beginPath()
    const glowGradient = ctx.createRadialGradient(
      x, y, 0,
      x, y, glowSize
    )
    glowGradient.addColorStop(0, theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)')
    glowGradient.addColorStop(1, 'transparent')
    ctx.fillStyle = glowGradient
    ctx.arc(x, y, glowSize, 0, 2 * Math.PI)
    ctx.fill()

    // Draw main mass
    ctx.beginPath()
    const gradient = ctx.createRadialGradient(
      x - massRadius/3, y - massRadius/3, 0,
      x, y, massRadius
    )
    gradient.addColorStop(0, theme === 'dark' ? '#ffffff' : '#000000')
    gradient.addColorStop(1, theme === 'dark' ? '#666666' : '#999999')
    ctx.fillStyle = gradient
    ctx.arc(x, y, massRadius, 0, 2 * Math.PI)
    ctx.fill()

    // Draw inner highlight
    ctx.beginPath()
    ctx.fillStyle = isSelected ? '#ff4444' : (theme === 'dark' ? '#333333' : '#ffffff')
    ctx.arc(x, y, innerMassRadius, 0, 2 * Math.PI)
    ctx.fill()
  }

  // Draw both masses
  drawMass(centerX + x1, centerY + y1, state.selectedMass === 1)
  drawMass(centerX + x2, centerY + y2, state.selectedMass === 2)
}

function drawAnchor(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  color: string,
  theme: string
): void {
  const { anchorRadius, anchorInnerRadius, glowSize } = VISUAL

  // Draw glow effect
  ctx.beginPath()
  const gradient = ctx.createRadialGradient(
    centerX, centerY, 0,
    centerX, centerY, glowSize
  )
  gradient.addColorStop(0, theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)')
  gradient.addColorStop(1, 'transparent')
  ctx.fillStyle = gradient
  ctx.arc(centerX, centerY, glowSize, 0, 2 * Math.PI)
  ctx.fill()

  // Draw outer circle
  ctx.beginPath()
  ctx.fillStyle = color
  ctx.arc(centerX, centerY, anchorRadius, 0, 2 * Math.PI)
  ctx.fill()

  // Draw inner circle
  ctx.beginPath()
  ctx.fillStyle = theme === 'dark' ? '#333333' : '#ffffff'
  ctx.arc(centerX, centerY, anchorInnerRadius, 0, 2 * Math.PI)
  ctx.fill()
}

export function handleMouseInteraction(
  state: PendulumState,
  mouseX: number,
  mouseY: number,
  width: number,
  height: number,
  isMouseDown: boolean
): PendulumState {
  const centerX = width / 2
  const centerY = height / 2 - 100
  const { L1, L2 } = PHYSICS
  const { massRadius } = VISUAL

  const x1 = L1 * Math.sin(state.theta1)
  const y1 = L1 * Math.cos(state.theta1)
  const x2 = x1 + L2 * Math.sin(state.theta2)
  const y2 = y1 + L2 * Math.cos(state.theta2)

  // Check if mouse is near either mass
  const dist1 = Math.hypot(mouseX - (centerX + x1), mouseY - (centerY + y1))
  const dist2 = Math.hypot(mouseX - (centerX + x2), mouseY - (centerY + y2))

  return {
    ...state,
    isMouseDown,
    mouseX,
    mouseY,
    selectedMass: isMouseDown ? (
      dist1 < massRadius ? 1 :
      dist2 < massRadius ? 2 :
      null
    ) : null
  }
}

// Helper functions for angle and velocity management
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

function normalizeAngle(angle: number): number {
  // Keep angle between -π and π
  while (angle > Math.PI) angle -= 2 * Math.PI
  while (angle < -Math.PI) angle += 2 * Math.PI
  return angle
}

// Export types for use in other files
export type { PendulumState }

