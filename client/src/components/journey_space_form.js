import React, {Component} from 'react'
import SessionInfo from './session_info'


export default class JourneySpaceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }

  render() {
    return (
      <div className="col-sm">
        <div className="container" style={{ border: '1px solid #e6e6e6', padding:'10px'}}>
          <form>
            <button type="button" className="btn btn-outline-primary btn-block"><i className="fa fa-plus" ariaHidden="true"></i>&nbsp;&nbsp;Create a new Journey Space</button>

            <h3>Enter Journey Details</h3>
            <p>
              Give your room a name:<br/>
              <input type="text" id="session_link" onChange={this.handleNameChange} />
            </p>
            <p>
              <input type="button" className="btn btn-primary" value="Create a journey space" onClick={this.createSessionLink} />
            </p>
          </form>
          <SessionInfo sessionLink={this.state.sessionLinkUrl} />
        </div>
      </div>
    )
  }
}