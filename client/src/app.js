import React from 'react';
import { Route } from 'react-router-dom';
import Header from './components/header';
import Home from './components/home';
import Room from './components/Room';

const App = () => (
  <div>
    <Header />
    <Route exact path="/" component={Home} />
		<Route exact path="/:room" component={Room} />
  </div>
);

export default App;
