import { useState } from 'react'
import { BOOKING } from './config'
import { isAvailable, keyOf } from './bookingApi'

const DOW = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const FULL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export default function Calendar({ value, onPick }) {
  const now = new Date()
  const minIdx = now.getFullYear() * 12 + now.getMonth()
  const maxIdx = minIdx + BOOKING.monthsAhead - 1
  const [idx, setIdx] = useState(minIdx)
  const [view, setView] = useState('days') // days | months | years
  const y = Math.floor(idx / 12), m = idx % 12
  const years = []; for (let i = Math.floor(minIdx / 12); i <= Math.floor(maxIdx / 12); i++) years.push(i)
  const clamp = i => Math.min(maxIdx, Math.max(minIdx, i))
  const shift = n => setIdx(clamp(idx + n))
  const first = new Date(y, m, 1), days = new Date(y, m + 1, 0).getDate(), off = (first.getDay() + 6) % 7

  return (
    <div className="cal">
      <div className="cal-head">
        <button type="button" className="cal-arrow" aria-label="Previous month" disabled={idx <= minIdx} onClick={() => shift(-1)}>‹</button>
        <div className="cal-title">
          <button type="button" className="cal-link" aria-expanded={view === 'months'} onClick={() => setView(view === 'months' ? 'days' : 'months')}>{FULL[m]} ▾</button>
          <button type="button" className="cal-link" aria-expanded={view === 'years'} onClick={() => setView(view === 'years' ? 'days' : 'years')}>{y} ▾</button>
        </div>
        <button type="button" className="cal-arrow" aria-label="Next month" disabled={idx >= maxIdx} onClick={() => shift(1)}>›</button>
      </div>

      {view === 'days' && (
        <div className="cal-grid" role="grid" aria-label={`${FULL[m]} ${y}`}>
          {DOW.map(d => <span className="dow" key={d}>{d}</span>)}
          {Array.from({ length: off }, (_, i) => <span key={'b' + i} />)}
          {Array.from({ length: days }, (_, i) => {
            const d = new Date(y, m, i + 1), ok = isAvailable(d), on = value && keyOf(value) === keyOf(d)
            return <button type="button" key={i} disabled={!ok} aria-pressed={!!on} className={on ? 'on' : ''} onClick={() => onPick(d)}>{i + 1}</button>
          })}
        </div>)}

      {view === 'months' && (
        <div className="cal-pick">
          {MONTHS.map((n, i) => { const k = y * 12 + i; return (
            <button type="button" key={n} disabled={k < minIdx || k > maxIdx} className={i === m ? 'on' : ''} onClick={() => { setIdx(k); setView('days') }}>{n}</button>) })}
        </div>)}

      {view === 'years' && (
        <div className="cal-pick">
          {years.map(yr => <button type="button" key={yr} className={yr === y ? 'on' : ''} onClick={() => { setIdx(clamp(yr * 12 + m)); setView('days') }}>{yr}</button>)}
        </div>)}
    </div>
  )
}
