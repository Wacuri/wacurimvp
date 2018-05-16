import React from 'react';
import { view } from 'react-easy-state';
import state from '../state';

const Header = () => (
  <div className="header pl-4">
    <h1>Get started with Wacuri!</h1>
    {state.loggedIn && state.user &&
      <div>
        <span className='mr-2 text-secondary'>logged in as {state.user.name}</span>
        <a href='/api/logout'>Logout</a>
      </div>
    }
  </div>
);

export default view(Header);
