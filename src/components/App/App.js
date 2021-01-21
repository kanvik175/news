import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';

import './App.css';

class App extends React.Component {

  render() {
    return (
        <Switch>
          <Route path='/saved-news'>
            <SavedNews />
          </Route>
          <Route path='/'>
            <Main />
          </Route>
        </Switch>
    )
  }
}

export default App;
