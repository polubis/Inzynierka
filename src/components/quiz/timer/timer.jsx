import React from 'react'
import './timer.scss';

class Timer extends React.PureComponent{
    state = {
        time: this.props.startTime
    }
    componentDidMount(){
        this.addInterval();
    }
    addInterval = () => {
        const { frequency } = this.props;
        this.intervalId = setInterval(() => {this.changeTime()}, frequency);
    }
    componentDidUpdate(prevProps){
        const { timerEndFunction, shouldPause, breakCountingValue, shouldResetTimer, resetTimerFunction } = this.props;
        const { time } = this.state;
        if(time <= breakCountingValue && timerEndFunction !== undefined){
            this.endCounting(time, timerEndFunction);
        }
        else if(prevProps.shouldResetTimer !== shouldResetTimer && shouldResetTimer){
            this.endCounting(time, resetTimerFunction);
        }
        else if(shouldPause !== undefined){
            if(prevProps.shouldPause !== shouldPause && shouldPause){
                clearInterval(this.intervalId);
            }
            else if(prevProps.shouldPause !== shouldPause && !shouldPause){
                this.addInterval();
            }    
        }
    }
        
    endCounting = (time, operationAfterEndCounting) => {
        const { shouldReset, startTime } = this.props;
        if(shouldReset){
            this.setState({time: startTime});
        }
        if(operationAfterEndCounting)
            operationAfterEndCounting(time);
    }

    changeTime = () => {
        const { shouldDecrement, accuracy } = this.props;
        const { time } = this.state;
        
        if(shouldDecrement){
            this.setState({time: time - accuracy});
        }
        else{
            this.setState({time: time + accuracy});
        }
    }
    componentWillUnmount(){
        clearInterval(this.intervalId);
    }
    render(){
        const { time } = this.state;
        const { showPulseAnimation, sizeClass, label, numberOfDigitsToShow } = this.props;
       
        const fixedTime = time.toFixed(numberOfDigitsToShow);
        return (
            <div className={`${sizeClass} ${showPulseAnimation ? "pulse-timer" : ""}`}>
                <div>
                    {(fixedTime !== "0" && fixedTime !== "0.0") ? fixedTime : "0"}
                </div>
                {label && <span>{label}</span>}
            </div>
        );
    }
}
Timer.defaultProps = {
    startTime: 0,
    shouldDecrement: false,
    breakCountingValue: 0,
    showPulseAnimation: true,
    shouldPause: false,
    sizeClass: "timer",
    accuracy: 0.1,
    frequency: 120,
    numberOfDigitsToShow: 1

};
export default Timer;