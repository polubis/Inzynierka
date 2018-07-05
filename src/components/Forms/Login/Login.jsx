import React from 'react';
import './Login.css';
import { connect } from 'react-redux';
import { loginActionCreator } from '../../../store/actions/actions';
import Form from '../../UI/form/form';
import { withRouter } from 'react-router-dom';
import { formTitlesGenerator } from '../../../constants/formTitles';
class Login extends React.PureComponent {
    render() { 
        const props = {...this.props};
        return ( 
        <main className="login-form-container from-navbar-padding">
            <Form {...formTitlesGenerator("loginTypes", "loginRequirements", "Logowanie")} 
            onSubmit={props.login} 
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
        login: (loginModel, history) => dispatch(loginActionCreator(loginModel, history))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
