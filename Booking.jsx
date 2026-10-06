import { useEffect, useState } from 'react'
import { BOOKING, GOOGLE_FORM_URL } from './config'
import { getSlots, isAvailable, keyOf, submitBooking } from './bookingApi'
import Calendar from './Calendar'

const PREVIEW = import.meta.env.VITE_PREVIEW
const fmt = (d, o) => d.toLocaleDateString('en-GB', o)

export default function Booking() {
  const [step, setStep] = useState('pick') // pick | info | done
  const [date, setDate] = useState(null)
  const [slots, setSlots] = useState([])
  const [time, setTime] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', handle: '' })
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  useEffect(() => { if (date) { setTime(null); getSlots(date).then(s => { setSlots(s); if (window.innerWidth <= 760) setTimeout(() => document.getElementById('times-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80) }) } }, [date])
  const go = s => { setStep(s); document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' }) }

  function jump(s) { // PREVIEW ONLY
    const d = new Date(); do d.setDate(d.getDate() + 1); while (!isAvailable(d))
    setDate(d); setTimeout(() => setTime('10:00 AM'), 60); setForm({ name: 'Sample Name', email: 'sample@email.com', handle: '@sample' }); go(s)
  }

  async function confirm(e) {
    e.preventDefault(); setBusy(true); setErr('')
    try { await submitBooking({ ...form, date: keyOf(date), time }); go('done') }
    catch (x) { setErr(x.message) } finally { setBusy(false) }
  }

  return (
    <section id="book" className="book wrap">
      {step === 'pick' && <>
        <h2>Book your call</h2>
        <p className="muted c">Choose a date, then a time.</p>
        <div className="pick">
          <div className="panel"><h4>1 · Date</h4><Calendar value={date} onPick={setDate} /></div>
          <div className="panel" id="times-panel"><h4>2 · Time <em>({BOOKING.timezoneLabel})</em></h4>
            {!date ? <p className="muted empty">Select a date to see available times.</p> : <>
              <p className="slot">{fmt(date, { weekday: 'long', day: 'numeric', month: 'long' })}</p>
              <div className="times" role="radiogroup" aria-label="Select a time">
                {slots.map(s => <button type="button" key={s.time} role="radio" aria-checked={time === s.time} disabled={s.taken}
                  className={time === s.time ? 'on' : ''} onClick={() => setTime(s.time)}>{s.time}</button>)}
              </div></>}
          </div>
        </div>
        <div className="c"><button className="btn" disabled={!date || !time} onClick={() => go('info')}>Continue</button>
          {!(date && time) && <p className="muted">{!date ? 'Pick a date first.' : 'Now pick a time from the list.'}</p>}</div>
      </>}

      {step === 'info' && <form onSubmit={confirm} className="info">
        <h2>Before we lock it in...</h2>
        <p className="lead c">Tell me where I can find you so I can take a quick look at your brand before our call.</p>
        <p className="slot">{fmt(date, { weekday: 'long', day: 'numeric', month: 'long' })} · {time} ({BOOKING.timezoneLabel})</p>
        <label>Name<input required autoComplete="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></label>
        <label>Email<input required type="email" autoComplete="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></label>
        <label>Instagram / TikTok handle<input required placeholder="@yourhandle" value={form.handle} onChange={e => setForm({ ...form, handle: e.target.value })} /></label>
        {err && <p className="error" role="alert">{err}</p>}
        <button className="btn" disabled={busy}>{busy ? 'Confirming…' : 'Confirm Booking'}</button>
        <button type="button" className="link" onClick={() => go('pick')}>← Change date or time</button>
      </form>}

      {step === 'done' && <div className="done">
        <h2>You're booked!</h2>
        <p className="lead"><strong>Your call is confirmed.</strong></p>
        <p className="slot">{fmt(date, { weekday: 'long', day: 'numeric', month: 'long' })} · {time} ({BOOKING.timezoneLabel})</p>
        <p>Before we speak, I'd love to understand a little more about your brand, what you're currently doing and where you're trying to get to.</p>
        <p>There's a short questionnaire that will help me prepare for our call.</p>
        <p><strong>It takes about 5 minutes.</strong></p>
        <a className="btn" href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer">Fill Out the Pre-Call Form →</a>
      </div>}

      {PREVIEW && <div className="pvbar"><b>Preview</b>
        <button onClick={() => go('pick')}>Page 1 · Pick</button><button onClick={() => jump('info')}>Page 2 · Info</button><button onClick={() => jump('done')}>Page 3 · Booked</button></div>}
    </section>
  )
}
