import React, {Component} from 'react'

export default class EventMessage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.journeys.map((journey, index) => (
          <p key={index}
             style={{ backgroundColor: '#fc9', padding: '7px'}}>
             (Someone) started a journey space.
             <br/>
             <a href={"/" + journey.room} target="_blank">Join</a>
             &nbsp;&nbsp;
             <a href="#">Share</a></p>
        ))}
      </div>
    );
  }
}