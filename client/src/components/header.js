// header.js -- Handle title bar and so forth.
// Copyright (C) 2018 Robert L. Read <read.robert@gmail.com>

// This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.


import React, {Component} from 'react';
import { view } from 'react-easy-state';
import state from '../state';

// import logo from 'file-loader!isomorphic-loader!../../res/images/CuriousLiveLogoMark-150-300.png';
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
	    <button onClick={this.onLeave}
	style={{backgroundColor: 'rgb(250,188,91)', borderStyle: 'none'}}	
	    >
	    <i className="fa fa-home" style={{color: 'white',backgroundColor: 'rgb(75,176,88)', borderRadius: '50%', padding: '8px', fontSize: '24px'}}></i></button>
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
		{ this.props.showLeave && 
		  <LeaveRoomButton history={this.props.history}/> }
    <img className="logo" src={logo}/>
		{/*    {state.journey && !state.journey.startAt &&
     <h2 style={{color: 'white'}}>{state.journey.name}</h2>
    }
		 */}
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
