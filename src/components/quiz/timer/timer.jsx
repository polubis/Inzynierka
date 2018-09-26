import React from 'react'
import './timer.scss';

class Timer extends React.PureComponent{
    state = {
        time: this.props.startTime
    }
    render(){
        const { time } = this.state;
        return (
            <div className="timer">
                {time}
            </div>
        );
    }
}

export default Timer;