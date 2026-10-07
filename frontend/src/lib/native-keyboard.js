// Browser keyboard inset helpers. On a phone browser the visual viewport already shrinks;
// --native-kb is only set if something on the page writes it.
export const NATIVE_KEYBOARD_EVENT = 'opengym-native-keyboard'

export function nativeKeyboardHeight(doc = typeof document !== 'undefined' ? document : null) {
  if (!doc?.documentElement) return 0
  const raw = getComputedStyle(doc.documentElement).getPropertyValue('--native-kb')
  const n = parseFloat(raw)
  return Number.isFinite(n) && n > 0 ? n : 0
}

export function visibleBottom(win = typeof window !== 'undefined' ? window : null) {
  if (!win) return 0
  const viewport = win.visualViewport
  const visualBottom = (viewport?.offsetTop || 0) + (viewport?.height || win.innerHeight)
  return Math.min(visualBottom, win.innerHeight - nativeKeyboardHeight(win.document))
}

export function revealAboveKeyboard(input, pad = 16) {
  const sheet = input?.closest?.('.sheet')
  if (!sheet) return 0
  const win = input.ownerDocument.defaultView
  const bottom = visibleBottom(win)
  const rect = input.getBoundingClientRect()
  const overflow = rect.bottom - (bottom - pad)
  if (overflow <= 0) return 0
  sheet.scrollTop += overflow
  return overflow
}

export function startNativeKeyboard() {
  if (typeof window === 'undefined') return () => {}
  const onFocus = ev => {
    if (nativeKeyboardHeight() <= 0) return
    const el = ev.target
    if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')) revealAboveKeyboard(el)
  }
  const onKb = () => {
    if (nativeKeyboardHeight() <= 0) return
    const el = document.activeElement
    if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')) revealAboveKeyboard(el)
  }
  document.addEventListener('focusin', onFocus)
  window.addEventListener(NATIVE_KEYBOARD_EVENT, onKb)
  return () => {
    document.removeEventListener('focusin', onFocus)
    window.removeEventListener(NATIVE_KEYBOARD_EVENT, onKb)
  }
}
