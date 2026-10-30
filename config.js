// ---- EDIT ME ----
// Applications are sent to this Formspree form (see formspree.io > your form).
export const FORM_ENDPOINT = 'https://formspree.io/f/mdaqnkwk'

export const BOOKING = {
  monthsAhead: 24,   // how many months the calendar allows
  skipWeekends: false,
  startHour: 0,      // 0 = 12:00 AM
  endHour: 23,       // 23 = 11:00 PM
  timezoneLabel: 'GMT+1',
}

// ---- Application form options ----
export const COACHING_TYPES = ['Weight loss', 'Hormonal', 'Nutrition', 'Fitness', 'Other']
// DRAFT: you did not give options for this question. Edit these to your real price ranges.
export const PRICE_OPTIONS = ['Below N50K', 'N50K - N100K', 'N100K - N300K', 'N300K - N500K', 'Above N500K']
export const REVENUE_OPTIONS = ['N0K - N200K', 'N200K - N500K', 'N500K - N1M', 'Above N1M']
export const INVEST_FOLLOWUP = ['Below N200k', 'N200k or slightly above']
export const INVEST_BLOCKED = 'Below N200k' // choosing this (after answering No) blocks submission

import shot1 from './screenshot-1.png'
import shot2 from './screenshot-2.jpg'
export const IMAGES = { screenshot1: shot1, screenshot2: shot2 }
