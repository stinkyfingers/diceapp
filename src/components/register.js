import React, { useState } from 'react';
import { register } from '../api';
import Store from '../stores/dice';

export const Register = props => {
  const store = Store.useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    const res = await register({email, password});
    if (res.data.error) {
      store.set('error')(res.data);
      return;
    }
    localStorage.setItem('user', JSON.stringify(res.data));
    props.history.push('/');
  }
  return (
    <div className='register'>
      <h3> Register as a new user</h3>
      <label htmlFor='email'>Email:
        <input type='text' name='email' onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label htmlFor='password'>Password:
        <input type='password' name='password' onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button onClick={() => submit()}>Submit</button>
    </div>
  );
}
