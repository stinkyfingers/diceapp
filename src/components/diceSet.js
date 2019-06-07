import React, { useState, useEffect } from 'react';
import Store from '../stores/dice';
import { getDiceSet } from '../api';
import '../css/diceSet.css';

function rollDice(diceSet) {
  let result = [];
  diceSet.dice.forEach((die) => {
    const term = randomSide(die.sides).value
    result.push(<span key={term}>{term}</span>);
  });
  return result
}

function randomSide(sides) {
  return sides[Math.floor(Math.random() * sides.length)];
}

function renderRoll(terms) {
  return (<div className='result'>{terms}</div>)
}

export const DiceSet = props => {
  let store = Store.useStore();
  const [diceSet, setDiceSet] = useState(store.get('diceSet'));
  useEffect(() => {
    if (diceSet._id) return;
    getDiceSet({id: props.match.params.id}).then((resp) => {
      setDiceSet(resp.data);
    });
  }, [diceSet._id, props]);
  const [roll, setRoll] = useState(null);

  return (
    <div className='diceSet'>
      <a onClick={() => setRoll(rollDice(diceSet))}>Roll</a>
      {diceSet.name}
      {roll ? renderRoll(roll) : null}
    </div>
  );

}
