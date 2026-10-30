import Icon from './Icon.jsx'
import { NumberField } from './ui.jsx'

export function SetHeader({ weightLabel, repsLabel, effortLabel, timed = false, perSide = false, plain = false }) {
  return <div className={'sethead' + (effortLabel ? ' eff3' : '') + (timed ? ' timed' : '') + (perSide ? ' per-side' : '') + (plain ? ' plain' : '')}>
    <span className="n-sp" />
    <span className="w-sp">{weightLabel}</span>
    {repsLabel && <span className="r-sp">{repsLabel}</span>}
    {effortLabel && <span className="eff-sp">{effortLabel}</span>}
    {timed && <span className="ck-sp" />}
    <span className="ck-sp" />
  </div>
}

export function SetStepperCell({ kind, value, decimal, nullable = false, plain = false, onChange, onDecrease, onIncrease, decreaseLabel, increaseLabel }) {
  return <div className={'stp ' + kind + (plain ? ' plain' : '')}>
    {!plain && <button aria-label={decreaseLabel} onClick={onDecrease}><Icon name="minus" /></button>}
    <span className="val"><NumberField decimal={decimal} nullable={nullable} value={value ?? ''} onChange={onChange} /></span>
    {!plain && <button aria-label={increaseLabel} onClick={onIncrease}><Icon name="plus" /></button>}
  </div>
}
