import React, {Component} from 'react'

export default class EventMessage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ backgroundColor: '#fc9' }}>
        {this.props.message} {this.props.message === undefined ? "" : (<a href={this.props.sessionUrl} target='_blank'>Join Now</a>)}
      </div>
    )
  }
}