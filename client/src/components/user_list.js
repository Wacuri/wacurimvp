import React, {Component} from 'react'

export default class UserList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ userCount: nextProps.totalConnectionsCreated });
    this.setState({ userIds: nextProps.connectedUsers });
  }


  render() {
    return (
      <div>
        <h4>Current Users ({this.props.userCount})</h4>
        <ul>
          {this.props.userIds.map(function(name){
            return <li key={name}>{name}</li>;
          })}
        </ul>
      </div>
    )
  }
}