import React, {Component} from 'react'
import moment from 'moment';

class CountdownMessage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCount: 10,
      total: '',
      days: '',
      hours: '',
      minutes: '',
      seconds: ''
    }

    this.countdown = this.countdown.bind(this);
  }

  componentDidMount() {
    this.intervalId = setInterval(this.countdown, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  countdown() {
    var deadline = Date.parse(this.props.endTime);
    var now = Date.parse(new Date());
    var timeRemaining = deadline - now

    var seconds = Math.floor( (timeRemaining/1000) % 60 );
    var minutes = Math.floor( (timeRemaining/1000/60) % 60 );
    var hours = Math.floor( (timeRemaining/(1000*60*60)) % 24 );
    var days = Math.floor( timeRemaining/(1000*60*60*24) );

    this.setState({total: timeRemaining, minutes: minutes, seconds: seconds})

  }


  render() {
      var totalTimeInMinutes = this.state.total/1000/60;
      if(totalTimeInMinutes > 0 && totalTimeInMinutes < 5) {
          var tmessage = ' Starts in: ';
      var message = `${this.state.minutes > 0 ? this.state.minutes + "min" : ""} ${this.state.seconds}sec`
      } else {
          if (totalTimeInMinutes > 0) {
          var tmessage = ' Starts at: ';
              var message =  moment(this.props.endTime).format('LT');
          } else {
              var tmessage = '';
              var message =  "";
          }
    }

//    if (totalTimeInMinutes < 5) {
      return (
        <div  ref='countdown_ref' className="time-message-holder">
              <span className="time-message"> {tmessage}</span><span className="time"> {message}</span>
        </div>
      );
//    } else {
//      return (
//        <div></div>
//        )
//    }
  }
}

export default CountdownMessage;
