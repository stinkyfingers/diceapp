import React from 'react';
import Store from '../stores/dice';
import DiceSets from './diceSets';
import DiceSet from './diceSet';

function Body() {
  let store = Store.useStore();
  const diceSet = store.get('diceSet');
  return (
    <div className='body'>
      {diceSet ? <DiceSet />: <DiceSets />}
    </div>
  )
}

export default Body;
