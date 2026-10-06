import { BOOKING } from './config'

export const keyOf = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
export const hourLabel = h => `${h % 12 || 12}:00 ${h < 12 ? 'AM' : 'PM'}`
export function isAvailable(d) {
  const t = new Date(); t.setHours(0, 0, 0, 0)
  return d > t && !(BOOKING.skipWeekends && [0, 6].includes(d.getDay()))
}
// Returns [{time, taken}]. All hours are open; connect a calendar later to mark taken times.
export async function getSlots() {
  const out = []
  for (let h = BOOKING.startHour; h <= BOOKING.endHour; h++) out.push({ time: hourLabel(h), taken: false })
  return out
}
export async function submitBooking({ name, email, handle, date, time }) {
  const res = await fetch(BOOKING.endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ _subject: `New call booking: ${name} · ${date} ${time} (GMT+1)`, name, email, instagram_tiktok: handle, date, time, timezone: 'GMT+1' }),
  })
  if (!res.ok) throw new Error('Could not save your booking. Please try again.')
}
