import React from 'react'
import './timer.scss';

class Timer extends React.PureComponent{
    state = {
        time: this.props.startTime
    }
    componentDidMount(){
        const { pausePerChange } = this.props;
        this.intervalId = setInterval(() => {this.changeTime()}, pausePerChange);
    }
    componentDidUpdate(){
        const { timerEndFunction, breakCountingValue } = this.props;
        if(this.state.time === breakCountingValue){
            timerEndFunction();
            clearInterval(this.intervalId);
        }
    }
    changeTime = () => {
        const { shouldDecrement, timeChangeValue } = this.props;
        const { time } = this.state;
        if(shouldDecrement){
            this.setState({time: time - timeChangeValue});
        }
        else{
            this.setState({time: time + timeChangeValue});
        }
    }
    componentWillUnmount(){
        clearInterval(this.intervalId);
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
Timer.defaultProps = {
    time: 0,
    pausePerChange: 100,
    shouldDecrement: false,
    timeChangeValue: 1,
    breakCountingValue: 0
};
export default Timer;