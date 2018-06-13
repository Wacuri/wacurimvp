import React, {Component} from 'react'

class CountdownMessage extends Component {
  constructor(props) {
    super(props);

    // var deadline = Date.parse(props.endTime);
    // var now = Date.parse(new Date());
    // var timeRemaining = deadline - now

    // var seconds = Math.floor( (timeRemaining/1000) % 60 );
    // var minutes = Math.floor( (timeRemaining/1000/60) % 60 );
    // var hours = Math.floor( (timeRemaining/(1000*60*60)) % 24 );
    // var days = Math.floor( timeRemaining/(1000*60*60*24) );

    this.state = {
      currentCount: 10,
      // timeValues: {
        // 'total': timeRemaining,
        // 'days': days,
        // 'hours': hours,
        // 'minutes': minutes,
        // 'seconds': seconds
      total: '',
      days: '',
      hours: '',
      minutes: '',
      seconds: ''
      // }
    }

    this.countdown = this.countdown.bind(this);
  }

  componentDidMount() {
    var intervalId = setInterval(this.countdown, 1000);

    // var timeCounter = this.refs.countdown_ref;

    // if(this.state.timeValues.minutes<=5){
    //   setInterval(function(){
    //     timeCounter.innerHTML = 'minutes: ' + t.minutes + '<br>' +
    //                       'seconds: ' + t.seconds;
    //     if(this.state.timeValues.seconds<=0){
    //       clearInterval(timeinterval);
    //     }
    //   },1000);
    // }
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
    var totalTimeInMinutes = this.state.total/1000/60
    if(totalTimeInMinutes > 0 && totalTimeInMinutes < 5) {
      var message = `Starting in: ${this.state.minutes > 0 ? this.state.minutes + "min" : ""} ${this.state.seconds}sec`
    } else {
      var message = "Started"
    }

    if (totalTimeInMinutes < 5) {
      return (
        <div id='countdown-time' className='btn btn-info' ref='countdown_ref'>
          {message}
        </div>
      );
    } else {
      return (
        <div></div>
        )
    }
  }
}

export default CountdownMessage;
