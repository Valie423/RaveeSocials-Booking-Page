import { useState } from 'react'
import { BOOKING, NEXT_STEP_URL } from './config'
import { getTimes, keyOf } from './bookingApi'
import Calendar from './Calendar'

const fmt = (d, o) => d.toLocaleDateString('en-GB', o)

export default function Booking() {
  const [date, setDate] = useState(null)
  const [time, setTime] = useState(null)
  const times = getTimes()

  function pickDate(d) {
    setDate(d); setTime(null)
    if (window.innerWidth <= 760) setTimeout(() => document.getElementById('times-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
  }
  function next() {
    let url = NEXT_STEP_URL
    try {
      const u = new URL(NEXT_STEP_URL)
      u.searchParams.set('date', keyOf(date)); u.searchParams.set('time', time); u.searchParams.set('timezone', BOOKING.timezoneLabel)
      url = u.toString()
    } catch { /* fall back to the plain link */ }
    window.location.assign(url)
  }

  return (
    <section id="book" className="book wrap">
      <h2>Book your call</h2>
      <p className="muted c">Choose a date, then a time.</p>
      <div className="pick">
        <div className="panel"><h4>1 · Date</h4><Calendar value={date} onPick={pickDate} /></div>
        <div className="panel" id="times-panel"><h4>2 · Time <em>({BOOKING.timezoneLabel})</em></h4>
          {!date ? <p className="muted empty">Select a date to see available times.</p> : <>
            <p className="slot">{fmt(date, { weekday: 'long', day: 'numeric', month: 'long' })}</p>
            <div className="times" role="radiogroup" aria-label="Select a time">
              {times.map(t => <button type="button" key={t} role="radio" aria-checked={time === t} className={time === t ? 'on' : ''} onClick={() => setTime(t)}>{t}</button>)}
            </div></>}
        </div>
      </div>
      <div className="c">
        <button className="btn" disabled={!date || !time} onClick={next}>Continue</button>
        {!(date && time) && <p className="muted">{!date ? 'Pick a date first.' : 'Now pick a time from the list.'}</p>}
      </div>
    </section>
  )
}
