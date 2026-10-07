// Rest-over alert payload (used by tests and leftover native-shaped callers).
// The browser rest timer lives in store/useUI.js; there is no Capacitor alarm.
import { t } from './i18n-core.js'
import { ACCENTS, ACCENT_INK, argb } from './format.js'

export const REST_ALERT_ID = 42
export const REST_CHANNEL_ID = 'rest-over'
export const REST_QUIET_CHANNEL_ID = 'rest-over-quiet'

export function accentColors(key) {
  const k = ACCENTS[key] ? key : 'lime'
  return { accent: argb(ACCENTS[k]), ink: argb(ACCENT_INK[k]) }
}

export function buildRestAlert({ at, title, countdownTitle, totalSec, accent, sound = true, vibrate = true, now = Date.now() } = {}) {
  if (typeof at !== 'number' || !(at > now)) return null
  const totalMs = Math.max(1000, Math.round((totalSec > 0 ? totalSec : (at - now) / 1000) * 1000))
  const colors = accentColors(accent)
  return {
    id: REST_ALERT_ID,
    channelId: vibrate ? REST_CHANNEL_ID : REST_QUIET_CHANNEL_ID,
    title: title || t('Rest over — next set!'),
    countdownTitle: countdownTitle || t('Rest'),
    pause: t('Pause'),
    resume: t('Resume'),
    minus: '− 15s',
    plus: '+ 15s',
    skip: t('Skip'),
    accent: colors.accent,
    ink: colors.ink,
    totalMs,
    at,
    allowWhileIdle: true,
    sound: !!sound,
    vibrate: !!vibrate,
    localOnly: false,
    visibility: 'public',
    importance: 'high',
  }
}

export function armRestAlert() { return Promise.resolve(false) }
export function disarmRestAlert() {}
export function holdRestAlert() {}
export function bindNativeRest() {}
export function setRestAccent() {}
