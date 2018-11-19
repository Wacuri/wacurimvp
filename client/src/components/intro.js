import React, {Component} from 'react';
import { Route, Redirect, Switch, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { view } from 'react-easy-state';
import Cookie from 'js-cookie';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';

import Rating from 'react-rating';

const VirtualizeSwipeableViews = virtualize(SwipeableViews);

import state from '../state';
import JourneyStartsIn from './journey_starts_in';

var { OTSession, OTPublisher, OTStreams, OTSubscriber, createSession } = {};

if (__CLIENT__) {
    var { OTSession, OTPublisher, OTStreams, OTSubscriber, createSession } = require('opentok-react');
    const OT = require('@opentok/client');
    window.state = state;
}


// TODO: These classes are really specializations of the same class;
// a great deal of duplication could be removed by properly using inheritance here.

class BasicOrientation extends Component {
    constructor(props) {
        super(props);
        this.state = {
	    index: 0
        }
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
    render() {
        const index = this.state.index;
        return (
	        <div className="orientation" key={this.props.myForceKey}>
                <a href='#' onClick={this.props.onClose}>
                <i className='fa fa-times fa-4x' style={{color: 'white'}}/>
                </a>
	        <div style={{
	    	    display: 'flex',
		    flexFlow: 'column nowrap',
		    justifyContent: 'center'
	        }}>
	        <VirtualizeSwipeableViews
            index={this.state.index}
            onChangeIndex={this.handleChangeIndex}
            slideRenderer={this.slideRenderer}
	    className='swipable-message'
                />	    
	        </div>
	        <button  className="leftbutton orientation-caret" onClick={this.left}
            style={{
                visibility: `${(index == 0) ? 'hidden' : 'visible'}`
            }}
                >
	    	<i className="fa fa-caret-left fa-5x"></i>
	        </button>
	        <button className="rightbutton orientation-caret" onClick={this.right}
            style={{
                visibility: `${(index == (this.NUM_VIEWS-1)) ? 'hidden' : 'visible'}`
            }}
                >
	    	<i className="fa fa-caret-right fa-5x" ></i>
	        </button>
	        </div>	    
        )
    }
}


export class IntroBig extends BasicOrientation {
    constructor(props) {
        super(props);
        this.NUM_VIEWS = 5;        
    }
    componentDidMount() {
        Cookie.set('saw intro', true, {expires: 365});
    }

    slideRenderer = (params) => {
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
                    <p>
                    Dismiss this orientation with by clicking the "X" in the upper right corner to go to the JourneyBoard.               
                    </p>
                    </div>);
        default:
                console.log("INTERNAL ERROR IN SWIPABLEMODAL",i);
        }
    };
}


export class OrientationModal extends BasicOrientation {
    constructor(props) {
        super(props);
        this.state = {
	    index: 0
        }
        this.NUM_VIEWS = 3;
    }

    slideRenderer = (params) => {
        const { index, key } = params;
        var i = mod(index, this.NUM_VIEWS);
        switch (i) {
            case 0:
                return (
	                <div className='intro-screen' key={key}>
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
                        <div className='intro-screen' key={key}>	    
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
	                <div className='intro-screen' key={key}>
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

}


export class FeedbackModalAux extends BasicOrientation {
    constructor(props) {
        super(props);
        this.state = {
	    journeySpaceName: '',
	    rating: 0,
	    feeling: 0,
	    text: '',
            error: false,
	    index: 0,
            feedbackSubmitted: false
        }
        this.NUM_VIEWS = 1;
    }

    onChange = (e) => {
        e.preventDefault();	
	this.setState({
	    journeySpaceName: e.target.value,
	    error: this.state.error && e.target.value != ''
	});
	e.stopPropagation();	
    }
    onSubmit = (e) => {
        this.props.setSubmitted(true);
        fetch(`/api/journeys/${this.props.room}/feedback`, {
            body: JSON.stringify({
	        rating: this.state.rating,
	        feeling: this.state.feeling,
	        text: this.state.text,
	        journey: this.props.journeySpaceName,
	        room: this.props.room
	    }),
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
            mode: 'cors',
        });
    }
    
    slideRenderer = (params) => {
        const { index, key } = params;
        var i = mod(index, this.NUM_VIEWS);
        switch (i) {
        case 0:
            return (
	            <div key={key} style={{
			         display: 'flex',
			         flexDirection: 'column',
			         justifyContent: 'center',
			         alignItems: 'center',
			         zIndex: '1003'
			        }
		               }>
                    <div style={{
		        display: 'flex',
		        flexDirection: 'column',		
		        justifyContent: 'space-between',
		        alignItems: 'center',
		        padding: '0.5em'
	            }}>
	            <p> Please rate your experience for: </p>
	            <p> "{this.props.journeySpaceName}"</p>
	            <div>
	            <Rating start={0} stop={10} className='feedback-rating'
	        emptySymbol="fa fa-circle rating-circle feedback-empty"
	        fullSymbol="fa fa-circle rating-circle feedback-full"
	        onChange={ (v) => { this.state.rating = v;}
	                 }/>
	            <div  style={{
		        display: 'flex',
		        flexDirection: 'row',		
		        justifyContent: 'space-between',
	            }}>
	            <div>1</div> <div>10</div> </div>
	            </div>
	            <p> How do you Feel?</p>
	            <div>
	            <Rating start={0} stop={10} className='feedback-rating'
	        emptySymbol="fa fa-circle rating-circle feedback-empty"
	        fullSymbol="fa fa-circle rating-circle feedback-full"
	        onChange={ (v) => { this.state.feeling = v;}
	                 }/>
	            <div  style={{
		        display: 'flex',
		        flexDirection: 'row',		
		        justifyContent: 'space-between',
                        color: 'black',
	            }}>
	            <p>Worse</p>
	            <p>The Same</p>
	            <p>Better</p>
	            </div>
	            </div>
	            <p />
	            <div className="form-group"
	        style={{
		    display: 'flex',
		    flexDirection: 'column',
		    alignItems: 'center',					 
		    justifyContent: 'space-between',
		    width: '100%',
                    position: 'relative'
	        }}>
	            <textarea id="feedback_text" className="form-control rounded-0" rows="4"
                onChange= { (e) => {
                    this.state.text = e.target.value;
                }
                          }
	            >
	            </textarea>
                    <button id="outside-react-feedback-button" className='invite-button feedback-button centered-button' onClick={this.onSubmit}
                style={{color: `${this.props.feedbackSubmitted ? "red" : "white" }`}}
 	            >{this.props.feedbackSubmitted ? 'Thanks! Feedback Submitted.': 'Submit Feedback'}</button>
	            </div>
                    </div>
                    <button className='invite-button feedback-button' onClick={this.props.onCloseAndInvite}
 	            >Invite Friends to a New Journey</button>
                    <p />	    	    
                    <button className='invite-button feedback-button' onClick={this.props.onJoinMailingList}
 	            >Join our Mailing List</button>

	        </div>	    
            );
        }

    }
}

export class FeedbackModal extends Component {
    constructor(props) {
        super(props);
        this.keyNumber = 0;
        this.state = {
            feedbackSubmitted: false
        }
        this.forceSubmitted= false;
    }
    setSubmitted = (submitted) => {
        this.setState({ feedbackSubmitted: submitted});
        this.forceSubmitted = submitted;
    }
    render() {
        return (
                <FeedbackModalAux
		  journeySpaceName={this.props.journeySpaceName}
		  journey={this.state.session}
		  onComplete={this.props.onComplete}
		  onClose={this.props.onClose}
		  onCloseAndInvite={this.props.onCloseAndInvite}
		  onJoinMailingList={this.props.onJoinMailingList}
		  room={this.props.room}
	          history={this.props.history}
                  setSubmitted={this.setSubmitted}
                  feedbackSubmitted={this.forceSubmitted}
                  myForceKey={this.keyNumber++}
                />
        );
    }
}
