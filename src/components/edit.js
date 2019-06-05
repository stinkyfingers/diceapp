import React, { useState, useEffect } from 'react';
import Store from '../stores/dice';
import { saveDiceSet, getDiceSet } from '../api';

export const Edit = props => {
  const store = Store.useStore();
  const [diceSet, setDiceSet] = useState(store.get('diceSet'));

  useEffect(() => {
    if (props.match.path === '/create') {
      setDiceSet({dice:[]});
      return;
    }
    if (diceSet.id) return;
    getDiceSet({id: props.match.params.id}).then((resp) => {
      setDiceSet(resp.data);
    });
  }, [diceSet.id, props.match.params.id, props.match.path]);

  const handleDice = (value, dieIndex, sideIndex) => {
    let dice = [];
    diceSet.dice.forEach((d, i) => {
      if (i !== dieIndex) {
        dice.push(d);
        return;
      }
      let die = d;
      die.sides.map((side, j) => {
        if (j !== sideIndex) return side;
        side.value = value;
        return side;
      });
      dice.push(die);
    });
    setDiceSet({...diceSet, dice});
  }

  const handleName = value => {
    setDiceSet({...diceSet, name: value});
  }

  const handlePublic = value => {
    setDiceSet({...diceSet, public: value});
  }

  const save = () => {
    if (diceSet.name === '') {
      store.set('error')({error: 'dice set must have name'});
      return;
    }
    if (diceSet.dice.length === 0) {
      store.set('error')({error: 'dice set must have at least one die'});
      return;
    }
    diceSet.dice.forEach((die) => {
      die.sides.forEach((side) => {
        if (side.value === '') {
          store.set('error')({error: 'each side must have text'});
          return;
        }
      });
    });
    const user = JSON.parse(localStorage.getItem('user'));
    setDiceSet({...diceSet, userId: user.id});
    saveDiceSet({...diceSet, userId: user.id}).then((resp) => {
      if (resp.error) {
        store.set('error')(resp.error);
        return;
      }
      setDiceSet(resp.data);
      props.history.push(`/diceSet/${resp.data.id}`);
    });
  }

  const handleAddDie = () => {
    let dice = diceSet.dice && diceSet.dice.length ? diceSet.dice : [];
    dice.push({sides: [{value: ''}]});
    setDiceSet({...diceSet, dice});
  }

  const handleAddSide = (dieIndex) => {
    let die;
    diceSet.dice.forEach((d, i) => {
      if (i !== dieIndex) return;
      die = d.sides && d.sides.length ? d : {sides:[]}
    });
    die.sides.push({value: ''});
    setDiceSet({...diceSet, die});
  }

  const handleDeleteDie = (dieIndex) => {
    let dice = [];
    diceSet.dice.forEach((d, i) => {
        if (i !== dieIndex) dice.push(d);
    });
    setDiceSet({diceSet, dice});
  }


  const handleDeleteSide = (dieIndex, sideIndex) => {
    let die;
    diceSet.dice.forEach((d, i) => {
      if (i !== dieIndex) return;
      die = d;
      die.sides = die.sides.filter((side, j) => {
        return (j !== sideIndex);
      });
    });
    setDiceSet({...diceSet, die});
  }

  const renderSides = () => {
    if (!diceSet.dice) return;
    diceSet.dice.forEach((side) => {
      return (<div>SIDE</div>);
    });
  }

  return (
    <div>
      <label htmlFor='name'>Name:
        <input type='text' onChange={(e) => handleName(e.target.value)} value={diceSet.name || ''} />
      </label>
      <label htmlFor='public'>Is Public:
        <input type='checkbox' onChange={(e) => handlePublic(e.target.checked)} checked={diceSet.public || false} />
      </label>
      <div className='addDie'>
        <button onClick={() => handleAddDie()}>Add Die</button>
      </div>
      {renderSides()}
      {diceSet.dice ? diceSet.dice.map((die, i) =>
        <div key={'die' + i} className='die'>
        <button onClick={() => handleAddSide(i)}>Add Side</button>
        <button onClick={() => handleDeleteDie(i)}>Delete Die</button>
          {die.sides? die.sides.map((side, j) =>
            <div key={'side' + j} className='side'>
              <input type='text' value={side.value} onChange={(e) => handleDice(e.target.value, i, j)}/>
              <button onClick={() => handleDeleteSide(i, j)}>X</button>
            </div>
          ): null}
        </div>
      ) : null}
      <button onClick={() => save()}>Save</button>
      <button onClick={() => props.history.push('/')}>Cancel</button>
    </div>
  );
}
