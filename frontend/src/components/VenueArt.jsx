// Venue ki photo na ho to ye illustration dikhta hai.
export default function VenueArt() {
  return (
    <svg viewBox="0 0 300 400" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cfe0f1" />
          <stop offset="1" stopColor="#fbeef0" />
        </linearGradient>
      </defs>
      <rect width="300" height="400" fill="url(#sk)" />
      <circle cx="220" cy="120" r="34" fill="#f7e3b0" />
      <path d="M0 280Q90 220 190 270T300 250V400H0Z" fill="#b9d6b4" />
      <path d="M0 330Q120 280 300 330V400H0Z" fill="#8fbf8f" />
      <path d="M110 270l40-46 40 46z" fill="#fff" />
      <rect x="118" y="270" width="64" height="32" fill="#f3e8da" />
      <rect x="143" y="280" width="14" height="22" fill="#b8955a" />
    </svg>
  )
}
