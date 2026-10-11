
import { useEffect, useState } from 'react'

import {
  Daisy,
  Rose,
  BlueDaisy,
  Toran
} from './components/Flowers'

import Petals from './components/Petals'
import Reveal from './components/Reveal'
import Scratch from './components/Scratch'
import Countdown from './components/Countdown'
import Cover from './components/Cover'
import VenueArt from './components/VenueArt'

import {
  IMG,
  GROOM,
  BRIDE,
  VENUE,
  EVENTS,
  CALENDAR_URL,
  whatsapp,
  apiUrl
} from './config'

const Photo = ({ src, fallback }) => {
  const [failed, setFailed] = useState(false)
  return (
    <div className="arch">
      {src && !failed
        ? <img src={src} alt="" onError={() => setFailed(true)} />
        : fallback}
    </div>
  )
}

function WeddingInvite() {
  const [opened, setOpened] = useState(false)
  const [revealed, setRevealed] = useState(false)

  const [guestInput, setGuestInput] = useState('')
  const [wishInput, setWishInput] = useState('')
  const [guestStatus, setGuestStatus] = useState('')

  const guest = new URLSearchParams(
    window.location.search
  ).get('name')

  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [opened])

  const link =
    `${window.location.origin}${window.location.pathname}` +
    `?name=${encodeURIComponent(guestInput.trim())}`

  const illustration = (
    <img
      className="il"
      src={IMG.couple}
      alt="Bride and groom illustration"
    />
  )

  const sendBlessings = async () => {
    const name = guestInput.trim()
    const wish = wishInput.trim()

    if (!name || !wish) {
      setGuestStatus('Please enter your name and blessings first 🌸')
      return
    }

    setGuestStatus('Saving your blessings…')
    try {
      const response = await fetch(apiUrl('/api/wishes'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message: wish })
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.detail || 'Could not save your blessings.')
      setWishInput('')
      setGuestStatus('Your blessings have been saved with love. Thank you! 💌')
    } catch (error) {
      setGuestStatus(
        error.message === 'Failed to fetch'
          ? 'Could not connect to the guestbook. Please try again in a moment.'
          : error.message || 'Could not save your blessings. Please try again.'
      )
    }
  }

  const shareInvitation = () => {
    const name = guestInput.trim()

    if (!name) {
      setGuestStatus(
        'Enter a guest name to create a personal invitation.'
      )
      return
    }

    const message =
      `Dear ${name} 🌸\n\n` +
      `You are warmly invited to the wedding of ` +
      `${GROOM} & ${BRIDE}!\n\n` +
      `Date: 3 December 2026\n` +
      `Venue: ${VENUE.name}, Pali, Rajasthan\n\n` +
      `Wedding invitation: ${link}`

    window.open(
      whatsapp(message),
      '_blank',
      'noopener,noreferrer'
    )
  }

  return (
    <div>
      {!opened && (
        <Cover
          guest={guest}
          onOpened={() => setOpened(true)}
        />
      )}

      {opened && <Petals />}

      {revealed && <Petals n={45} fast key="burst" />}

      {/* HERO */}

      <div className="hero">
        <Toran />

        <div
          className="cn"
          style={{ left: -80, bottom: -80 }}
        >
          <BlueDaisy s={260} />
        </div>

        <div
          className="cn"
          style={{ right: -80, bottom: -60 }}
        >
          <Daisy s={220} />
        </div>

        <Reveal>
          <div
            className="eb"
            style={{ marginBottom: 14 }}
          >
            Shubh Vivah · The Wedding Of
          </div>

          <Photo
            src={IMG.hero}
            fallback={illustration}
          />

          <div
            className="sc2 bl"
            style={{ marginTop: 22 }}
          >
            {GROOM}
          </div>

          <div className="eb">and</div>

          <div className="sc2 bl">{BRIDE}</div>

          <p style={{ marginTop: 12 }}>
            Thursday, 3rd December 2026
          </p>

          <p
            style={{
              opacity: 0.7,
              fontSize: 15
            }}
          >
            {VENUE.name} · Pali, Rajasthan
          </p>

          <p
            style={{
              marginTop: 10,
              fontSize: 14,
              opacity: 0.7
            }}
          >
            {guest ? `Dear ${guest}, ` : ''}
            scroll down ↓
          </p>
        </Reveal>
      </div>

      {/* FAMILY INTRODUCTION */}

      <div className="sec">
        <Reveal>
          <div className="eb">
            With the blessings of
          </div>

          <h2>
            Shri Vinayakji Maharaj & Maa Ashapura
          </h2>

          <p>
            Together with their families, request the
            pleasure of your company at the wedding of
          </p>

          <div className="card">
            <div
              className="sc2"
              style={{ fontSize: 50 }}
            >
              {GROOM}
            </div>

            <small>
              Grandson of Smt. Dagiyadevi Mishrilalji Chauhan
              <br />
              Son of Smt. Anita & Shri Yogeshji Chauhan
            </small>
          </div>

          <div className="card">
            <div
              className="sc2"
              style={{ fontSize: 50 }}
            >
              {BRIDE}
            </div>

            <small>
              Granddaughter of Kamladevi & Late Jaswantrajji Rathore
              <br />
              Daughter of Smt. Leeladevi & Shri Hemrajji Rathore
            </small>
          </div>

          <p
            style={{
              fontSize: 15,
              opacity: 0.8
            }}
          >
            Vikram Samvat 2083, Margshirsh Krishna Paksha Dashami
          </p>
        </Reveal>
      </div>

      {/* SCRATCH CARD */}

      <div className="sec">
        <Reveal>
          <h2>
            Scratch to Reveal
            <br />
            Our Special Day
          </h2>

          <Scratch
            onDone={() => setRevealed(true)}
          />

          <p
            style={{
              opacity: 0.7,
              fontSize: 15
            }}
          >
            Use your finger to scratch the card
          </p>
        </Reveal>
      </div>

      {/* COUNTDOWN */}

      <div
        className="sec"
        style={{
          background:
            'linear-gradient(#f7fafd,#e9f1fa,#f7fafd)',
          maxWidth: 'none'
        }}
      >
        <Reveal>
          <h2>Until We Say “I Do”</h2>

          <div style={{ margin: '18px 0' }}>
            <Photo
              src={IMG.hero}
              fallback={illustration}
            />
          </div>

          <Countdown />
        </Reveal>
      </div>

      {/* WEDDING EVENTS */}

      <div className="sec">
        <Reveal>
          <h2>Moments of Celebration</h2>

          <div
            className="tl"
            style={{ marginTop: 22 }}
          >
            {EVENTS.map(([title, when], i) => (
              <Reveal key={title}>
                <div className="ti">
                  {i % 2 ? (
                    <Rose s={24} />
                  ) : (
                    <Daisy s={26} />
                  )}

                  <b>{title}</b>

                  <span style={{ opacity: 0.75 }}>
                    {when}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>

      {/* VENUE */}

      <div className="sec">
        <Reveal>
          <h2>The Venue</h2>

          <div
            className="arch"
            style={{
              aspectRatio: '4/3',
              borderRadius: 22
            }}
          >
            {IMG.venue ? (
              <img
                src={IMG.venue}
                alt={VENUE.name}
              />
            ) : (
              <VenueArt />
            )}
          </div>

          <div className="card">
            <h2 style={{ fontSize: 28 }}>
              {VENUE.name}
            </h2>

            <p style={{ fontSize: 16 }}>
              {VENUE.line1}
              <br />
              {VENUE.line2}
            </p>

            <a
              className="btn"
              href={VENUE.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore Wedding Venue ↗
            </a>
          </div>

          <p
            style={{
              border: '1px solid var(--blue)',
              borderRadius: 16,
              padding: 12,
              fontSize: 15
            }}
          >
            Note: The baraat will depart on
            2 Dec 2026 at 5:30 AM from the residence
            of Shri Hemrajji Rathore (Sojat City)
            to Khaki Resort (Bar).
          </p>
        </Reveal>
      </div>

      {/* PREMIUM WEDDING GUESTBOOK */}

      <div className="sec fin">
        <Reveal>
          <div className="eb">
            A little note from us
          </div>

          <div
            className="sc2"
            style={{ margin: '12px 0' }}
          >
            Your Blessings
            <br />
            Mean the World
          </div>

          <p>
            A new chapter, two hearts and a lifetime
            of beautiful memories.
          </p>

          <p>
            Bhavesh & Heena ke naye safar ke liye
            apni shubhkamnayein chhod kar jaiye. 🌸
          </p>

          <div className="card guestbook">
            <div className="eb">
              The Wedding Guestbook
            </div>

            <h2 style={{ fontSize: 28 }}>
              Leave Your Blessings
            </h2>

            <p>
              Your heartfelt wishes will make
              our special day even more memorable.
            </p>

            <input
              type="text"
              placeholder="Your beautiful name"
              aria-label="Your name"
              value={guestInput}
              onChange={(e) => {
                setGuestInput(e.target.value)
                setGuestStatus('')
              }}
              maxLength={80}
            />

            <textarea
              placeholder="Write your blessings for the couple..."
              aria-label="Your wedding wishes"
              value={wishInput}
              onChange={(e) => {
                setWishInput(e.target.value)
                setGuestStatus('')
              }}
              rows={4}
              maxLength={1000}
            />

            <button
              className="btn w"
              type="button"
              onClick={sendBlessings}
            >
              Send Your Blessings ✨
            </button>

            {guestStatus && (
              <p
                role="status"
                aria-live="polite"
                style={{
                  fontSize: 14,
                  marginTop: 12
                }}
              >
                {guestStatus}
              </p>
            )}

            <p
              className="eb"
              style={{ marginTop: 18 }}
            >
              With love · Bhavesh & Heena
            </p>
          </div>

          {/* CALENDAR */}

          <div className="card">
            <div className="eb">
              A date to remember
            </div>

            <div className="sc2">
              03 · 12 · 2026
            </div>

            <p>
              Thursday · Pali, Rajasthan
            </p>

            <a
              className="btn g"
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Save Our Wedding Date ♡
            </a>
          </div>

          <p
            className="eb"
            style={{ marginTop: 28 }}
          >
            Two hearts · One beautiful beginning
          </p>

          <p style={{ fontSize: 14 }}>
            With love · Mishrilal, Amarchand,
            Yogesh, Bharat
          </p>
        </Reveal>
      </div>

      <div className="private-admin-link">
        <a href="/admin" aria-label="Private wedding guestbook administration">•</a>
      </div>
    </div>
  )
}

function AdminPage() {
  const [password, setPassword] = useState('')
  const [token, setToken] = useState(() => sessionStorage.getItem('wedding_admin_token') || '')
  const [wishes, setWishes] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const loadWishes = async (authToken = token) => {
    setLoading(true)
    setError('')
    try {
      const response = await fetch(apiUrl('/api/admin/wishes'), {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.detail || 'Unable to load blessings.')
      setWishes(data.wishes || [])
    } catch (err) {
      setError(err.message || 'Unable to load blessings.')
      if (err.message.toLowerCase().includes('token') || err.message.toLowerCase().includes('auth')) {
        sessionStorage.removeItem('wedding_admin_token')
        setToken('')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) loadWishes(token)
  }, [])

  const login = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await fetch(apiUrl('/api/admin/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.detail || 'Incorrect password.')
      sessionStorage.setItem('wedding_admin_token', data.token)
      setToken(data.token)
      setPassword('')
      await loadWishes(data.token)
    } catch (err) {
      setError(err.message || 'Login failed.')
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    sessionStorage.removeItem('wedding_admin_token')
    setToken('')
    setWishes([])
  }

  const removeWish = async (id) => {
    if (!window.confirm('Delete this blessing permanently?')) return
    try {
      const response = await fetch(apiUrl(`/api/admin/wishes/${id}`), {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.detail || 'Delete failed.')
      setWishes((items) => items.filter((item) => item.id !== id))
    } catch (err) {
      setError(err.message || 'Delete failed.')
    }
  }

  return (
    <main className="admin-page">
      <div className="admin-panel">
        <p className="eb">B H  ·  H Wedding</p>
        <h1>Private Guestbook</h1>
        <p className="admin-subtitle">Blessings shared by your wedding guests</p>
        {!token ? (
          <form onSubmit={login} className="admin-login">
            <label htmlFor="admin-password">Administrator password</label>
            <input id="admin-password" type="password" autoComplete="current-password"
              value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button className="btn w" type="submit" disabled={loading}>
              {loading ? 'Please wait…' : 'Open Guestbook'}
            </button>
          </form>
        ) : (
          <>
            <div className="admin-actions">
              <span>{wishes.length} blessing{wishes.length === 1 ? '' : 's'}</span>
              <button className="btn g" type="button" onClick={() => loadWishes()} disabled={loading}>Refresh</button>
              <button className="btn" type="button" onClick={logout}>Log out</button>
            </div>
            {loading && <p>Loading blessings…</p>}
            {!loading && wishes.length === 0 && <p>No blessings have been submitted yet.</p>}
            <div className="wish-list">
              {wishes.map((wish) => (
                <article className="wish-item" key={wish.id}>
                  <div className="wish-meta">
                    <strong>{wish.name}</strong>
                    <time>{new Date(wish.created_at).toLocaleString()}</time>
                  </div>
                  <p>{wish.message}</p>
                  <button type="button" className="delete-wish" onClick={() => removeWish(wish.id)}>Delete</button>
                </article>
              ))}
            </div>
          </>
        )}
        {error && <p role="alert" className="admin-error">{error}</p>}
        <a className="admin-back" href="/">← Back to invitation</a>
      </div>
    </main>
  )
}

export default function App() {
if (window.location.pathname.replace(/\/+$/, '') === '/admin') {
  return <AdminPage />
}
  
  return <WeddingInvite />
}
