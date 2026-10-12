// @vitest-environment happy-dom
import { act } from 'react'
import { beforeEach, describe, expect, it } from 'vitest'
import { useStore } from './store/useStore.js'
import { useUI } from './store/useUI.js'
import { startFlow } from './sheets.jsx'

// Start goes straight into the session. There is no weigh-in, and the session carries no body weight.

describe('a workout starts without a weigh-in', () => {
  beforeEach(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true
    useUI.setState({ sheets: [], toasts: [] })
    useStore.setState(s => ({ S: { ...s.S, active: null, routines: [], workouts: [], bodyweight: [], weighIn: true } }))
  })

  it('begins the session at once, with no sheet and no body weight', () => {
    act(() => startFlow([]))
    expect(useUI.getState().sheets).toHaveLength(0)
    const { active } = useStore.getState().S
    expect(active).not.toBeNull()
    expect(active.bw).toBeNull()
    expect(active.routineIds).toEqual([])
  })

  it('does the same when an older profile still has the weigh-in switch on', () => {
    useStore.setState(s => ({ S: { ...s.S, weighIn: true, active: null } }))
    act(() => startFlow(['r1']))
    expect(useUI.getState().sheets).toHaveLength(0)
    expect(useStore.getState().S.active.bw).toBeNull()
    expect(useStore.getState().S.active.routineIds).toEqual([])
  })
})
