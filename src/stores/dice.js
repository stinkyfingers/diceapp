import { createConnectedStore } from 'undux'
import effects from '../effects/dice';

// Create a store with an initial value.
export default createConnectedStore({
  diceSets: [],
  diceSet: {dice:[]},
  play: undefined,
  edit: undefined,
  user: undefined,
  error: undefined
}, effects)
