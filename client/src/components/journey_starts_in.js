import React, {Component} from 'react';

class JourneyStartsIn extends Component {

  constructor(props) {
    super(props);
    if (props.timer) {
      props.timer.on('tick', (current) => {
        this.setState({
          timerValue: current
        });
      });
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.timer) {
      newProps.timer.on('tick', (current) => {
        this.setState({
          timerValue: current
        });
      });
    }
  }

  componentWillUnmount() {
    if (this.props.timer) {
      this.props.timer.clear();
    }
  }

  render() {
    const {journey} = this.props;
    return (
      <div className='journey-starts-in' style={{padding: '10px 10px 10px', borderBottom: '1px solid rgb(88, 88, 88)'}}>
        { this.props.timer &&
          <div style={{display: 'flex'}}>
            <span className='label'>Journey starts in:</span>
            <span className='time' style={{marginLeft: 'auto'}}>{this.props.timer.displayTime()}</span>
          </div>
        }
      </div>
    )
  }
}

export default JourneyStartsIn;
