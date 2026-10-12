// @vitest-environment happy-dom
// The chooser adds a plan's routines and leaves any stored week alone.
import React, { act } from 'react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { createRoot } from 'react-dom/client'
import { useStore } from './store/useStore.js'
import { useUI } from './store/useUI.js'
import { loadStarterPlan, starterPlanSheet } from './sheets.jsx'

const mounted = []

const S = () => useStore.getState().S

// Renders whatever sheet is on top and returns its host element.
function renderTop() {
  const sheet = useUI.getState().sheets.at(-1)
  const host = document.createElement('div')
  document.body.appendChild(host)
  const root = createRoot(host)
  mounted.push(root)
  act(() => root.render(sheet.render(() => useUI.getState().closeSheet(sheet.id))))
  return host
}

const rowFor = (host, name) => [...host.querySelectorAll('.item')].find(el => el.querySelector('.tt')?.textContent === name)

// Opens the chooser and taps one of its rows.
function choose(name) {
  starterPlanSheet()
  const host = renderTop()
  act(() => { rowFor(host, name).click() })
}

beforeEach(() => {
  globalThis.IS_REACT_ACT_ENVIRONMENT = true
  useUI.setState({ sheets: [], toastMsg: '' })
  useStore.setState(s => ({
    S: { ...s.S, routines: [{ id: 'mine', name: 'My routine', emoji: 'star', ex: [] }], week: {}, active: null },
  }))
  document.body.innerHTML = ''
})

afterEach(() => {
  act(() => { mounted.splice(0).forEach(root => root.unmount()) })
})

describe('starter plan chooser', () => {
  it('lists every plan', () => {
    starterPlanSheet()
    const host = renderTop()
    expect([...host.querySelectorAll('.item .tt')].map(el => el.textContent))
      .toEqual(['Push / Pull / Legs', 'Upper / Lower', 'Full Body', '5×5'])
    expect(rowFor(host, 'Upper / Lower').querySelector('.ss').textContent).toBe('Upper body twice, lower body twice.')
  })

  it('adds the routines and leaves the week alone', () => {
    useStore.setState(s => ({ S: { ...s.S, week: { 0: ['mine'], 3: ['mine'] } } }))
    choose('Full Body')

    expect(useUI.getState().sheets).toHaveLength(0)
    expect(S().week).toEqual({ 0: ['mine'], 3: ['mine'] })
    expect(S().routines.map(r => r.name)).toEqual(['My routine', 'Full Body A', 'Full Body B', 'Full Body C'])
    expect(useUI.getState().toastMsg).toBe('Full Body loaded')
  })
})

describe('loadStarterPlan', () => {
  it('appends independent routines each time the same plan is loaded', () => {
    loadStarterPlan('ppl')
    const first = S().routines.slice(1).map(r => r.id)
    loadStarterPlan('ppl')
    const second = S().routines.slice(4).map(r => r.id)
    expect(S().routines).toHaveLength(7)
    expect(new Set([...first, ...second]).size).toBe(6)
    expect(second.some(id => first.includes(id))).toBe(false)
  })

  it('refuses a plan it does not know and changes nothing', () => {
    const before = structuredClone(S())
    expect(loadStarterPlan('nope')).toBe(false)
    expect(loadStarterPlan(undefined)).toBe(false)
    expect(S()).toEqual(before)
    expect(useUI.getState().toastMsg).toBe('')
  })
})
