import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { DiceSets } from './diceSets';
import { DiceSet } from './diceSet';
import { Edit } from './edit';
import { Header } from './header';
import { Register } from './register';
import { Error } from './error';

export const AppRouter = props => {
  return (
    <BrowserRouter>
      <Header />
      <Error />
      <Route path='/diceSet/:id' component={DiceSet} />
      <Route path='/edit/:id' component={Edit} />
      <Route path='/register' component={Register} />
      <Route path='/create' exact={true} component={Edit} />
      <Route path='/' exact={true} component={DiceSets} />

    </BrowserRouter>
  )
}
