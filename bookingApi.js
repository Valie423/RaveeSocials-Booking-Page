import { BOOKING, FORM_ENDPOINT } from './config'

export const keyOf = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
export const hourLabel = h => `${h % 12 || 12}:00 ${h < 12 ? 'AM' : 'PM'}`
// "Today" in Nigerian time (GMT+1), so the calendar matches the call times shown
export function today() {
  try {
    const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Lagos', year: 'numeric', month: '2-digit', day: '2-digit' })
      .formatToParts(new Date()).filter(x => x.type !== 'literal').map(x => [x.type, x.value]))
    return new Date(+p.year, +p.month - 1, +p.day)
  } catch { const t = new Date(); t.setHours(0, 0, 0, 0); return t }
}
export function isAvailable(d) {
  return d > today() && !(BOOKING.skipWeekends && [0, 6].includes(d.getDay()))
}
// First day that can be booked (the calendar opens on this day's month)
export function firstBookable() {
  const d = today()
  do d.setDate(d.getDate() + 1); while (!isAvailable(d))
  return d
}
export function getTimes() {
  const out = []
  for (let h = BOOKING.startHour; h <= BOOKING.endHour; h++) out.push(hourLabel(h))
  return out
}

export async function submitApplication(payload) {
  let res
  try {
    res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    // The browser could not reach the server at all (shows as "Failed to fetch")
    throw new Error('We couldn’t reach the server. Please check your internet connection, turn off any ad blocker for this page, and try again.')
  }
  if (!res.ok) {
    const j = await res.json().catch(() => ({}))
    const detail = (j.errors || []).map(e => e.message).filter(Boolean).join(' ')
    throw new Error(detail || 'Your application could not be sent. Please check your details and try again.')
  }
}
