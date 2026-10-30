import { BOOKING } from './config'

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
