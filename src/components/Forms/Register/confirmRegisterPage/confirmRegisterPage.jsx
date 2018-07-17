import React from 'react';
import './confirmRegisterPage.css';
import { connect } from 'react-redux';
import { endRegisterActionCreator } from '../../../../store/actions/Authenticate';
import Spinner from '../../../UI/spinner/spinner';
import { scrollBottom } from '../../../../services/componentsMethods';
import Button from '../../../UI/button/button';

class ConfirmRegisterPage extends React.PureComponent{
    state = {
        isLoading: true
    }
    componentDidMount(){ this.props.endRegisterActionCreator(window.location.href); }
   
    componentWillReceiveProps(nextProps){
        if(this.props.registerError !== nextProps.registerError){
            if(nextProps.registerError[0] === "Nieprawidłowy link aktywacyjny"){
                this.props.redirectToHomePage("/");
            }
            else{
                scrollBottom(this.scrollRef);
                this.setState({isLoading: false});
            }
        }
    }
    
    refreshPage = () => {
        window.location.href = window.location.href;
    }
    render(){
        const { registerResult, registerError, redirectToHomePage } = this.props;
        const { isLoading } = this.state;
        return (
            <div ref={el => { this.scrollRef = el }} className="confirm-register-page-container">
                {isLoading ? 
                    <Spinner /> : 
                    registerResult !== null && 
                    registerResult ? 
                    <div className="conf-reg-informations">
                    dasdasdsa
                    </div> 
                    :
                    <div className="conf-reg-informations">
                        <p className="error-occured">{registerError[0]}</p>
                        <article>
                            Podczas aktywacji konta wystąpił powyższy błąd. Upewnij się czy link aktywacyjny znajdujący
                            się w adresie przeklądarki, pokrywa się z linkiem wysłanym przez nas na twoją pocztę, a następnie
                            odśwież stronę lub kliknij w poniższy przycisk. <br/><br/>

                            W przypadku dalszych problemów skontaktuj się z naszym działem wsparcia <b>mcomposesupport@gmail.com</b>

                            <Button name="Odśwież" 
                            className="medium-btn go-next-btn" 
                            onClick={this.refreshPage} />

                            <Button name="Wróć" 
                            className="medium-btn go-next-btn" 
                            onClick={() => redirectToHomePage("/")} />
                        </article>
                    </div>
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
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        endRegisterActionCreator: (currentUrl) => dispatch(endRegisterActionCreator(currentUrl))
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmRegisterPage);
  