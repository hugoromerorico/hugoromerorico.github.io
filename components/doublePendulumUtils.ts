// Constants
const g = 9.81
const L1 = 150
const L2 = 150
const m1 = 1
const m2 = 1

interface PendulumState {
  theta1: number
  theta2: number
  omega1: number
  omega2: number
  isMouseDown: boolean
  selectedMass: number | null
  mouseX: number
  mouseY: number
}

export function drawPendulum(
  ctx: CanvasRenderingContext2D,
  state: PendulumState,
  width: number,
  height: number,
  color: string
) {
  const centerX = width / 2
  const centerY = height / 2 - 100 // Move the pivot point up by 100 pixels

  const x1 = L1 * Math.sin(state.theta1)
  const y1 = L1 * Math.cos(state.theta1)
  const x2 = x1 + L2 * Math.sin(state.theta2)
  const y2 = y1 + L2 * Math.cos(state.theta2)

  ctx.beginPath()
  ctx.moveTo(centerX, centerY)
  ctx.lineTo(centerX + x1, centerY + y1)
  ctx.lineTo(centerX + x2, centerY + y2)
  ctx.strokeStyle = color
  ctx.lineWidth = 2
  ctx.stroke()

  // Draw masses with larger interaction areas
  const massRadius = 15
  ctx.beginPath()
  ctx.arc(centerX + x1, centerY + y1, massRadius, 0, 2 * Math.PI)
  ctx.arc(centerX + x2, centerY + y2, massRadius, 0, 2 * Math.PI)
  ctx.fillStyle = color
  ctx.fill()

  // Draw smaller inner circles for visual appeal
  ctx.beginPath()
  ctx.arc(centerX + x1, centerY + y1, massRadius / 2, 0, 2 * Math.PI)
  ctx.arc(centerX + x2, centerY + y2, massRadius / 2, 0, 2 * Math.PI)
  ctx.fillStyle = state.selectedMass === 1 || state.selectedMass === 2 ? '#ff0000' : '#ffffff'
  ctx.fill()
}

export function updatePendulum(state: PendulumState): PendulumState {
  const dt = 0.05
  const k1 = derivatives(state.theta1, state.theta2, state.omega1, state.omega2)
  const k2 = derivatives(
    state.theta1 + 0.5 * dt * k1[0],
    state.theta2 + 0.5 * dt * k1[1],
    state.omega1 + 0.5 * dt * k1[2],
    state.omega2 + 0.5 * dt * k1[3]
  )
  const k3 = derivatives(
    state.theta1 + 0.5 * dt * k2[0],
    state.theta2 + 0.5 * dt * k2[1],
    state.omega1 + 0.5 * dt * k2[2],
    state.omega2 + 0.5 * dt * k2[3]
  )
  const k4 = derivatives(
    state.theta1 + dt * k3[0],
    state.theta2 + dt * k3[1],
    state.omega1 + dt * k3[2],
    state.omega2 + dt * k3[3]
  )

  const newState = { ...state }
  newState.theta1 += (dt / 6) * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0])
  newState.theta2 += (dt / 6) * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1])
  newState.omega1 += (dt / 6) * (k1[2] + 2 * k2[2] + 2 * k3[2] + k4[2])
  newState.omega2 += (dt / 6) * (k1[3] + 2 * k2[3] + 2 * k3[3] + k4[3])

  if (state.isMouseDown && state.selectedMass !== null) {
    const centerX = 400 // Half of canvas width
    const centerY = 200 // Adjusted for the new pivot point
    const targetX = state.mouseX - centerX
    const targetY = state.mouseY - centerY
    if (state.selectedMass === 1) {
      const targetTheta = Math.atan2(targetX, targetY)
      const deltaTheta = targetTheta - newState.theta1
      newState.omega1 += deltaTheta * 0.1
    } else if (state.selectedMass === 2) {
      const x1 = L1 * Math.sin(newState.theta1)
      const y1 = L1 * Math.cos(newState.theta1)
      const targetTheta = Math.atan2(targetX - x1, targetY - y1)
      const deltaTheta = targetTheta - newState.theta2
      newState.omega2 += deltaTheta * 0.1
    }
  }

  return newState
}

function derivatives(t1: number, t2: number, w1: number, w2: number): [number, number, number, number] {
  const delta = t2 - t1
  const den1 = (m1 + m2) * L1 - m2 * L1 * Math.cos(delta) * Math.cos(delta)
  const den2 = (L2 / L1) * den1

  const dtheta1 = w1
  const dtheta2 = w2
  const domega1 = (m2 * L1 * w1 * w1 * Math.sin(delta) * Math.cos(delta)
    + m2 * g * Math.sin(t2) * Math.cos(delta)
    + m2 * L2 * w2 * w2 * Math.sin(delta)
    - (m1 + m2) * g * Math.sin(t1)) / den1
  const domega2 = (-m2 * L2 * w2 * w2 * Math.sin(delta) * Math.cos(delta)
    + (m1 + m2) * g * Math.sin(t1) * Math.cos(delta)
    - (m1 + m2) * L1 * w1 * w1 * Math.sin(delta)
    - (m1 + m2) * g * Math.sin(t2)) / den2

  return [dtheta1, dtheta2, domega1, domega2]
}

export function handleMouseInteraction(
  state: PendulumState,
  x: number,
  y: number,
  canvasWidth: number,
  canvasHeight: number,
  isMouseDown: boolean
): PendulumState {
  const newState = { ...state }
  const centerX = canvasWidth / 2
  const centerY = canvasHeight / 2 - 100 // Adjusted for the new pivot point
  const x1 = L1 * Math.sin(state.theta1)
  const y1 = L1 * Math.cos(state.theta1)
  const x2 = x1 + L2 * Math.sin(state.theta2)
  const y2 = y1 + L2 * Math.cos(state.theta2)

  const dist1 = Math.sqrt((x - (centerX + x1)) ** 2 + (y - (centerY + y1)) ** 2)
  const dist2 = Math.sqrt((x - (centerX + x2)) ** 2 + (y - (centerY + y2)) ** 2)

  const interactionRadius = 30 // Increased interaction radius

  if (isMouseDown) {
    if (dist1 < interactionRadius) {
      newState.selectedMass = 1
    } else if (dist2 < interactionRadius) {
      newState.selectedMass = 2
    }

    if (newState.selectedMass !== null) {
      newState.isMouseDown = true
      newState.mouseX = x
      newState.mouseY = y
    }
  } else {
    newState.isMouseDown = false
    newState.selectedMass = null
  }

  return newState
}
