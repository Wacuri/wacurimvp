import React, {Component} from 'react'

export default class UserList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{float:'right', paddingRight:'50px'}}>
        <h4>Current Users ({this.props.userCount})</h4>
        <ul>
          {this.props.connections.map(function(connection){
            return <li key={connection.user.name}>{connection.user.name}</li>;
          })}
        </ul>
      </div>
    )
  }
}
