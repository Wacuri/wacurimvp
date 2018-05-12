import React, {Component} from 'react'
import SessionInfo from './session_info'

export default class GeneratorForm extends Component {

  constructor(props){
    super(props)
    this.state = {
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

    // CURRENT: Call fetch('/api/active_journeys') from home.js
  }

  sendNotifications() {

  }

  handleNameChange(event) {
    this.setState({sessionLinkName: event.target.value})
  }

  urlFriendlyName(name){
    return name.replace(/\s+/g, '-').toLowerCase()
  }


  render() {
      return(
        <div>
          <form>
            <h3>Enter Journey Details</h3>
            <p>
              Give your room a name:<br/>
              <input type="text" id="session_link" onChange={this.handleNameChange} /> &nbsp; or <a href='#'>Generate a name</a>
            </p>
            <p>
              <input type="button" value="Create a journey space" onClick={this.createSessionLink} />

            </p>
          </form>
          <SessionInfo sessionLink={this.state.sessionLinkUrl} />
        </div>
      )
  }
}
