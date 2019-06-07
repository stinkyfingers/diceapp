import React, {useState} from 'react';
import { resetPassword } from '../api';
import '../css/reset.css';

export const Reset = props => {
  const [email, setEmail] = useState();
  const handleSubmit = () => {
    resetPassword({email});
    props.history.push('/');
  }
  return (
    <div className='reset'>
      <h5>Enter your email. If found, we'll send you a new password.</h5>
      <label htmlFor='email'>
        <input type='text' name='email' onChange={(e) => setEmail(e.target.value)} />
      </label>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
