import React, {Component} from 'react'

export default class SessionInfo extends Component {

  constructor(props){
    super(props)
    this.state = {
      sessionLinkName: 'someLinkName'
    }
  }

  jumpToSession() {
    console.log("*** jumpToSession")
  }

  render() {
      return(
        <div>
          <h3>Session Created</h3>
          <p><span style={{ fontWeight: 'bold', backgroundColor: '#ccc', padding: '7px' }}>www.wacuri.com/{this.state.sessionLinkName}</span> <a href="#">Copy link to share</a></p>

          <p><input type="button" value="Jump to session" onClick={this.jumpToSession} /></p>

        </div>
      )
  }
}
