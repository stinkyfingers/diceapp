import React from 'react';
import Store from '../stores/dice';

function Header() {
  const store = Store.useStore();
  let setDiceSet = store.set('diceSet');
  return (
    <div className='header'>
      HEAD
      <button onClick={() => setDiceSet(null)}>View All</button>
    </div>
  );
}

export default Header;
