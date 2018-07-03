import React, { Component } from 'react';
import './Player.css';

class Player extends Component {
    state = {
        duration: null, 
        currentTime: 0,
        isPlaying: false,
        intervalId: null
    }

    
    setDuration = () => {
        this.setState({duration: Math.floor(this.player.duration)});
    }
    updateTime = timeStamp => {
        const timeStamped = Math.floor(timeStamp);
        if(timeStamped >= Math.floor(this.state.duration)){
            clearInterval(this.state.intervalId);
            this.setState({currentTime: 0});
        }
        else
            this.setState({ currentTime: timeStamped});
    }
    
   

    play = () => {
        if(this.player.paused){
           
            this.player.play();
            
            const intervalId = setInterval(() => {
                this.updateTime(this.player.currentTime);
            }, 100)

            
            this.setState({isPlaying: true, intervalId: intervalId});
        }
        else{
            this.player.pause();
            clearInterval(this.state.intervalId);
            this.setState({isPlaying: false});
        }
    }
    stop = () => {
        clearInterval(this.state.intervalId);
        if(!this.player.paused){
            this.player.pause();
            this.setState({isPlaying: false});
        }
    }
    componentWillUnmount(){
         clearInterval(this.state.intervalId);
    }
    render() { 
        return ( 
        <div className="player">
            <audio onLoadedMetadata={this.setDuration} 
            ref={el => { this.player = el; }} src={this.props.tune} type="audio/mpeg"></audio>
            <p className="sound-title"><span>Omen - can you believe</span></p>
            
            <div className="player-btns">
                <button><i className="fa fa-angle-double-left"></i></button>
                <button onClick={this.play}><i className="fa fa-play"></i></button>
                <button onClick={this.stop}><i className="fa fa-stop"></i></button>
                <button><i className="fa fa-angle-double-right"></i></button>
            </div>
            {this.state.duration && 
                <div className="progress-bar">
                    <progress className="player-progress" value={this.state.currentTime} max={this.state.duration}>
                    </progress>
                    <span style={{left: this.state.currentTime}}>{this.state.currentTime}s</span>
                </div>
                
            }
            
        </div>
        );
    }
}
 
export default Player;