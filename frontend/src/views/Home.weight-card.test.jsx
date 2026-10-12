// @vitest-environment happy-dom
import React, { act } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createRoot } from 'react-dom/client'
import { useStore } from '../store/useStore.js'
import Home from './Home.jsx'

vi.mock('react-router-dom', () => ({ useNavigate: () => vi.fn() }))
vi.mock('../sheets.jsx', () => ({
  starterPlanSheet: vi.fn(), calendarSheet: vi.fn(),
}))

let host, root
beforeEach(() => {
  globalThis.IS_REACT_ACT_ENVIRONMENT = true
  host = document.createElement('div')
  document.body.appendChild(host)
  root = createRoot(host)
})
afterEach(() => { act(() => root.unmount()); host.remove() })

describe('Home', () => {
  it('does not show a body-weight card', () => {
    useStore.setState(s => ({
      S: { ...s.S, routines: [], workouts: [], bodyweight: [{ d: '2026-09-01', w: 80, t: 1 }], dayPlan: {}, week: {}, active: null },
      user: null,
    }))
    act(() => root.render(<Home />))
    expect([...host.querySelectorAll('h2')].some(el => el.textContent === 'Body weight')).toBe(false)
  })
})
