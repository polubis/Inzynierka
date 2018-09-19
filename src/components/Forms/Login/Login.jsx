import React from 'react';
import './Login.css';
import { connect } from 'react-redux';
import { loginActionCreator, logIn } from '../../../store/actions/Authenticate';
import Form from '../../UI/form/form';
import { withRouter } from 'react-router-dom';
import { formTitlesGenerator } from '../../../constants/formTitles';
import Button from '../../UI/button/button';
class Login extends React.PureComponent {
    state = {
        formItems: []
    }
    setFields = (name, formItems) => { 
        this.setState({[name]: formItems});
    }
    pushIntoRouteWithClear = () => {
        this.props.clearLoginData(null, [], null, "");
        this.props.pushIntoRoute("/");
    }
    render() { 
        const { loginErrors, loginResult, history, login } = this.props;
        const { formItems } = this.state;
        return ( 
        <main className="login-form-container">
            <Form {...formTitlesGenerator("loginTypes", "loginRequirements", "Logowanie")} 
            onSubmit={() => login(formItems, history)} 
            formItems={formItems}
            arrayName="formItems"
            setFields={this.setFields}
            submitErrors={loginErrors} 
            submitResult={loginResult}
            btnTitle="Zaloguj"/>

            <Button name="Powrót" 
            className="btn btn-abs medium-btn go-next-btn" 
            onClick={this.pushIntoRouteWithClear}/>
        </main>
        )
    }
}

const mapStateToProps = state => {
    return {
        loginResult: state.Authenticate.loginResult,
        loginErrors: state.Authenticate.loginErrors
    };
}

const mapDispatchToProps = dispatch => {
    return {
        login: (loginArray, history) => dispatch(loginActionCreator(loginArray, history)),
        clearLoginData: (loginStatus, loginErrors, loginObject, token) => dispatch(logIn(loginStatus, loginErrors, loginObject, token))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
