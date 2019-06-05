import React from 'react';
import './App.css';
import Store from './stores/dice';
import { AppRouter } from './components/router';

function App() {
  return (
    <Store.Container>
      <div className="App">
        <AppRouter/>
      </div>
    </Store.Container>
  );
}

export default App;
