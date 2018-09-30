import React from 'react'
import './timer.scss';

class Timer extends React.Component{
    state = {
        time: this.props.startTime
    }
    componentDidMount(){
        this.addInterval();
    }
    addInterval = () => {
        this.intervalId = setInterval(() => {this.changeTime()}, 1200);
    }
    componentDidUpdate(prevProps){
        const { timerEndFunction, shouldPause, breakCountingValue } = this.props;
        const { time } = this.state;
        console.log(time, breakCountingValue, shouldPause)
        if(time === breakCountingValue){
            timerEndFunction();
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
        
    changeTime = () => {
        const { shouldDecrement } = this.props;
        const { time } = this.state;
        if(shouldDecrement){
            this.setState({time: time - 1});
        }
        else{
            this.setState({time: time + 1});
        }
    }
    componentWillUnmount(){
        clearInterval(this.intervalId);
    }
    render(){
        const { time } = this.state;
        const { timeDivider, showPulseAnimation, sizeClass, label } = this.props;
       
        return (
            <div className={`${sizeClass} ${showPulseAnimation ? "pulse-timer" : ""}`}>
                <div>
                    {time.toFixed(timeDivider)}
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
    sizeClass: "timer"
};
export default Timer;