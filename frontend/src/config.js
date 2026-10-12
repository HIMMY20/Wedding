// Sab details yahin badalni hain. Baaki code ko chhune ki zaroorat nahi.
import couple from './assets/couple.png'

// Couple photo: replace public/BH.jpg with your image. No code changes needed.
// If the file is missing, the invitation falls back to the included illustration.
const hero = '/BH.png'
const pick = (files) => Object.values(files)[0] ?? null
const venue = pick(import.meta.glob('./assets/venue.{jpg,JPG,jpeg,png}', { eager: true, import: 'default' }))
export const IMG = { couple, hero, venue }

export const GROOM = 'Bhavesh'
export const BRIDE = 'Heena'
export const WEDDING_DATE = '2026-12-03T08:15:00+05:30' // countdown target

export const VENUE = {
  name: 'Khaki Resort',
  line1: 'NH-162, opposite H.P. Petrol Pump,',
  line2: 'Dist. Pali, Rajasthan',
  mapUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent(' NH. 162, Opp. HP Petrol Pump, Village Barr, Pali District, Beawar, Rajasthan 306105'),
}

export const CALENDAR_URL =
  'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' +
  encodeURIComponent('Bhavesh & Heena - Wedding') +
  '&dates=20261203T024500Z/20261203T035500Z&location=' +
  encodeURIComponent('Khaki Resort, NH-162, Pali, Rajasthan')

export const EVENTS = [
  ['Vinayak Sthapana', 'Sun, 29 Nov · 8:30 AM · Marwar Junction'],
  ['Mayra Swagat', 'Wed, 2 Dec · 10:00 AM'],
  ['Haldi', 'Wed, 2 Dec · 3:00 PM'],
  ['Sangeet', 'Wed, 2 Dec · 7:00 PM'],
  ['Shubh Parinay (Wedding)', 'Thu, 3 Dec · 8:15 – 9:25 AM'],
  ['Preetibhoj (Wedding Feast)', 'Thu, 3 Dec · 7:00 PM onwards'],
  ['Ashirvad Samaroh (Blessings)', 'Thu, 3 Dec · 7:15 PM'],
]

export const whatsapp = (text) => 'https://wa.me/?text=' + encodeURIComponent(text)

// Separate backend deployment URL. Set VITE_API_BASE_URL in frontend Vercel settings.
export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'https://backend-wedding-red.vercel.app').replace(/\/$/, '')
export const apiUrl = (path) => `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`
