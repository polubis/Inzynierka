import React from 'react';
import './musicPlayer.scss';


class MusicPlayer extends React.PureComponent{
    state = {
        isPlaying: false,
        isPaused: false,
        isStopped: false
    }

    play = () => {
        const { musicSource } = this.props;
        this.musicPlayer.src = musicSource;
        
        this.musicPlayer.play().then(() => {
            this.setState({isPlaying: true});
        }).catch(error => console.log(error));
    }
    stop = () => {
        this.setState({isPlaying: false, isStopped: true});
        this.musicPlayer.pause();
        this.musicPlayer.src = "";
    }
    pause = () => {
        this.musicPlayer.pause();
        this.setState({isPaused: true, isPlaying: false});
    }
    unpause = () => {
        this.musicPlayer.play().then(() => {
            this.setState({isPaused: false, isPlaying: true});
        });
    }
    componentDidMount(){
        const { autoplay, playerState } = this.props;
        if(autoplay || playerState === "play")
            this.play();
    }

    componentDidUpdate(prevProps){
        const { playerState } = this.props;
        console.log(playerState);
  
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

    render(){
        return (
            <React.Fragment>
                <audio src="" ref={el => { this.musicPlayer = el; }} type="audio/ogg">
                </audio>
            </React.Fragment>
        );
    }
}
MusicPlayer.defaultProps = {
    musicSource: "",
    autoplay: false

}
export default MusicPlayer;