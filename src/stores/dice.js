import { createConnectedStore } from 'undux'
import effects from '../effects/dice';

// Create a store with an initial value.
export default createConnectedStore({
  one: 0,
  two: 0,
  diceSet: undefined
}, effects)
