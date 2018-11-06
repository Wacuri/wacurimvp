import React, {Component} from 'react';
import { Route, Redirect, Switch, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { view } from 'react-easy-state';
import Cookie from 'js-cookie';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';
const VirtualizeSwipeableViews = virtualize(SwipeableViews);

import state from '../state';
import JourneyStartsIn from './journey_starts_in';

var { OTSession, OTPublisher, OTStreams, OTSubscriber, createSession } = {};

if (__CLIENT__) {
    var { OTSession, OTPublisher, OTStreams, OTSubscriber, createSession } = require('opentok-react');
    const OT = require('@opentok/client');
    window.state = state;
}



export class IntroBig extends Component {
    constructor(props) {
        super(props);
        this.state = {
	    index: 0
        }
        this.NUM_VIEWS = 5;        
    }
    onChange = (e) => {
        e.preventDefault();	
        this.setState({
            journeySpaceName: e.target.value,
            error: this.state.error && e.target.value != ''
        });
	e.stopPropagation();	
    }

    left = () => {
	this.handleChangeIndex((this.state.index-1) % this.NUM_VIEWS);
    }
    right = () => {
	this.handleChangeIndex((this.state.index+1) % this.NUM_VIEWS);	
    }

    handleChangeIndex = index => {
	this.setState(
	    {index: index}
	);
    };
    componentDidMount() {
        Cookie.set('saw intro', true, {expires: 365});
    }

    slideRendererX = (params) => {
        const { index, key } = params;
        var i = mod(index, this.NUM_VIEWS);
        switch(i) {
        case 0:
            return (
                    <div className='intro-screen' key={key}>
                    <p className='message-heading'>1. Welcome to CuriousLive&hellip; five-minute guided journeys &ndash; plus sharing &ndash; with others.</p>
                    <p>
                    For each journey, you can see when it will start and how many people are in the JourneySpace.
                    To promote sharing, each JourneySpace is limited to two or three participants.
                    You can join a JourneySpace at any time.
                    </p>
                    <p>
                    You can join a JourneySpace that already has someone present, or go to a Journey
                you would like to take and wait for someone else to join.
                    </p>
                    <p>
                    If no one joins, you can take the journey by yourself, or even create
                a permanent JourneySpace to invite your personal friends to.
                    </p>
                    </div>);
        case 1:
            return (
                    <div className='intro-screen' key={key}>
                    <p className='message-heading'>2. When you enter a JourneySpace&hellip; </p>
                    <p>
                    When you enter a JourneySpace, your
                journey will begin shortly when the timer
                above elapses and you hear the chime.
                    </p>
                    <p>
                    Then we’ll mute your microphones and for
                        five minutes and you’ll hear your Journey
                Guide taking you on the journey.
                    </p>
                    <p>
                    The goal is relaxation and joy, so settle in
                by breathing slowly and deeply and adjust
                your posture to be comfortable.
                    </p>
                    </div>);
        case 2:
            return (
                    <div className='intro-screen' key={key}>
                    <p className='message-heading'>3. Next comes the Journey&hellip;</p>
                    <p>
                    The CuriousLive&trade; experience is
                intentionally short so busy people can find
                the time to do it regularly. That is when you
                get the real benefits.
                    </p>
                    <p>
                    CuriousLive Journeys are captured Live
                and Unplugged, never scripted. Your
                Journey Guide will help you relax into the
                JourneySpace and go deep into the Journey.
                    </p>
                    <p>
                    Your microphone will be automatically
                muted.
                    <br/>
                    Some people like to leave their cameras on
                during the journey to increase the feeling
                of a shared experience. It is up to you.
                    </p>
                    </div>);
        case 3:
            return (
                    <div className='intro-screen' key={key}>
                    <p className='message-heading'>4. After the Journey comes the Sharing and Connecting.</p>
                    <p>
                    Then you’ll have the opportunity to briefly
                share with others your insights and
                experience. Each person takes 1 or 2
                minutes.
                    </p>
                    <p>
                    When you’re ready, start sharing with the other jourrneyers. Go deep. Drop
                    in to your insights and intuitions and o!er
                the others something special about your
                experience.
                    </p>
                    <p>
                    And when others are sharing, please listen
                deeply, and in turn they will listen more
                deeply to you.
                    </p>
                    </div>);
        case 4:
            return (
                    <div className='intro-screen' key={key}>
                    <p className='message-heading'>5. How was your experience? We Love Feedback from Our Community.</p>
                    <p>
                    We welcome your feedback about the
                process and the Wacuri Method even
                after the group experience. When you are done sharing, please take
                a moment to rate your experience and
                give us your valuable feedback using the feedback button.
                    </p>
                    </div>);
        default:
                console.log("INTERNAL ERROR IN SWIPABLEMODAL",i);
        }
    };
    render() {
        const index = this.state.index;
        return (
	        <div className="bigIntro" >
                <a href='#' onClick={this.props.onClose} style={{position: 'absolute', right: '20px', top: '20px', zIndex: 100}}>
                <i className='fa fa-times fa-2x' style={{color: 'white'}}/>
                </a>
	        <div style={{
	    	    display: 'flex',
		    flexFlow: 'column nowrap',
		    justifyContent: 'center'
	        }}>
	        <VirtualizeSwipeableViews
            index={this.state.index}
            onChangeIndex={this.handleChangeIndex}
            slideRenderer={this.slideRendererX}
	    className='swipable-message'
                />	    
	        </div>
	        <button  onClick={this.left} style={{visibility: `${(index == 0) ? 'hidden' : 'visible'}`, position: 'absolute', left: '20px', top: '50%', zIndex: 100,  backgroundColor: 'rgb(74,170,221)', color: 'white', border: '0px'}}>
	    	<i className="fa fa-caret-left fa-3x"></i>
	        </button>
	        <button onClick={this.right} style={{visibility: `${(index == (this.NUM_VIEWS-1)) ? 'hidden' : 'visible'}`, position: 'absolute', right: '20px', top: '50%', zIndex: 100,  backgroundColor: 'rgb(74,170,221)', color: 'white', border: '0px'}}>
	    	<i className="fa fa-caret-right fa-3x" ></i>
	        </button>
	        </div>	    
        )
    }
}


export class OrientationModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
	    index: 0
        }
    }

    onChange = (e) => {
        e.preventDefault();	
        this.setState({
            journeySpaceName: e.target.value,
            error: this.state.error && e.target.value != ''
        });
	e.stopPropagation();	
    }

    left = () => {
	this.handleChangeIndex((this.state.index-1) % 3);
    }
    right = () => {
	this.handleChangeIndex((this.state.index+1) % 3);	
    }

    handleChangeIndex = index => {
	this.setState(
	    {index: index}
	);
    };

    render() {
        function slideRenderer(params) {
	    console.log("params", params);
            const { index, key } = params;

            switch (mod(index, 3)) {
            case 0:
                return (
	                <div>
                        <p className='message-heading'>1.  Welcome to CuriousLive ...<br/>
	                A five-minute guided journey - plus sharing - with others.</p>
	                <p/>	      
                        <p>
                        The journey will begin when the timer above elapses and you hear the cime.
                        </p>
                        <p>
                        Breathe slowly and deeply and ajust your posture to be comfortable.
	                </p>
	                </div>
                );

            case 1:
                return (
                        <div>	    
	                <p className='message-heading'>2.  Next comes the Journey...</p>
	                <p/>	      
                        <p>
                        Your microphone will be muted.
                        </p>
                        <p>
                        Some people like to leave their cameras on during the journey to increase the feeling of a shared experience. It is up to you.
	                </p>
	                </div>
	                
                );

            case 2:
                return (
	                <div>
	                <p className='message-heading'>3.  After the Journey comes the Sharing and Connecting.</p>
	                <p/>
                        <p>
	                After the journey you will have the opportunity to share your insights.
	                Each person takes 1 or 2 minutes.
                        </p>
	                <p>
	                When others are sharing, please listen deeply, and in turn they will listen more deeply to you.
	                </p>
	                </div>
                );

            default:
                return null;
            }
        }

        const index = this.state.index;
        return (
	        <div style={{position: 'absolute',
			     minHeight: `${someHelper.ONE_SQUARE_WIDTH}px`,
			     maxWidth: `${someHelper.ONE_SQUARE_WIDTH}px`,
			     maxHeight: `${someHelper.ONE_SQUARE_WIDTH}px`,
			     minWidth: `${someHelper.ONE_SQUARE_WIDTH}px`,			 
			     backgroundColor: 'rgba(74, 170, 221, 1.0)',
			     display: 'flex',
			     flexFlow: 'column nowrap',
			     justifyContent: 'center',
			     zIndex: '1003'
			    }
		           }>
                <a href='#' onClick={this.props.onClose} style={{position: 'absolute', right: '20px', top: '20px', zIndex: 100}}>
                <i className='fa fa-times fa-2x' style={{color: 'white'}}/>
                </a>
	        <div style={{
	    	    display: 'flex',
		    flexFlow: 'column nowrap',
		    justifyContent: 'center'
	        }}>
	        <VirtualizeSwipeableViews
            index={this.state.index}
            onChangeIndex={this.handleChangeIndex}
            slideRenderer={slideRenderer}
	    className='swipable-message'
                />	    
	        </div>
	        <button  onClick={this.left} style={{visibility: `${(index == 0) ? 'hidden' : 'visible'}`, position: 'absolute', left: '20px', top: '50%', zIndex: 100,  backgroundColor: 'rgb(74,170,221)', color: 'white', border: '0px'}}>
	    	<i className="fa fa-caret-left fa-3x"></i>
	        </button>
	        <button onClick={this.right} style={{visibility: `${(index == 2) ? 'hidden' : 'visible'}`, position: 'absolute', right: '20px', top: '50%', zIndex: 100,  backgroundColor: 'rgb(74,170,221)', color: 'white', border: '0px'}}>
	    	<i className="fa fa-caret-right fa-3x" ></i>
	        </button>
	        </div>	    
        )
    }
}
