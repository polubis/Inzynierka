import React, { Component } from 'react';
import './EmailConfirmationPage.css';
import { connect } from 'react-redux';
import { endRegisterActionCreator } from '../../store/actions/actions';
import Prompt from '../UI/full-prompt/full-prompt';
import Spinner from '../UI/spinner/spinner';
import { Link } from 'react-router-dom';

class EmailConfirmationPage extends Component{
    state = {
        isLoading: true
    }
    componentDidMount(){
        this.props.endRegister(window.location.href);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.registerError !== this.props.registerError){
            this.setState({isLoading: false});
        }
            
    }
    render(){
        return (
            <div className="email-confirmation-page">
                {this.state.isLoading ? 
                <Spinner /> :

                this.props.registerResult !== null && 
                    this.props.registerResult === true ? 
                    <div className="correct-register-content">
                        <Prompt promptIcon={<i className="fa fa-check"></i>} 
                        promptType="succ-prompt" message={`Witaj ${this.props.registerUserData.username} udało Ci się pomyślnie zarejestrować`} />

                        <h3>Twoje konto zostało utworzone z datą {this.props.registerUserData.modifiedDate.slice(0, 10)}
                            <b>{this.props.registerUserData.modifiedDate.slice(11,17)}</b></h3>
                        <p>Aby rozpoczać przygodę z naszym serwisem  <Link to="/login">przejdź do logowania!</Link></p>
                     
                    </div>
                    :
                    <Prompt promptIcon={<i className="fa fa-times"></i>}  
                    promptType="error-prompt" message={this.props.registerError[0]} />
                }
             

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        registerResult: state.Authenticate.registerResult,
        registerError: state.Authenticate.registerError,
        registerUserData: state.Authenticate.registerUserData
    };
}

const mapDispatchToProps = dispatch => {
    return {
        endRegister: (url) => dispatch(endRegisterActionCreator(url))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(EmailConfirmationPage);
