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
    
    refreshPage = () => { window.location.href = window.location.href; }
    
    render(){
        const { registerResult, registerError, redirectToHomePage, registerUserData } = this.props;
        const { isLoading } = this.state;
        return (
            <div ref={el => { this.scrollRef = el }} className="confirm-register-page-container">
                {isLoading ? 
                    <Spinner /> : 
                    registerResult !== null && 
                    registerResult ? 
                    <div className="conf-reg-informations">
                        <p className="correct-reg-message">Twoje konto zostało aktywowane</p>
                        <article>
                            Założone przez Ciebie konto umożliwi Ci wykorzystanie możliwości naszego serwisu 
                            zgodnie z jego przeznaczeniem. Poniższe statystki pomogą Ci z ewentualnymi
                            problemami dotyczącymi użytkowania serwisu. Zapisanie ich gwarantuje szybką odpowiedź
                            podczas kontaktu z naszym oddziałem wsparcia. 
                            <p>Pozdrawiamy <b>mcomposesupport@gmail.com</b></p>
                        </article>
                        <h3>Szczegóły dotyczące rejestracji</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Data utworzenia konta</th>
                                    <th>Data potwierdzenia konta</th>
                                    <th>Nazwa użytkownika</th>
                                    <th>Adres email</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                <tr>
                                    <td>{registerUserData.creationDate}</td>
                                    <td>{registerUserData.modifiedDate}</td>
                                    <td>{registerUserData.username}</td>
                                    <td>{registerUserData.email}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="reg-detail-container">
                            <p className="reg-detail">Data utworzenia konta: <b>{registerUserData.creationDate}</b></p>
                            <p className="reg-detail">Data potwierdzenia konta: <b>{registerUserData.modifiedDate}</b></p>
                            <p className="reg-detail">Nazwa użytkownika: <b>{registerUserData.username}</b></p>
                            <p className="reg-detail">Adres email: <b>{registerUserData.email}</b></p>
                        </div>
                        
                        <Button name="Wróć" 
                            className="medium-btn go-next-btn" 
                            onClick={() => redirectToHomePage("/")} />              
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
  