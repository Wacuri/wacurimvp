import React, {Component} from 'react'

export default class Generator extends Component {

  constructor(props){
    super(props)
    this.state = {
      sessionLinkName: ''
    }
  }

  createSessionLink() {
    console.log("*** createSessionLink")
  }

  render() {
      return(
        <div>
          <form>
            <input type="button" value="Create a session link" onClick={this.createSessionLink} />
            <br />
            <input type="text" id="session_link" />
          </form>
        </div>
      )
  }
}
