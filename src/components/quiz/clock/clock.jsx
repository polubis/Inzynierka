import React from 'react';
import './clock.css';

class Clock extends React.PureComponent{
    state = {
        time: 0
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.shouldStart)
            this.intervalId = setInterval(() => {this.changeTime()}, 100);
        else
            clearInterval(this.intervalId);
    }
    changeTime = () => {
        this.setState({time: this.state.time + 0.1});
    }
    componentWillUnmount(){
        clearInterval(this.intervalId);
    }
    render(){
        return (
            <div className="clock-container">
                <i className="fa fa-clock-o"></i>
                <span>{Math.round(this.state.time * 100) / 100} s</span>
            </div>
        );
    }
}
export default Clock;