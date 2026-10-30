import { BOOKING, FORM_ENDPOINT } from './config'

export const keyOf = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
export const hourLabel = h => `${h % 12 || 12}:00 ${h < 12 ? 'AM' : 'PM'}`
export function isAvailable(d) {
  const t = new Date(); t.setHours(0, 0, 0, 0)
  return d > t && !(BOOKING.skipWeekends && [0, 6].includes(d.getDay()))
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
