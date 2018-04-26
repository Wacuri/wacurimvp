import React, {Component} from 'react'

export default class UserList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ul>
          <li>Me</li>
          <li>Person 1</li>
          <li>Person 2</li>
          <li>Person 3</li>
        </ul>
      </div>
    )
  }
}