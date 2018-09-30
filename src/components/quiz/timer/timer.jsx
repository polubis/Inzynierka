import React from 'react'
import './timer.scss';

class Timer extends React.PureComponent{
    state = {
        time: parseFloat(this.props.startTime)
    }
    componentDidMount(){
        this.addInterval();
    }
    addInterval = () => {
        const { pausePerChange } = this.props;
        this.intervalId = setInterval(() => {this.changeTime()}, pausePerChange);
    }
    componentDidUpdate(prevProps){
        const { timerEndFunction, breakCountingValue, shouldPause } = this.props;
        const { time } = this.state;
        if(time <= breakCountingValue){
            timerEndFunction();
            clearInterval(this.intervalId);
        }
        if(prevProps.shouldPause !== shouldPause && shouldPause){
            clearInterval(this.intervalId);
        }
        else if(prevProps.shouldPause !== shouldPause && !shouldPause){
            this.addInterval();
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
        const { timeDivider, showPulseAnimation, sizeClass, label, shouldDecrement } = this.props;
        return (
            <div className={`${sizeClass} ${showPulseAnimation ? "pulse-timer" : ""}`}>
                <div>
                    {shouldDecrement ? 
                    time > 0 && time.toFixed(timeDivider) : 
                    time.toFixed(timeDivider)
                    }
                </div>
                {label && <span>{label}</span>}
            </div>
        );
    }
}
Timer.defaultProps = {
    startTime: 0,
    pausePerChange: 100,
    shouldDecrement: false,
    timeChangeValue: 1,
    breakCountingValue: 0,
    timeDivider: 1,
    showPulseAnimation: true,
    shouldPause: false,
    sizeClass: "timer"
};
export default Timer;