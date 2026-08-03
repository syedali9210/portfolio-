import { useEffect, useRef } from 'react'

/** 8×8 ordered (Bayer) threshold matrix — the classic dither pattern. */
const BAYER = [
  0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36, 14, 46, 6, 38, 60,
  28, 52, 20, 62, 30, 54, 22, 3, 35, 11, 43, 1, 33, 9, 41, 51, 19, 59, 27, 49, 17, 57, 25, 15, 47,
  7, 39, 13, 45, 5, 37, 63, 31, 55, 23, 61, 29, 53, 21,
]

const CELL = 6 // css px between dots
const DOT = 1.5 // dot radius
const TAU = Math.PI * 2
const LEVELS = 6 // colour buckets — one path fill each, instead of a fill per dot

/* swirl micro-interaction */
const HOVER_DELAY = 620 // ms of hovering before the dots start gathering
const GATHER_MS = 1150 // swirl duration — extended for as long as the pointer is held
const FALL_MS = 2000 // burst + fall before the field settles back
const MAX_P = 1200
const LOAD_P = 38 // the loader is a sparse ring, not the whole gradient lifted
const REARM_MS = 900 // cooldown so it can't retrigger instantly

/**
 * One entry per `variant` — each thinking step gets its own motion and palette.
 * Orbit radius goes as tan²/pull and orbit speed as tan, so both drop together
 * to slow the swirl down without collapsing it into a dot.
 */
const SWIRLS = [
  { tan: 0.06, pull: 0.029, dir: 1, deep: [88, 140, 214], bright: [156, 200, 255] }, // blue
  { tan: 0.05, pull: 0.022, dir: -1, deep: [140, 112, 220], bright: [201, 182, 255] }, // violet
  { tan: 0.075, pull: 0.04, dir: 1, deep: [64, 178, 172], bright: [148, 234, 224] }, // teal
]
/** Text tint that matches each variant, for whatever is labelling the swirl. */
export const SWIRL_TINTS = SWIRLS.map((s) => `rgb(${s.bright.join(',')})`)

/**
 * Named field presets. Every mode, command and app gets its own register —
 * colour plus how tight, how agitated and how fast the field runs — and the
 * component eases between whichever two are current.
 */
export const PRESETS = {
  calm: { deep: [88, 140, 214], bright: [156, 200, 255], tight: 1, swell: 0, speed: 0 },
  // toolbar modes
  build: { deep: [64, 178, 172], bright: [148, 234, 224], tight: 0.94, swell: 0.06, speed: 0.002 },
  plan: { deep: [126, 116, 214], bright: [198, 190, 255], tight: 1.06, swell: 0.03, speed: 0.001 },
  execute: { deep: [214, 118, 58], bright: [255, 196, 148], tight: 0.86, swell: 0.16, speed: 0.006 },
  // transient states
  command: { deep: [84, 94, 110], bright: [226, 232, 240], tight: 0.84, swell: 0.16, speed: 0.006 },
  voice: { deep: [206, 72, 128], bright: [255, 178, 210], tight: 0.9, swell: 0.22, speed: 0.009 },
  // app registers, picked up while a command is highlighted or armed
  slack: { deep: [178, 40, 88], bright: [255, 150, 190], tight: 0.9, swell: 0.12, speed: 0.004 },
  clickup: { deep: [96, 84, 200], bright: [186, 176, 255], tight: 0.92, swell: 0.1, speed: 0.004 },
  cloudflare: { deep: [200, 122, 40], bright: [255, 202, 130], tight: 0.9, swell: 0.14, speed: 0.005 },
} as const
export type Preset = keyof typeof PRESETS

/** Build the six colour buckets for a deep→bright pair. */
const ramp = (
  deep: readonly number[],
  bright: readonly number[],
  out: string[],
) => {
  for (let l = 0; l < LEVELS; l++) {
    const k = (l + 0.5) / LEVELS
    const c = (i: number) => Math.round(deep[i] + (bright[i] - deep[i]) * k)
    const a = 0.38 + 0.62 * k
    out[l] = `rgba(${c(0)},${c(1)},${c(2)},${a.toFixed(3)})`
  }
  return out
}
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const lerp3 = (a: readonly number[], b: readonly number[], t: number) => [
  lerp(a[0], b[0], t),
  lerp(a[1], b[1], t),
  lerp(a[2], b[2], t),
]

/** `sp`/`dg` vary per dot — without them every particle settles on the same
 *  orbit and the vortex renders as one clean ring instead of a spiral. */
type Particle = { x: number; y: number; vx: number; vy: number; k: number; sp: number; dg: number }
type Phase = 'idle' | 'gather' | 'loading' | 'fall'

/**
 * Blue dot-dither gradient bleeding from the bottom-right corner of whichever
 * card it sits in — it fills its parent, so the parent's `overflow-hidden`
 * clips it to the rounded corners. Hovering adds a soft blob of intensity.
 *
 * With `interactive`, hovering still (or pressing and holding) for a beat lifts
 * every lit dot out of the gradient: they spiral into the cursor, burst, and
 * fall away under gravity before the gradient fades back in.
 *
 * `loading` runs the same lift, but the dots orbit a fixed point on the right
 * and keep going — a spinner made of the gradient itself. Bumping `variant`
 * mid-flight reshuffles them into a different swirl and palette.
 * `spread` scales how far the gradient reaches in from the corner.
 */
export default function DitherField({
  interactive = false,
  loading = false,
  preset = 'calm',
  variant = 0,
  spread = 0.55,
}: {
  interactive?: boolean
  loading?: boolean
  preset?: Preset
  variant?: number
  spread?: number
}) {
  const ref = useRef<HTMLCanvasElement>(null)
  // read inside the rAF loop — a dep change would restart the whole field
  const loadingRef = useRef(loading)
  const variantRef = useRef(variant)
  const presetRef = useRef<Preset>(preset)
  // Kept out of the rAF-loop effect's deps below (only `interactive`/`spread`
  // restart it) — the loop reads these refs each frame instead.
  useEffect(() => {
    loadingRef.current = loading
    variantRef.current = variant % SWIRLS.length
    presetRef.current = preset
  }, [loading, variant, preset])

  useEffect(() => {
    const canvas = ref.current!
    const host = canvas.parentElement! // sized to this
    // Pointer listeners go on the card, not the clip layer: the clip layer is
    // pointer-events-none (so controls above it stay clickable) and would never
    // see a move. Same box either way, so coordinates are unaffected.
    const surface = (canvas.closest('[data-dither-surface]') ?? host) as HTMLElement
    const ctx = canvas.getContext('2d')!
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(2, window.devicePixelRatio || 1)

    let w = 0
    let h = 0
    let cw = 0
    let ch = 0
    let raf = 0
    let t = 0

    // xy pairs per colour bucket, reused every frame
    let bucket: Float32Array[] = []
    const count = new Uint16Array(LEVELS)

    // pointer target + eased actual position, in cell space
    const p = { x: -1e3, y: -1e3, tx: -1e3, ty: -1e3, glow: 0, want: 0 }

    let phase: Phase = 'idle'
    let phaseAt = 0
    let settledAt = 0 // last time the pointer stopped moving
    let endedAt = -1e9 // last time a burst finished
    let shownVariant = 0
    let held = false
    let collect = false // sample the lit cells into particles on the next field pass
    let fieldK = 1 // gradient opacity, ducks out while the particles are flying
    // eased crossfade between the outgoing and incoming preset
    let fromP: Preset = preset
    let toP: Preset = preset
    let blend = 1
    const shades: string[] = new Array(LEVELS)
    let pAlpha = 0 // particles fade as one — they all ramp and decay together
    let parts: Particle[] = []

    /** Where the loading swirl orbits: inside the right edge and above centre,
     *  since the pill's lower half sits behind the chat box. */
    const orbit = () => ({ x: cw - 6, y: ch * 0.37 })

    function resize() {
      const nw = host.clientWidth
      const nh = host.clientHeight
      if (nw === w && nh === h) return
      w = nw
      h = nh
      cw = Math.max(1, Math.ceil(w / CELL))
      ch = Math.max(1, Math.ceil(h / CELL))
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      bucket = Array.from({ length: LEVELS }, () => new Float32Array(cw * ch * 2))
    }

    /** the field is background texture — it shouldn't chase the cursor while the
     *  cursor is busy with a control sitting on top of it */
    const overControl = (t: EventTarget | null) =>
      t instanceof Element &&
      !!t.closest('button, a, input, textarea, select, [role="button"]')

    function onMove(e: PointerEvent) {
      const r = surface.getBoundingClientRect()
      p.tx = (e.clientX - r.left) / CELL
      p.ty = (e.clientY - r.top) / CELL
      p.want = overControl(e.target) ? 0 : 1
      settledAt = performance.now() // the delay counts from when you stop moving
    }
    function onLeave() {
      p.want = 0
      held = false
      if (phase === 'gather') burst()
    }
    function onDown(e: PointerEvent) {
      if (overControl(e.target)) return // pressing a button isn't a swirl gesture
      held = true
    }
    function onUp() {
      held = false
    }

    function burst() {
      // read the swirl origin before the phase flips, or it always reads as the cursor
      const o = phase === 'loading' ? orbit() : p
      phase = 'fall'
      phaseAt = performance.now()
      for (const q of parts) {
        const ang = Math.atan2(q.y - o.y, q.x - o.x) + (Math.random() - 0.5) * 0.9
        const sp = 0.35 + Math.random() * 0.9
        q.vx = Math.cos(ang) * sp
        q.vy = Math.sin(ang) * sp - 1.0 // pop up before gravity takes over
      }
    }

    /** hover-delay / hold -> swirl -> burst -> fall -> idle */
    function step(now: number) {
      if (phase === 'idle') {
        const ready = now - endedAt > REARM_MS && p.glow > 0.5 && p.want === 1
        if (ready && (held || now - settledAt > HOVER_DELAY)) {
          phase = 'gather'
          phaseAt = now
          collect = true
          pAlpha = 0
        }
        return
      }
      if (phase === 'gather') {
        // holding keeps them spinning; releasing (or the timer) sets them off
        if (!held && now - phaseAt > GATHER_MS) burst()
        return
      }
      if (now - phaseAt > FALL_MS || parts.length === 0) {
        phase = 'idle'
        parts = []
        endedAt = now
        settledAt = now
      }
    }

    function stepParticles() {
      const load = phase === 'loading'
      const swirl = load || phase === 'gather'
      const cfg = SWIRLS[shownVariant]
      // the loading spinner orbits a fixed point over on the right, not the cursor
      const o = load ? orbit() : p
      pAlpha = swirl ? Math.min(1, pAlpha + 0.05) : Math.max(0, pAlpha - 0.006)
      const next: Particle[] = []
      for (const q of parts) {
        if (swirl) {
          const dx = q.x - o.x
          const dy = q.y - o.y
          const d = Math.hypot(dx, dy) || 0.001
          const nx = dx / d
          const ny = dy / d
          const pull = d < 2 ? 0.04 : load ? cfg.pull * (1 + d * 0.02) : 0.3 + d * 0.005
          q.vx -= nx * pull
          q.vy -= ny * pull
          const tan = (q.sp * (load ? cfg.tan : 0.46)) / (1 + d * 0.05) // inner dots orbit faster
          const dir = load ? cfg.dir : 1
          q.vx += -ny * tan * dir
          q.vy += nx * tan * dir
          const jit = load ? 0.012 : 0.03
          q.vx = q.vx * q.dg + (Math.random() - 0.5) * jit
          q.vy = q.vy * q.dg + (Math.random() - 0.5) * jit
          q.k = Math.min(0.999, q.k + 0.02) // brighten as they compress (<1 keeps the bucket index in range)
        } else {
          q.vy += 0.06 // gravity
          q.vx *= 0.985
          q.vy *= 0.995
        }
        q.x += q.vx
        q.y += q.vy
        // only the falling dots die off the bottom — a swirl pulls stragglers back in,
        // which matters while the card is still collapsing under them
        if (swirl || q.y < ch + 4) next.push(q)
      }
      parts = pAlpha > 0 ? next : []
    }

    function frame() {
      raf = requestAnimationFrame(frame)
      if (!cw) return
      const now = performance.now()
      // presets crossfade: colour, tightness, agitation and drift all travel together
      if (presetRef.current !== toP) {
        fromP = blend >= 1 ? toP : fromP
        toP = presetRef.current
        blend = 0
      }
      blend = Math.min(1, blend + 0.05)
      const A = PRESETS[fromP]
      const B = PRESETS[toP]
      const tight = lerp(A.tight, B.tight, blend)
      const swell = lerp(A.swell, B.swell, blend)
      const speed = lerp(A.speed, B.speed, blend)
      if (!reduced) t += 0.005 + speed

      // ease the pointer so the blob trails the cursor instead of snapping
      if (p.x < -1e2) {
        p.x = p.tx
        p.y = p.ty
      }
      p.x += (p.tx - p.x) * 0.12
      p.y += (p.ty - p.y) * 0.12
      p.glow += (p.want - p.glow) * 0.07

      const wantLoad = loadingRef.current && !reduced
      if (wantLoad && phase !== 'loading') {
        phase = 'loading'
        phaseAt = now
        parts = []
        collect = true
        pAlpha = 0
      } else if (!wantLoad && phase === 'loading') {
        burst()
      } else if (interactive && !reduced) {
        step(now)
      }

      // a new thinking step: kick the dots loose so they visibly re-form
      if (phase === 'loading' && variantRef.current !== shownVariant) {
        shownVariant = variantRef.current
        for (const q of parts) {
          const a = Math.random() * TAU
          const s = 0.15 + Math.random() * 0.3
          q.vx += Math.cos(a) * s
          q.vy += Math.sin(a) * s
          q.sp = 0.5 + Math.random()
        }
      } else if (phase !== 'loading') {
        shownVariant = 0
      }

      // gradient ducks out while the dots are flying, fades back once they land
      const wantField = phase === 'idle' || (phase === 'fall' && now - phaseAt > 900) ? 1 : 0
      fieldK += (wantField - fieldK) * 0.05

      const ar = cw / ch
      const norm = Math.hypot(ar, 1)
      const px = (p.x / cw - 1) * ar
      const py = p.y / ch - 1
      count.fill(0)

      for (let y = 0; y < ch; y++) {
        const ny = y / ch - 1
        for (let x = 0; x < cw; x++) {
          const nx = (x / cw - 1) * ar

          // radial falloff from the bottom-right corner of the card
          let v = 1 - Math.hypot(nx, ny) / (norm * spread * tight)
          v = v > 0 ? v * v * v * 1.05 : 0
          // slow diagonal swell — multiplied in, so it never speckles the dead zone
          v *= 1 + (0.22 + swell) * Math.sin(nx * 6 + t * 1.6) * Math.sin(ny * 4 - t)
          // cursor blob
          const pd = Math.hypot(nx - px, ny - py)
          v += 0.4 * p.glow * Math.exp(-(pd * pd) / 0.05)
          v *= fieldK

          if (v > (BAYER[(y & 7) * 8 + (x & 7)] + 0.5) / 64) {
            const k = Math.min(0.999, v)
            if (collect)
              parts.push({
                x,
                y,
                vx: 0,
                vy: 0,
                k,
                sp: 0.5 + Math.random(),
                dg: 0.79 + Math.random() * 0.09,
              })
            const l = (k * LEVELS) | 0
            const n = count[l]++ * 2
            bucket[l][n] = x * CELL + CELL / 2
            bucket[l][n + 1] = y * CELL + CELL / 2
          }
        }
      }

      if (collect) {
        collect = false
        // keep the cost bounded on big cards; the loader keeps far fewer than that
        const cap = phase === 'loading' ? LOAD_P : MAX_P
        if (parts.length > cap) parts = parts.filter(() => Math.random() < cap / parts.length)
      }

      if (parts.length) {
        stepParticles()
        for (const q of parts) {
          const l = (q.k * LEVELS) | 0
          const n = count[l]++ * 2
          if (n + 1 >= bucket[l].length) continue
          bucket[l][n] = q.x * CELL + CELL / 2
          bucket[l][n + 1] = q.y * CELL + CELL / 2
        }
      }

      ctx.clearRect(0, 0, w, h)
      // the loading swirl keeps its own per-step palette; everything else rides the preset
      if (phase === 'loading') {
        const s = SWIRLS[shownVariant]
        ramp(s.deep, s.bright, shades)
      } else {
        ramp(lerp3(A.deep, B.deep, blend), lerp3(A.bright, B.bright, blend), shades)
      }
      const dotAlpha = phase === 'idle' ? 1 : Math.max(fieldK, pAlpha)
      for (let l = 0; l < LEVELS; l++) {
        const n = count[l]
        if (!n) continue
        const pts = bucket[l]
        ctx.beginPath()
        for (let i = 0; i < n; i++) {
          const x = pts[i * 2]
          const y = pts[i * 2 + 1]
          ctx.moveTo(x + DOT, y)
          ctx.arc(x, y, DOT, 0, TAU)
        }
        ctx.globalAlpha = dotAlpha
        ctx.fillStyle = shades[l]
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    const ro = new ResizeObserver(resize)
    ro.observe(host)
    resize()
    frame()
    surface.addEventListener('pointermove', onMove)
    surface.addEventListener('pointerleave', onLeave)
    if (interactive) {
      surface.addEventListener('pointerdown', onDown)
      window.addEventListener('pointerup', onUp)
    }
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      surface.removeEventListener('pointermove', onMove)
      surface.removeEventListener('pointerleave', onLeave)
      surface.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
    // `loading`/`variant`/`preset` are deliberately excluded — they're read
    // each frame via their refs so changing them doesn't tear down and
    // reinitialize the canvas/rAF loop. Only `interactive`/`spread` should.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interactive, spread])

  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />
}
