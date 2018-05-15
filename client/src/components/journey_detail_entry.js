import React, {Component} from 'react'
import SessionInfo from './session_info'

export default class JourneyDetailEntry extends Component {

    constructor(props){
    super(props)
    this.state = {
      visible: false,
      sessionVisible: false,
      sessionLinkName: '',
      sessionLinkUrl: '',
      activeJourneys: []
    }

    this.handleNameChange = this.handleNameChange.bind(this)
    this.urlFriendlyName = this.urlFriendlyName.bind(this)
    this.createSessionLink = this.createSessionLink.bind(this)

  }

  createSessionLink() {
    this.setState({sessionLinkUrl: this.urlFriendlyName(this.state.sessionLinkName) })
    fetch('/api/sessions/test/temp-home-location')

    fetch('/api/active_journeys')
    .then(res => res.json())
    .then(json => {
      state.activeJourneys = json
      this.setState({sessionVisible: true})
    });
  }

  handleNameChange(event) {
    this.setState({sessionLinkName: event.target.value})
  }

  urlFriendlyName(name){
    return name.replace(/\s+/g, '-').toLowerCase()
  }


  componentWillReceiveProps(nextProps) {
    this.setState({ visible: nextProps.detailVisibility});
  }


  render() {
    if(this.state.visible === true) {
    return (
      <div>
        <h3>Enter Journey Details</h3>
        <p>
          Give your room a name:<br/>
          <input type="text" id="session_link" onChange={this.handleNameChange} />
        </p>
        <p>
          <input type="button" className="btn btn-primary" value="Create a journey space" onClick={this.createSessionLink} />
        </p>
        <SessionInfo sessionVisibility={this.state.sessionVisible} sessionLink={this.state.sessionLinkUrl} />
      </div>
    )
    } else {
      return (
        <div></div>
      )
    }
  }
}