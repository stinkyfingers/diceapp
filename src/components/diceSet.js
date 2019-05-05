import React from 'react';
import Store from '../stores/dice';


function DiceSet() {
  let store = Store.useStore();
  const diceSet = store.get('diceSet')
  return (
    <div className='diceSet'>
      {diceSet.id}
    </div>
  );

}

export default DiceSet;
