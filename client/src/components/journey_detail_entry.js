import React, {Component} from 'react'

export default class JourneyDetailEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
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
      </div>
    )
    } else {
      return (
        <div></div>
      )
    }
  }
}