import React, {Component} from 'react'
import JourneyDetailEntry from './journey_detail_entry'
import SessionInfo from './session_info'


export default class JourneySpaceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }

    this.toggleVisibility = this.toggleVisibility.bind(this)
  }

  toggleVisibility() {
    this.setState({visible: !this.state.visible})
  }

  render() {
      return (
        <div className="col-sm">
          <div className="container" style={{ border: '1px solid #e6e6e6', padding:'10px'}}>
            <form>
              <button type="button" className="btn btn-outline-primary btn-block" onClick={this.toggleVisibility}>
                <i className="fa fa-plus" ariaHidden="true"></i>&nbsp;&nbsp;Create a new Journey Space
              </button>
              <JourneyDetailEntry detailVisibility={this.state.visible} />
            </form>
          </div>
        </div>
      )
  }


}