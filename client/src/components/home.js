import React, { Component } from 'react';
import GeneratorForm from './generator_form'
import EventMessage from './event_message'
import UserList from './user_list'
import state from '../state';


var { OTSession, OTPublisher, OTStreams, OTSubscriber, createSession } = {};

if (__CLIENT__) {
  var { OTSession, OTPublisher, OTStreams, OTSubscriber, createSession } = require('opentok-react');
  const OT = require('@opentok/client');
  window.state = state;
}


export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      streams: [],
      journeysReady: [
        {title: "Journey 1", userName: "Fred", description: "Dino's dinner", url: "/dinos-dinner"},
        {title: "Journey 2", userName: "Wilma", description: "Pebbles turns twelve", url: "/pebbles-turns-twelve"},
        {title: "Journey 3", userName: "George", description: "George's first meditation", url: "georges-first-meditation"}
      ],
      publisherId: '',
      session: null,
      totalConnectionsCreated: 0,
      connectedUsers: []
    }
    this.publisher = {};
  }


  componentDidMount() {
    const roomUrl = 'temp-home-location'

    // let messageData = {
    //   userName: "Bob",
    //   description: "some text",
    //   url: "http://www.news.google.com"
    // }

    // fetch("/api/sessions/temp-home-location", { body: '{}'}, {method: 'POST' })
      //  fetch(`/api/sessions/${roomUrl}`, {
      //   body: JSON.stringify(messageData), // must match 'Content-Type' header
      //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      //   credentials: 'same-origin', // include, same-origin, *omit
      //   headers: {
      //     'user-agent': 'Mozilla/4.0 MDN Example',
      //     'content-type': 'application/json'
      //   },
      //   method: 'POST', // *GET, POST, PUT, DELETE, etc.
      //   mode: 'cors', // no-cors, cors, *same-origin
      //   redirect: 'follow', // manual, *follow, error
      //   referrer: 'no-referrer'// *client, no-referrer
      // })
    fetch(`/api/sessions/${roomUrl}`)
      .then(res => res.json())
      .then(json => {
        state.session = json;
        this.sessionHelper = createSession({
          apiKey: state.openTokKey,
          sessionId: state.session.sessionId,
          token: state.session.token,
          onConnect: () => {
            console.log('assigned connection to publisher', this.sessionHelper.session.connection);
            setTimeout(this.refreshSession, 1000);
          },
          onStreamsUpdated: streams => {
            console.log('Current subscriber streams:', streams);
            this.setState({ streams });
          }
        });
        window.sh = this.sessionHelper;
        this.sessionHelper.session.on("connectionDestroyed", (event) => {
          console.log('DESTROYED', event);
          const data = {
            sessionId: this.sessionHelper.session.sessionId,
            connection: {
              id: event.connection.id
            },
            event: 'connectionDestroyed',

          }

          const updatedConnectionCount = this.state.totalConnectionsCreated - 1
          this.setState({totalConnectionsCreated: updatedConnectionCount})

          let newData = [...this.state.connectedUsers]
          let index = newData.indexOf(event.connection.id)
          newData.splice(index, 1)
          this.setState({connectedUsers: newData})

          console.log('data is', data);
          // fetch(`/api/event`, {
          //   body: JSON.stringify(data), // must match 'Content-Type' header
          //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          //   credentials: 'same-origin', // include, same-origin, *omit
          //   headers: {
          //     'user-agent': 'Mozilla/4.0 MDN Example',
          //     'content-type': 'application/json'
          //   },
          //   method: 'POST', // *GET, POST, PUT, DELETE, etc.
          //   mode: 'cors', // no-cors, cors, *same-origin
          //   redirect: 'follow', // manual, *follow, error
          //   referrer: 'no-referrer', // *client, no-referrer
          // });
          // this.refreshSession();
        });



        this.sessionHelper.session.on("connectionCreated", (event) => {
          console.log('CREATED', event);
          const updatedConnectionCount = this.state.totalConnectionsCreated + 1
          this.setState({totalConnectionsCreated: updatedConnectionCount})
          console.log('**** Total connections: ' + this.state.totalConnectionsCreated)
          const data = {
            sessionId: this.sessionHelper.session.sessionId,
            connection: {
              id: event.connection.id
            },
            event: 'connectionCreated',
          }

          this.setState({ connectedUsers: [...this.state.connectedUsers, event.connection.id] })
          console.log('data is', data);
          // fetch(`/api/event`, {
          //   body: JSON.stringify(data), // must match 'Content-Type' header
          //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          //   credentials: 'same-origin', // include, same-origin, *omit
          //   headers: {
          //     'user-agent': 'Mozilla/4.0 MDN Example',
          //     'content-type': 'application/json'
          //   },
          //   method: 'POST', // *GET, POST, PUT, DELETE, etc.
          //   mode: 'cors', // no-cors, cors, *same-origin
          //   redirect: 'follow', // manual, *follow, error
          //   referrer: 'no-referrer', // *client, no-referrer
          // });
          // this.refreshSession();
        });



        this.sessionHelper.session.on("signal", (event) => {
          console.log("Signal sent from connection ", event);
          console.log("Signal type", event.type);
          // this.refreshSession(); // FIXME Error: home.js:110 Uncaught TypeError: _this2.refreshSession is not a function

          if (event.type === 'signal:displayJourneyRequest') {
            console.log("**** CAPTURED the journey request !! ")
            console.log(event)
            let data = JSON.parse(event.data)

            //CURRENT: Add this into state.journeysReady array
            this.setState({
              displayMessageVisible: true,
              displayMessageText: data.description,
              sessionUrl: data.messageUrl
            });
          }
        });

        this.setState({
          session: this.sessionHelper.session
        });
      });


    fetch('/api/journeys')
      .then(res => res.json())
      .then(json => {
        state.journeys = json;
      });

  }





  render() {
    return (
      <div className="home container">
        <div className="row">
          <span className="col-sm"><UserList userCount={this.state.totalConnectionsCreated} userIds={this.state.connectedUsers} /></span>
          <span className="col-sm"><EventMessage messages={this.state.journeysReady} sessionUrl={this.state.sessionUrl} /></span>
          <span className="col-sm"><GeneratorForm /></span>
        </div>
      </div>
      )
  }

}
