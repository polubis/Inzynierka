import React, { Component } from 'react';
import './Login.css';
import { validateInput } from '../../../services/inputValidator';
import { connect } from 'react-redux';
import { loginActionCreator } from '../../../store/actions/actions';
import Form from '../../form/form';
import { withRouter } from 'react-router-dom';
import { formTitlesGenerator } from '../../../constants/formTitles';
class Login extends Component {
    onSubmit = (login, password) => {
        this.props.login(login, password, this.props.history);
    }
    render() { 
        const props = {...this.props};
        return ( 
        <main className="login-form-container from-navbar-padding">
            <Form {...formTitlesGenerator("loginTypes", "loginRequirements", "Logowanie")} 
            onSubmit={this.props.login} 
            submitErrors={props.loginErrors} 
            submitResult={props.loginResult}/>
        </main>
        )
    }
}

const mapStateToProps = state => {
    return {
        loginResult: state.Authenticate.loginResult,
        loginErrors: state.Authenticate.loginErrors,
        token: state.Authenticate.token
    };
}

const mapDispatchToProps = dispatch => {
    return {
        login: (login, password, history) => dispatch(loginActionCreator(login, password, history))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
