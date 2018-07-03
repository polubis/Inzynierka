import React, { Component } from 'react';
import './SoundsTutorial.css';
import { connect } from 'react-redux';
import LeftPart from './LeftPart/LeftPart';
import RightPart from './RightPart/RightPart';
import { loadTracksActionCreator } from '../../store/actions/actions';
import Sound from '../../assets/testSounds/gtr-nylon22.mp3';

class SoundsTutorial extends Component {
    state = {
        isTracksLoading: true
    }
    componentDidMount(){
        this.props.loadTracks();
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.loadTracksErrors !== this.props.loadTracksErrors)
            this.setState({isTracksLoading: false});
    }

   
    render() { 
        return ( 
            <div className="sounds-tutorial-container">
                <h2>Muzyka społeczności</h2>
                <main>
                   <LeftPart tune={Sound}/>
                   <RightPart 
                   data={this.props.loadedTracks}
                   error={this.props.loadTracksErrors}
                   result={this.props.loadTrackResult}
                   isLoading={this.state.isTracksLoading}/>
                </main>
                
              
            </div>
        )
    }
}
 

const mapStateToProps = state => {
    return {
        loadedTracks: state.User.loadedTracks,
        loadTracksErrors: state.User.loadTracksErrors,
        loadTrackResult: state.User.loadTrackResult
    };
}

const mapDispatchToProps = dispatch => {
    return {
        loadTracks: () => dispatch(loadTracksActionCreator())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(SoundsTutorial);