import React from 'react';
import './Login.css';
import { connect } from 'react-redux';
import { loginActionCreator, clearTheData } from '../../../store/actions/actions';
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
        this.props.clearTheData({loginResult: null, loginErrors: []});
        this.props.pushIntoRoute("/");
    }
    render() { 
        const { loginErrors, loginResult, history, login } = this.props;
        const { formItems } = this.state;
        return ( 
        <main className="login-form-container from-navbar-padding">
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
        loginErrors: state.Authenticate.loginErrors,
        token: state.Authenticate.token
    };
}

const mapDispatchToProps = dispatch => {
    return {
        login: (loginArray, history) => dispatch(loginActionCreator(loginArray, history)),
        clearTheData: ({ content }) => dispatch(clearTheData({ content }))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
