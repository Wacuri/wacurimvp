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
      this.props.history.push('/'+(this.props.skipOn ? '?skipon=true' : ''));            
  }

  render() {
      return (
	    <span className='fa-stack' onClick={this.onLeave}>
	    <i className='fa fa-circle fa-stack-2x' 
	style={{color: 'rgb(75,176,88)'}}
	    ></i>
	    {
            <i className={`fas fa-home fa-stack-1x`}
	     style={{color: 'white'}}></i>
	     }
		 </span>
      );
  }
    
}


export class LogoAndTitleBar extends React.Component {
    constructor(props) {
	super(props);
    }
    
    render() {
	return (
	<div  className="logobar">
		<div style={{padding: '5px'}}>
		</div>
		{ this.props.showLeave && 
		  <LeaveRoomButton history={this.props.history} skipOn={this.props.skipOn}/> }
	    { this.props.isPermanentSpace &&
	      <span className="journeyspacetitle">Space Name: {this.props.spaceName} </span>
	    }
	    
		<img className="logo" src={logo}/>
            { this.props.showOrientation &&
	      <span className="header-orientation-button"
	      onClick={this.props.onOrientation}
	    > Orientation </span>
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

export class JourneyBoardBar extends React.Component {
    constructor(props) {
	super(props);
    }
    
    render() {
	return (
	<div  className="jblogobar">
		<div style={{padding: '5px'}}>
		</div>
		{ this.props.showLeave && 
		  <LeaveRoomButton history={this.props.history} skipOn={this.props.skipOn}/> }
	    { this.props.isPermanentSpace &&
	      <span className="journeyspacetitle">Space Name: {this.props.spaceName} </span>
	    }
	    
		<img className="logo" src={logo}/>
            { this.props.showOrientation &&
	      <span className="header-orientation-button"
	      onClick={this.props.onOrientation}
	    > Orientation </span>
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


