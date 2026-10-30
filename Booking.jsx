import { useState } from 'react'
import { BOOKING, COACHING_TYPES, INVEST_BLOCKED, INVEST_FOLLOWUP, PRICE_OPTIONS, REVENUE_OPTIONS } from './config'
import { getTimes, keyOf, submitApplication } from './bookingApi'
import Calendar from './Calendar'

const fmt = (d, o) => d.toLocaleDateString('en-GB', o)
const PREVIEW = import.meta.env.VITE_PREVIEW // preview-only shortcut bar; never set on Vercel
const EMPTY = { name: '', email: '', phone: '', ig: '', type: '', price: '', revenue: '', canInvest: '', overall: '' }

function Choices({ legend, name, options, value, onChange, cols }) {
  return (
    <fieldset className="q">
      <legend>{legend} *</legend>
      <div className={'choices' + (cols === 2 ? ' two' : '')}>
        {options.map(o => (
          <label className="choice" key={o}>
            <input type="radio" name={name} value={o} required checked={value === o} onChange={() => onChange(o)} />
            <span>{o}</span>
          </label>))}
      </div>
    </fieldset>
  )
}

export default function Booking() {
  const [step, setStep] = useState('pick') // pick | apply | done
  const [date, setDate] = useState(null)
  const [time, setTime] = useState(null)
  const [f, setF] = useState(EMPTY)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const times = getTimes()
  const set = (k, v) => setF(p => ({ ...p, [k]: v }))
  const blocked = f.canInvest === 'No' && f.overall === INVEST_BLOCKED
  const go = s => { setStep(s); setTimeout(() => document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' }), 30) }

  function jump(s) { const d = new Date(); d.setDate(d.getDate() + 1); setDate(d); setTime('10:00 AM'); go(s) } // preview only

  function pickDate(d) {
    setDate(d); setTime(null)
    if (window.innerWidth <= 760) setTimeout(() => document.getElementById('times-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
  }

  async function submit(e) {
    e.preventDefault()
    if (blocked) return
    setBusy(true); setErr('')
    try {
      await submitApplication({
        _subject: `New application: ${f.name} · ${keyOf(date)} ${time} (${BOOKING.timezoneLabel})`,
        name: f.name, email: f.email, phone: f.phone, instagram_handle: f.ig,
        coaching_type: f.type, offer_price: f.price, monthly_revenue: f.revenue,
        can_invest_200k_in_ads: f.canInvest, overall_investment: f.canInvest === 'No' ? f.overall : 'n/a (answered Yes)',
        requested_call_date: keyOf(date), requested_call_time: time, timezone: BOOKING.timezoneLabel,
      })
      go('done')
    } catch (x) { setErr(x.message) } finally { setBusy(false) }
  }

  return (
    <section id="book" className="book wrap">
      {step === 'pick' && <>
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
          <button className="btn" disabled={!date || !time} onClick={() => go('apply')}>Continue</button>
          {!(date && time) && <p className="muted">{!date ? 'Pick a date first.' : 'Now pick a time from the list.'}</p>}
        </div>
      </>}

      {step === 'apply' && <form className="apply" onSubmit={submit}>
        <h2>Let’s See If Your Offer Qualifies For This Strategy</h2>
        <p className="lead c"><strong>This application will take 10 seconds.</strong><br />If you qualify, your booked call will be confirmed where we’ll map out a plan to scale your coaching business.</p>
        <p className="slot">Requested call: {fmt(date, { weekday: 'long', day: 'numeric', month: 'long' })} · {time} ({BOOKING.timezoneLabel})</p>

        <label className="field">Full name *<input required placeholder=" " autoComplete="name" value={f.name} onChange={e => set('name', e.target.value)} /></label>
        <label className="field">Email address *<input required type="email" placeholder=" " autoComplete="email" value={f.email} onChange={e => set('email', e.target.value)} /></label>
        <label className="field">Phone Number *<input required type="tel" inputMode="tel" placeholder=" " autoComplete="tel" value={f.phone} onChange={e => set('phone', e.target.value)} /></label>
        <label className="field">IG handle *<input required placeholder="@yourhandle" autoComplete="off" autoCapitalize="none" spellCheck="false" value={f.ig} onChange={e => set('ig', e.target.value)} /></label>

        <Choices legend="What type of health coaching do you do?" name="type" options={COACHING_TYPES} value={f.type} onChange={v => set('type', v)} />
        <Choices legend="What's the price of the offer you want to promote?" name="price" options={PRICE_OPTIONS} value={f.price} onChange={v => set('price', v)} />
        <Choices legend="What is your brand's average monthly revenue?" name="revenue" options={REVENUE_OPTIONS} value={f.revenue} onChange={v => set('revenue', v)} />
        <Choices legend="Are you in a place where you can invest at least N200K in paid ads to get more clients?" name="canInvest" options={['Yes', 'No']} cols={2} value={f.canInvest}
          onChange={v => setF(p => ({ ...p, canInvest: v, overall: v === 'Yes' ? '' : p.overall }))} />
        {f.canInvest === 'No' &&
          <Choices legend="How much are you willing to invest overall in getting your desired result?" name="overall" options={INVEST_FOLLOWUP} value={f.overall} onChange={v => set('overall', v)} />}

        {blocked && <p className="note" role="alert">Thank you for being upfront. This strategy might not be efficient for you. You’re welcome to book the call when you’re financially ready.</p>}
        {err && <p className="error" role="alert">{err}</p>}
        <button className="btn" disabled={busy || blocked}>{busy ? 'Submitting…' : 'Submit Application'}</button>
        <button type="button" className="link" onClick={() => go('pick')}>← Change date or time</button>
      </form>}

      {step === 'done' && <div className="done">
        <h2>Thank you for submitting!</h2>
        <p className="lead">You will receive a confirmation mail shortly.</p>
      </div>}
      {PREVIEW && <div className="pvbar"><b>Preview</b>
        <button onClick={() => go('pick')}>1 · Date &amp; time</button><button onClick={() => jump('apply')}>2 · Application</button><button onClick={() => jump('done')}>3 · Thank you</button></div>}
    </section>
  )
}
