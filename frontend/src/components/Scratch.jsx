import { useEffect, useRef, useState } from 'react'

export default function Scratch({ onDone }) {
  const canvas = useRef(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const k = canvas.current
    const x = k.getContext('2d')
    k.width = k.offsetWidth
    k.height = k.offsetHeight
    const g = x.createLinearGradient(0, 0, k.width, k.height)
    g.addColorStop(0, '#dfe9f5')
    g.addColorStop(0.5, '#a9c4e0')
    g.addColorStop(1, '#f3d3dc')
    x.fillStyle = g
    x.fillRect(0, 0, k.width, k.height)
    x.fillStyle = '#3a4a63'
    x.font = '500 19px Jost, sans-serif'
    x.textAlign = 'center'
    x.fillText('✦ Scratch to reveal ✦', k.width / 2, k.height / 2 + 6)

    let down = false
    let finished = false
    const scratch = (e) => {
      if (!down || finished) return
      const r = k.getBoundingClientRect()
      x.globalCompositeOperation = 'destination-out'
      x.beginPath()
      x.arc(e.clientX - r.left, e.clientY - r.top, 28, 0, 7)
      x.fill()
    }
    const check = () => {
      const a = x.getImageData(0, 0, k.width, k.height).data
      let cleared = 0
      let total = 0
      for (let i = 3; i < a.length; i += 160) {
        total++
        if (!a[i]) cleared++
      }
      if (cleared / total > 0.4) {
        finished = true
        setDone(true)
        onDone?.()
      }
    }
    k.onpointerdown = (e) => {
      down = true
      k.setPointerCapture(e.pointerId)
      scratch(e)
    }
    k.onpointermove = scratch
    k.onpointerup = () => {
      down = false
      check()
    }
  }, [])

  return (
    <div className="sc">
      <div className="dt">
        <span className="eb">Wedding Ceremony</span>
        <b>03 · 12 · 2026</b>
        <span>Thursday · 8:15 – 9:25 AM</span>
      </div>
      <canvas ref={canvas} className={done ? 'gone' : ''} />
    </div>
  )
}
