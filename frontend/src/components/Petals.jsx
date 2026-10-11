import { useMemo } from 'react'

const COLORS = ['#ffffff', '#cfe0f1', '#f3c9d3', '#9dbfe0', '#f7e3b0']

export default function Petals({ n = 22, fast = false }) {
  const petals = useMemo(
    () =>
      [...Array(n)].map(() => ({
        left: Math.random() * 100,
        dur: (fast ? 3 : 10) + Math.random() * (fast ? 2 : 8),
        delay: Math.random() * (fast ? 1 : 10),
        size: 8 + Math.random() * 12,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      })),
    [n, fast]
  )
  return (
    <div className="pt">
      {petals.map((q, i) => (
        <i
          key={i}
          style={{
            left: q.left + '%',
            width: q.size,
            height: q.size * 1.3,
            background: q.color,
            animationDuration: q.dur + 's',
            animationDelay: q.delay + 's',
            animationIterationCount: fast ? 1 : 'infinite',
          }}
        />
      ))}
    </div>
  )
}
