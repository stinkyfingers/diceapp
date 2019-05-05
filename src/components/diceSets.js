import React, {useState, useEffect} from 'react';
import Store from '../stores/dice';
import axios from 'axios';

// function useFetch(url, defaultData) {
//     const [data, updateData] = useState(defaultData)
//
//     useEffect(() => {
//       (async() => {
//         const resp = await fetch(url)
//         const json = await resp.json()
//         updateData(json)
//       })()},
//       [url])
//
//     return data
// }
//
// function useFetchDiceSets() {
//     const query = `http://localhost:8080/getPublicDiceSets`
//     return useFetch(query, {})
// }

function renderDiceSets(diceSets, setDiceSet) {
  let diceArr = [];
  diceSets.map((d) => {
    diceArr.push(
      <li key={d.id}>
        <span className='diceSetName'>{d.name}</span>
        <span className='diceSetPlay'><button onClick={() => setDiceSet(d)}>Play</button></span>
      </li>
    );
  });
  return (<ul>{diceArr}</ul>)
}

// Re-render the component when the store updates.
function DiceSets() {
  let store = Store.useStore();
  let diceSet = store.get('diceSet');
  const [diceSets, setDiceSets] = useState(null);
  useEffect(() => {
    const fetchData = async() => {
      const result = await axios(`http://localhost:8080/getPublicDiceSets`);
      setDiceSets(result.data)
    }
    fetchData()
  }, [])

  let setDiceSet = store.set('diceSet');

  return <div>
    <NumberInput onChange={store.set('one')} value={store.get('one')} />
    <NumberInput onChange={store.set('two')} value={store.get('two')} />
    Sum: {store.get('one') + store.get('two')}
    Dice set: {store.get('diceSet') ? store.get('diceSet').name : null}

    {diceSets ? renderDiceSets(diceSets, setDiceSet) : null}
  </div>
}

function NumberInput(props) {
  return <input
    onChange={e => props.onChange(parseInt(e.target.value, 10))}
    type="number"
    value={props.value}
  />
}

export default DiceSets
