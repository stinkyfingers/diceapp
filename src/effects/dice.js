
let effects = store => {
  store
    .on('diceSet')
    .subscribe(value => {
      console.log("Dice set effect", value)
    })
  return store;
}

export default effects;
