import React from 'react';
import './App.css';
import Body from './components/body';
import Head from './components/header';
import Store from './stores/dice';

function App() {
  return (
    <Store.Container>
      <div className="App">
        <Head />
        <Body />
      </div>
    </Store.Container>
  );
}

export default App;
