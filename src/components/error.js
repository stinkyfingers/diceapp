import React from 'react';
import Store from '../stores/dice';


export const Error = props => {
  const store = Store.useStore();
  const err = store.get('error');
  if (!err) return null;

  return (
    <div className='error'>
      {err.error}
    </div>
  );
}
