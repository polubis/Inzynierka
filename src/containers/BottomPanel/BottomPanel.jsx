import React, { Component } from 'react';
import './BottomPanel.css';
import Transition from 'react-transition-group/Transition';
import SoundsTutorial from '../../components/SoundsTutorial/SoundsTutorial';
import { connect } from 'react-redux';
import { fetchUserACreator } from '../../store/actions/Authenticate';

class BottomPanel extends Component{

    componentDidMount(){
        this.props.fetchUser(1);
    }

    render(){
        return(
            <Transition 
            mountOnEnter
            unmountOnExit
            in={this.props.openBottomPanel}
            timeout={1000}>
                {state => (
                    <div className={`bottom-panel ${this.props.openBottomPanel ? 
                        "bottom-panel-on" : "bottom-panel-off"}`}>
                        <SoundsTutorial 
                        user={this.props.user}
                        fetchUserErrors={this.props.fetchUserErrors}
                        fetchUserResult={this.props.fetchUserResult}
                        />
                    </div>
                )}
            </Transition>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.User.user,
        fetchUserErrors: state.User.fetchUserErrors,
        fetchUserResult: state.User.fetchUserResult,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUser: (id) => dispatch(fetchUserACreator(id))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(BottomPanel);