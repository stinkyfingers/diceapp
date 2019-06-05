import React, {useState, useEffect} from 'react';
import Store from '../stores/dice';
import {getDiceSets} from '../api';
import { Link } from 'react-router-dom';

// Re-render the component when the store updates.
export const DiceSets = () => {
  let store = Store.useStore();
  const [diceSets, setDiceSets] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    let userId = ''
    if (user) {
      userId = user.id;
    }
    getDiceSets(userId).then((resp) => {
      setDiceSets(resp.data);
    });
  }, []);

  const handleDiceSet = (diceSet) => {
    store.set('diceSet')(diceSet)
  }

  return (
    <ul className='diceSets'>
      {diceSets.map((d) => {
        return (
          <li key={d.id}>
            <span className='diceSetName'>{d.name}</span>
            <span className='diceSetPlay'><Link onClick={() => handleDiceSet(d)} to={`/diceSet/${d.id}`}>View</Link></span>
            {user && user.id === d.userId ?
              <span className='diceSetEdit'><Link onClick={() => handleDiceSet(d)} to={`/edit/${d.id}`}>Edit</Link></span>
            : null}
          </li>
        );
      })}
    </ul>
  );
}
