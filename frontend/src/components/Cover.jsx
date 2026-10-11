import { useState } from 'react'
import { Daisy, Rose, BlueDaisy } from './Flowers'
import { GROOM, BRIDE } from '../config'

// Curtains band dikhte hain; "Open Invitation" dabane pe khulte hain.
export default function Cover({ guest, onOpened }) {
  const [open, setOpen] = useState(false)
  const handle = () => {
    setOpen(true)
    setTimeout(onOpened, 2100)
  }
  return (
    <div className={'cv' + (open ? ' o' : '')}>
      <div className="dr dl" />
      <div className="dr dq" />
      <div className="mid">
        <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 10 }}>
          <Daisy s={58} />
          <Rose s={50} />
          <BlueDaisy s={58} />
        </div>
        <div className="eb">{guest ? `Dear ${guest}, you are invited` : 'You are invited'}</div>
        <div className="sc2" style={{ margin: '8px 0 4px' }}>
          {GROOM} & {BRIDE}
        </div>
        <p style={{ marginBottom: 18 }}>to celebrate their wedding</p>
        <button className="btn" onClick={handle}>
          Open Invitation
        </button>
      </div>
    </div>
  )
}
