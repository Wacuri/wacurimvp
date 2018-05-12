import React, {Component} from 'react'

export default class SessionInfo extends Component {

  constructor(props){
    super(props)
    this.state = {
      sessionLinkName: 'Reasonable Default',
      sessionLinkUrl: 'reasonable-default'
    }

    this.jumpToSession = this.jumpToSession.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ sessionLinkUrl: nextProps.sessionLink });
  }

  jumpToSession() {
    window.open(this.state.sessionLinkUrl, "_blank")
  }

  // TODO: npm install --save react@^16.2.0 react-dom@^16.2.0 for getDerivedstateFromProps

  render() {
      return(
        <div>
          <h3>Journey Created</h3>
          <p><span style={{ fontWeight: 'bold', backgroundColor: '#ccc', padding: '7px' }}>www.wacuri.com/{this.state.sessionLinkUrl}</span> <a href="#">Copy link to share</a></p>

            <p><input type="button" value="Jump to the session" onClick={this.jumpToSession} /></p>

        </div>
      )
  }
}
