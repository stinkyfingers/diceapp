import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authenticate } from '../api';
import Store from '../stores/dice';
import '../css/header.css';

export const Header = props => {
  const store = Store.useStore();
  const [user, setUser] = useState(localStorage.getItem('user'));
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(undefined);
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const res = await authenticate({email, password});
    if (res && res.data && res.data.error) {
      store.set('error')({error: res.data.error});
      return;
    }
    // TODO - token
    localStorage.setItem('user', JSON.stringify(res.data));
    setUser(res.data);
  }

  const renderLogin = () => {
    return (
      <div className='login'>
        <label htmlFor='email'>Email:
          <input type='text' name='email' onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label htmlFor='password'>Password:
          <input type='password' name='password' onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button onClick={() => handleLogin()}>Submit</button>
      </div>
    );
  }

  return (
    <div className='header'>
      <div className='links'>
        <Link className='button' to='/'>View All Dice Sets</Link>
        {user ?
          <React.Fragment>
            <Link className='button' to='' onClick={() => handleLogout()}>Log Out</Link>
            <Link className='button' to='/create'>Create</Link>
          </React.Fragment>
          :
          <React.Fragment>
            <Link className='button' to='/register'>Register</Link>
            {renderLogin()}
            <Link className='button' to='/reset'>Forgot Password</Link>
          </React.Fragment>
        }
      </div>
    </div>
  );
}
