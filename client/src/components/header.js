import React from 'react';
import { view } from 'react-easy-state';
import state from '../state';

import logo from 'file-loader!isomorphic-loader!../../res/images/CuriousLive-logo.png';

const Header = () => (
  <div className="header">
    <img className="logo" src={logo}/>
    {state.journey && !state.journey.startAt &&
      <h2 style={{color: 'white', fontSize: '16px'}}>{state.journey.name}</h2>
    }
    {false && state.loggedIn && state.user &&
      <div>
        <span className='mr-2 text-secondary'>logged in as {state.user.name}</span>
        <a href='/api/logout'>Logout</a>
      </div>
    }
  </div>
);

export default view(Header);
