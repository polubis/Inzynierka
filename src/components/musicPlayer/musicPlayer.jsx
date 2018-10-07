import React from 'react';
import './musicPlayer.scss';


class MusicPlayer extends React.PureComponent{
    state = {
        playState: ""
    }

    play = () => {
        const { musicSource } = this.props;
        this.musicPlayer.src = musicSource;
        
        this.musicPlayer.play().then(() => {
            console.log("Jest grane");
            this.setState({playState: "playing"});
        }).catch(error => console.log(error));
    }
    stop = () => {
        this.setState({playState: "stopped"});
        this.musicPlayer.pause();
        this.musicPlayer.src = "";
    }
    pause = () => {
        this.musicPlayer.pause();
        this.setState({playState: "paused"});
    }
    unpause = () => {
        this.musicPlayer.play().then(() => {
            this.setState({playState: "playing"});
        });
    }
    componentDidMount(){
        const { autoplay, playerState } = this.props;
        if(autoplay || playerState === "play")
            this.play();
    }

    componentDidUpdate(prevProps){
        const { playerState, musicSource } = this.props;
        if(musicSource !== prevProps.musicSource){
            this.play();
        }
        else if(prevProps.playerState !== playerState){
            switch(playerState){
                case "play":
                    this.play();
                    break;
                case "pause":        
                    this.pause();
                    break;
                case "unpause":
                    this.unpause();
                    break;
                case "stop":
                    this.stop();
                    break;
            }
        }
    }

    render(){
        const { playState } = this.state;
        const { showControls } = this.props;
        return (
            <React.Fragment>
                <audio onEnded={this.stop} src="" ref={el => { this.musicPlayer = el; }} type="audio/ogg">
                </audio>
                {showControls && 
                    <div className="player-controls row">
                        <button onClick={playState === "stopped" ? this.play : playState === "paused" ? this.unpause : playState === "playing" ? this.pause : this.play }>
                            <i className={`fa fa-${playState === "playing" ? "pause" : "play"}`}></i>
                        </button>
                        <button onClick={this.stop}>
                            <i className="fa fa-stop"></i>
                        </button>
                    </div>
                }
                
            </React.Fragment>
        );
    }
}
MusicPlayer.defaultProps = {
    musicSource: "",
    autoplay: false,
    showControls: true
}
export default MusicPlayer;