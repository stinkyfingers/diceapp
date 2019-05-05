
async function useFetch (url) {
    const resp = await fetch(url);
    const json = await resp.json();
    return json;
}

async function useFetchDiceSets() {
    const query = `http://localhost:8080/getPublicDiceSets`;
    return useFetch(query);
}

let effects = store => {
  store
    // .on('one')
    // .subscribe(value => {
    //   console.log("V")
    // })
    .on('diceSet')
    .subscribe(value => {
      console.log("DD", value)
    })
  return store;
}

export default effects;
