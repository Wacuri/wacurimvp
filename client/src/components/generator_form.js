import React, {Component} from 'react'
import state from '../state';

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

    fetch('/api/active_journeys')
    .then(res => res.json())
    .then(json => {
      state.activeJourneys = json
    });
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
        <div>Hello</div>
      )
  }
}
