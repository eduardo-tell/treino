import { afterEach, describe, expect, test } from 'vitest'
import de from '../exercise-names/de.js'
import { EXDB } from './exercises-data.js'
import {
  EXERCISE_NAME_LANGS, _setLangState, derivePack, exerciseNameFor, exerciseNameSearchText
} from './i18n-core.js'

describe('German exercise names', () => {
  const byId = new Map(EXDB.map(exercise => [exercise.id, exercise]))
  const staged = Object.keys(de).map(id => byId.get(id)).filter(Boolean)
  afterEach(() => _setLangState('en', {}, null, null))

  test('covers a staged subset of the catalogue', () => {
    expect(staged.length).toBeGreaterThan(0)
    expect(Object.keys(de)).toHaveLength(staged.length)
    expect(EXERCISE_NAME_LANGS).toContain('de')
  })

  test('contains a non-empty translation for every packed exercise', () => {
    for (const exercise of staged) expect(de[exercise.id]?.trim(), exercise.id).toBeTruthy()
  })

  test('shows German first and preserves the canonical English title', () => {
    const exercise = staged[0]
    _setLangState('de', {}, null, de)
    expect(exerciseNameFor(exercise)).toBe(`${de[exercise.id]} (${exercise.n})`)
    expect(exerciseNameSearchText(exercise)).toContain(de[exercise.id])
    expect(exerciseNameSearchText(exercise)).toContain(exercise.n)
  })

  test('falls back to the English title for a body-weight exercise', () => {
    const bodyWeight = EXDB.find(exercise => exercise.eq === 'body weight')
    _setLangState('de', {}, null, de)
    expect(exerciseNameFor(bodyWeight)).toBe(bodyWeight.n)
  })

  test('de-CH derives the Swiss spelling from this pack', () => {
    const withSharpS = Object.entries(de).filter(([, name]) => name.includes('ß'))
    expect(withSharpS.length).toBeGreaterThan(0)
    const swiss = derivePack('de-CH', de)
    for (const [id, name] of withSharpS) {
      expect(swiss[id], id).toBe(name.replaceAll('ß', 'ss'))
      expect(swiss[id], id).not.toContain('ß')
    }
  })

  test('never translates custom exercises or changes other languages', () => {
    const custom = { id: 'custom-1', n: 'Meine Übung' }
    _setLangState('de', {}, null, de)
    expect(exerciseNameFor(custom)).toBe('Meine Übung')
    _setLangState('en', {}, null, null)
    expect(exerciseNameFor(staged[0])).toBe(staged[0].n)
  })
})
