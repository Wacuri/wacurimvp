import React, {Component} from 'react';
import { view } from 'react-easy-state';
import state from '../state';

import logo from 'file-loader!isomorphic-loader!../../res/images/CuriousLive-logo.png';


class LeaveRoomButton extends Component {

  onLeave = (e) => {
    e.preventDefault();
    if (!state.audioTag.paused) {
      state.audioTag.pause();
    }
    this.props.history.push('/');            
  }

  render() {
    return (
      <button onClick={this.onLeave} className='btn btn-primary'>Home</button>
    )
  }
}


class Header extends React.Component {
    constructor(props) {
	super(props);
    }
    
    render() {
	return (
	<div  className="header">
                  <div style={{padding: '10px'}}>
	</div>
	<LeaveRoomButton history={this.props.history}/>
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
	)}
}

export default view(Header);
