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
            Give your room a name <br />
            <input type="text" id="session_link" />
            <br />
            <input type="button" value="Create a link" onClick={this.createSessionLink} />
            or <a href='#'>Generate a name</a>
          </form>
        </div>
      )
  }
}
