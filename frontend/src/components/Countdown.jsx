import { useEffect, useState } from 'react'
import { WEDDING_DATE } from '../config'

const UNITS = [['Days', 864e5], ['Hours', 36e5], ['Mins', 6e4], ['Secs', 1e3]]

export default function Countdown() {
  const target = new Date(WEDDING_DATE).getTime()
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])
  let left = Math.max(0, target - now)
  return (
    <div className="cd">
      {UNITS.map(([label, ms]) => {
        const v = Math.floor(left / ms)
        left -= v * ms
        return (
          <div key={label}>
            <b>{String(v).padStart(2, '0')}</b>
            <span>{label}</span>
          </div>
        )
      })}
    </div>
  )
}
