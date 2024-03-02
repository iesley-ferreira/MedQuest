import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Game from './pages/Game';
import Login from './pages/Login';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import './App.css';

function App() {
  return (

    <Switch>
      <Route exact path="/feedback" component={ Feedback } />
      <Route exact path="/game" component={ Game } />
      <Route exact path="/ranking" component={ Ranking } />
      <Route exact path="/" component={ Login } />
    </Switch>

  );
}

export default App;
