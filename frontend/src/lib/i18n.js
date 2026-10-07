// Browser-only shell of the i18n module. The runtime-agnostic state and readers live
// in i18n-core.js (plain Node-loadable); this file pins the product UI to Brazilian
// Portuguese and exposes the React subscription hook `useLang`.

import { useSyncExternalStore } from 'react'
import {
  LANGS, INSTR_LANGS, EXERCISE_NAME_LANGS, DATE_LOCALES, DERIVED_LOCALES, RTL_LANGS,
  getLang, dateLocale, t, instrFor, exerciseNameFor, exerciseNameSearchText, getVersion,
  baseLang, _setLangState, exerciseNameClass
} from './i18n-core.js'
import ptBR from '../locales/pt-BR.js'
import ptBRInstr from '../instr/pt-BR.js'
import ptBRNames from '../exercise-names/pt-BR.js'

export {
  LANGS, INSTR_LANGS, EXERCISE_NAME_LANGS, DATE_LOCALES, DERIVED_LOCALES, RTL_LANGS,
  getLang, dateLocale, t, instrFor, exerciseNameFor, exerciseNameSearchText, exerciseNameClass, baseLang
}

const subs = new Set()
const notify = () => { subs.forEach(f => f()) }

function applyPortuguese() {
  _setLangState('pt-BR', ptBR, ptBRInstr, ptBRNames, false, false)
  if (typeof document !== 'undefined') {
    document.documentElement.lang = 'pt-BR'
    document.documentElement.dir = 'ltr'
  }
}

// The product is Portuguese-only: ignore any requested language or English-name switches.
export async function setLang() {
  if (getLang() === 'pt-BR' && getVersion() > 0) return
  applyPortuguese()
  notify()
}

// First paint in the browser is already Portuguese. Vitest keeps the English core
// default so component tests that assert source strings still match.
if (!import.meta.env.VITEST) applyPortuguese()

export function useLang() {
  return useSyncExternalStore(fn => { subs.add(fn); return () => subs.delete(fn) }, getVersion)
}
