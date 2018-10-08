import React from 'react'
import './timer.scss';

class Timer extends React.PureComponent{
    state = {
        time: this.props.startTime,
        otherFunctionWasExecuted: false
    }
    componentDidMount(){
        const { shouldAddIntervalOnMount } = this.props;
        if(shouldAddIntervalOnMount)
            this.addInterval();
    }
    addInterval = () => {
        const { frequency } = this.props;
        this.intervalId = setInterval(() => {this.changeTime()}, frequency);
    }
    componentDidUpdate(prevProps){
        const { timerEndFunction, shouldPause, breakCountingValue, shouldResetTimer, resetTimerFunction, otherFunction, 
            executeOtherFunctionTime } = this.props;
        const { time, otherFunctionWasExecuted } = this.state;
        if(time <= breakCountingValue && timerEndFunction !== undefined){
            this.endCounting(time, timerEndFunction);
        }
        else if(prevProps.shouldResetTimer !== shouldResetTimer && shouldResetTimer){
            this.endCounting(time, resetTimerFunction);
        }
        else if(shouldPause !== undefined && prevProps.shouldPause !== shouldPause){
            if(shouldPause){
                clearInterval(this.intervalId);
            }
            else if(!shouldPause){
                this.addInterval();
            }    
        }
        else if(executeOtherFunctionTime !== undefined && !otherFunctionWasExecuted){
            if(time <= executeOtherFunctionTime){
                this.setState({otherFunctionWasExecuted: true}, () => {
                    otherFunction();
                })
            }
        }
    }
        
    endCounting = (time, operationAfterEndCounting, isResetFunc) => {
        const { shouldReset, startTime, accuracy, numberOfDigitsToShow } = this.props;
        if(shouldReset){
            this.setState({time: startTime, otherFunctionWasExecuted: false});
        }
        if(operationAfterEndCounting){
            operationAfterEndCounting(time.toFixed(numberOfDigitsToShow));
        }
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
    numberOfDigitsToShow: 1,
    shouldAddIntervalOnMount: true

};
export default Timer;