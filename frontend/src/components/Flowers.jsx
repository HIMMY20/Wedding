const shadow = { flex: 'none', filter: 'drop-shadow(0 2px 3px #3a4a6333)' }

export const Daisy = ({ s = 70, a = '#ffffff', b = '#cfe0f1', n = 12, c = '#f4d58d' }) => (
  <svg viewBox="-50 -50 100 100" width={s} height={s} style={shadow}>
    {[...Array(n)].map((_, i) => (
      <ellipse key={'o' + i} cy="-27" rx="9" ry="22" fill={i % 2 ? a : b} stroke="#b9cfe6" strokeWidth=".8" transform={`rotate(${(i * 360) / n})`} />
    ))}
    {[...Array(n)].map((_, i) => (
      <ellipse key={'i' + i} cy="-14" rx="5.5" ry="13" fill={i % 2 ? b : a} transform={`rotate(${(i * 360) / n + 180 / n})`} />
    ))}
    <circle r="8" fill={c} />
    <circle r="3" fill="#b8955a" />
  </svg>
)

export const Rose = ({ s = 60 }) => (
  <svg viewBox="-50 -50 100 100" width={s} height={s} style={shadow}>
    {[...Array(6)].map((_, i) => (
      <circle key={i} cy="-24" r="17" fill="#f3c9d3" stroke="#e5a3b3" transform={`rotate(${i * 60})`} />
    ))}
    <circle r="15" fill="#f9dde3" stroke="#e5a3b3" />
    <circle r="8" fill="#eba9b9" />
    <circle r="3" fill="#fff" />
  </svg>
)

export const BlueDaisy = (p) => <Daisy a="#dbe8f7" b="#8fb4dc" c="#fff" {...p} />

export const Toran = () => (
  <div className="tor">
    {[...Array(9)].map((_, i) => (
      <div key={i} className="sw" style={{ animationDelay: i * 0.25 + 's' }}>
        <div className="st" style={{ height: 14 + Math.sin((i / 8) * Math.PI) * 34 }} />
        {i % 3 === 1 ? <Rose s={42} /> : i % 3 === 2 ? <BlueDaisy s={44} /> : <Daisy s={48} />}
      </div>
    ))}
  </div>
)
