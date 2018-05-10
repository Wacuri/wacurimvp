import React, {Component} from 'react'

export default class EventMessage extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   messages: props.messages
    // }
  }

  render() {
      return (<div>
    {this.props.messages.map((message, index) => (
        <p style={{ backgroundColor: '#fc9'}}>{message.userName} started session {message.description} <br/><a href={message.url} target="_blank">Launch</a></p>
    ))}
    </div>);
  }
}