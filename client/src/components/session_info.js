import React, {Component} from 'react'

export default class SessionInfo extends Component {

  constructor(props){
    super(props)
    this.state = {
      visible: false,
      sessionLinkUrl: ''
    }

    this.jumpToSession = this.jumpToSession.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ sessionLinkUrl: nextProps.sessionLink });
    this.setState({ visible: nextProps.sessionVisibility });
  }

  jumpToSession() {
    window.open(this.state.sessionLinkUrl, "_blank")
  }

  // TODO: npm install --save react@^16.2.0 react-dom@^16.2.0 for getDerivedstateFromProps

  render() {
    if(this.state.visible === true) {
      return(
        <div>
          <strong>You created journey space!</strong>
          <p><span style={{ fontWeight: 'bold', backgroundColor: '#ccc', padding: '7px' }}>www.wacuri.com/{this.state.sessionLinkUrl}</span>&nbsp;<input className="btn btn-primary" type="button" value="Jump to the session" onClick={this.jumpToSession} /></p>
        </div>
      )

    } else {
      return (
        <div></div>
      )
    }
  }
}
