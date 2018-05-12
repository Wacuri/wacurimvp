import React from 'react'

const EventMessage = (props) => {
  return (
    <div>
      {props.journeys.map((journey, index) => (
        <p key={index}
           style={{ backgroundColor: '#fc9', padding: '7px'}}>
           A journey space has been created.
           <br/>
           <a href={"/" + journey.room} target="_blank">Join</a>
           &nbsp;&nbsp;
           <a href="#">Share</a></p>
      ))}
    </div>
  );
}

export default EventMessage
