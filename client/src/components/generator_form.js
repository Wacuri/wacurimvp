import React, {Component} from 'react'

export default class GeneratorForm extends Component {

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
            <h3>Give your room a name</h3>
            <input type="text" id="session_link" />
            <p>
              <input type="button" value="Create a link" onClick={this.createSessionLink} />
              &nbsp; or <a href='#'>Generate a name</a>
            </p>
          </form>
        </div>
      )
  }
}
