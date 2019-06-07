import axios from 'axios';

const api = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'http://stinkyfingers-108749005.us-west-1.elb.amazonaws.com/dice';

export const getDiceSets = async(userId = '') => {

  try {
    return await axios({
      method: 'get',
      url: `${api}/getDiceSets`,
      headers: {'Content-Type': 'application/json'}
    });
  } catch (err) {
    return err;
  };
}

export const saveDiceSet = async(diceSet) => {
  try {
    return await axios({
      method: 'post',
      url: `${api}/saveDiceSet`,
      data: JSON.stringify(diceSet),
      headers: {'Content-Type': 'application/json'}
    });
  } catch (err) {
    return err;
  };
}

export const getDiceSet = async(diceSet) => {
  try {
    return await axios({
      method: 'post',
      url: `${api}/getDiceSet`,
      data: JSON.stringify(diceSet),
      headers: {'Content-Type': 'application/json'}
    });
  } catch (err) {
    return err;
  };
}

export const authenticate = async({email, password}) => {
  try {
    return await axios({
      method: 'post',
      url: `${api}/authenticate`,
      data: JSON.stringify({email, password}),
      headers: {'Content-Type': 'application/json'}
    });
  } catch (err) {
    return err;
  };
}

export const register = async({email, password}) => {
  try {
    return await axios({
      method: 'post',
      url: `${api}/createUser`,
      data: JSON.stringify({email, password}),
      headers: {'Content-Type': 'application/json'}
    });
  } catch (err) {
    return err;
  };
}
