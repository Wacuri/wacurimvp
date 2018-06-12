import React from 'react';
import { view } from 'react-easy-state';
import state from '../state';

import logo from 'file-loader!isomorphic-loader!../../res/images/CuriousLive-logo.png';

const Header = () => (
  <div className="header">
    <h1 className='logo'><img src={logo}/></h1>
    {false && state.loggedIn && state.user &&
      <div>
        <span className='mr-2 text-secondary'>logged in as {state.user.name}</span>
        <a href='/api/logout'>Logout</a>
      </div>
    }
  </div>
);

export default view(Header);
