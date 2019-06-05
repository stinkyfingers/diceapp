import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authenticate } from '../api';
import '../css/header.css';

export const Header = props => {
  const [user, setUser] = useState(localStorage.getItem('user'));
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(undefined);
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const res = await authenticate({email, password});
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
        <Link to='/'>View All Dice Sets</Link>
        {user ?
          <React.Fragment>
            <Link to='' onClick={() => handleLogout()}>Log Out</Link>
            <Link to='/create'>Create</Link>
          </React.Fragment>
          :
          <React.Fragment>
            <Link to='/register'>Register</Link>
            {renderLogin()}
          </React.Fragment>
        }
      </div>
    </div>
  );
}
