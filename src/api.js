import axios from 'axios';

const api = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'http://stinkyfingers-108749005.us-west-1.elb.amazonaws.com/dice';

export const getDiceSets = async(userId = '') => {
  const result = await axios(`${api}/getDiceSets?id=${userId}`);
  return result;
}

export const saveDiceSet = async(diceSet) => {
  return await axios.put(`${api}/saveDiceSet`, JSON.stringify(diceSet));
}

export const getDiceSet = async(diceSet) => {
  try {
    return await axios.post(`${api}/getDiceSet`, JSON.stringify(diceSet));
  } catch (err) {
    return err;
  }
}

export const authenticate = async({email, password}) => {
  try {
    return await axios.put(`${api}/authenticate`, JSON.stringify({email, password}));
  } catch (err) {
    return err;
  }
}

export const register = async({email, password}) => {
  try {
    return await axios.post(`${api}/createUser`, JSON.stringify({email, password}));
  } catch (err) {
    return err;
  }
}
