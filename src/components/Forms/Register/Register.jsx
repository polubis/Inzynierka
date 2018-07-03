import React, { Component } from 'react';
import './Register.css';
import { validateInput, checkPasswordsAreTheSame } from '../../../services/inputValidator';
import { connect } from 'react-redux';
import { sendRegisterEmailActionCreator } from '../../../store/actions/actions';
import ServerError from '../../UI/server-error/server-error';
import SpinnerButton from '../../UI/spinner-button/spinner-button';
import EmailConfirmCart from '../../UI/email-confirmation-cart/email-confirmation-cart';
/*
import moment from 'moment';
import 'moment/locale/pl';
*/
const passwordIndex = 2;
const repeatedPasswordIndex = 3;

class Register extends Component {
    state = {
        registerCoreItems: [
            {value: "", min: 5, max: 30, isNullAble: false, validation: "", 
            type:"text", title:"Nazwa użytkownika", placeholder: "wpisz nazwę użytkownika..."},
            {value: "", min: 7, max: 30, isNullAble: false, validation: "", 
            type:"text", title:"Adres email", placeholder: "wpisz adres email..."},
            {value: "", min: 5, max: 20, isNullAble: false, validation: "", 
            type:"password", title:"Hasło", placeholder: "wpisz hasło..."},
            {value: "", min: 5, max: 20, isNullAble: false, validation: "", 
            type:"password", title:"Powtórz hasło", placeholder: "powtórz hasło..."},
        ],
        submBtnActive: false,
        spinner: false,
        modalOpen: false
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.sendEmailError !== this.props.sendEmailError){
            setTimeout(() => {
                this.setState({spinner: false, modalOpen: (nextProps.activateLink !== "" && nextProps.sendEmailResult) ? 
                true : false});
            }, 1000);
        }
    }
    closeModal = () => {
        this.setState({modalOpen: false});
    }
    submitValidation = newItems => {
        let result = true;
        for(let key in newItems){
            newItems[key].validation = validateInput(newItems[key].value, 
                newItems[key].title, 
                newItems[key].isNullAble, 
                newItems[key].min, newItems[key].max);
            if(newItems[key].validation !== "")
                result = false;
        }
        if(newItems.length !== 3){
            if(newItems[passwordIndex].value !== "" && 
            newItems[repeatedPasswordIndex].value !== ""){
                const isPasswordsTheSame = checkPasswordsAreTheSame(newItems[passwordIndex].value, 
                    newItems[repeatedPasswordIndex].value);
                if(isPasswordsTheSame !== ""){
                    newItems[passwordIndex].validation = isPasswordsTheSame
                    newItems[repeatedPasswordIndex].validation = isPasswordsTheSame;
                    result = false;
                }
                else{
                    newItems[passwordIndex].validation = "";
                    newItems[repeatedPasswordIndex].validation = "";
                }
            }
        }
        
        this.setState({registerCoreItems: newItems, submBtnActive: this.checkForMistakesInForm(newItems)});

        return result;
    }
    
    

    validate = (index, newArray, currentVal) => {
        newArray[index].validation = validateInput(currentVal, 
            newArray[index].title, 
            newArray[index].isNullAble, 
            newArray[index].min, newArray[index].max);
        
        if(newArray.length !== 3){
            if(newArray[passwordIndex].value !== "" && 
            newArray[repeatedPasswordIndex].value !== ""){
            const isPasswordsTheSame = checkPasswordsAreTheSame(newArray[passwordIndex].value, 
                newArray[repeatedPasswordIndex].value);

            if(isPasswordsTheSame !== ""){
                newArray[passwordIndex].validation = isPasswordsTheSame
                newArray[repeatedPasswordIndex].validation = isPasswordsTheSame;
            }
            else{
                newArray[passwordIndex].validation = "";
                newArray[repeatedPasswordIndex].validation = "";
            }
        }
        }
        
        return newArray;
    }
    checkForMistakesInForm = formArray => {
        for(let key in formArray)
            if(formArray[key].validation !== "")
                return true;
        
        return false;
    }
    onChangeRegisterItems = (index, e, itemsToChange) => {
        const newRegisterItems = [...itemsToChange];
        newRegisterItems[index].value = e.target.value;
        const validationResult = this.validate(index, newRegisterItems, e.target.value);
        const shouldSubmBtnActive = this.checkForMistakesInForm(validationResult);


        this.setState({registerCoreItems: validationResult, 
            submBtnActive: shouldSubmBtnActive});
    }

    onSubmitHandler = e => {
        e.preventDefault();
        const result = this.submitValidation([...this.state.registerCoreItems]);
        if(result){
            this.setState({spinner: true});
            this.props.sendRegisterEmail(this.state.registerCoreItems);
        }
    }
    onChangeSelect = e => {
        this.setState({sex: e.target.value});
    }
 
    /**
     *  {(!this.state.spinner && this.props.sendEmailResult === false) ? 
                <ServerError error={this.props.sendEmailError[0]} />
                : <h2>Rejestracja</h2>}
                    <div className="register-inputs-container">
                        {this.state.registerCoreItems.map((i, index) => {
                        return (
                            <Input
                            key={i.title} 
                            title={i.title}
                            max={this.state.registerCoreItems[index].max} 
                            value={this.state.registerCoreItems[index].value}
                            onChange={e => this.onChangeRegisterItems(index, e, this.state.registerCoreItems)}
                            type={i.type}
                            placeholder={i.placeholder}
                            validation={this.state.registerCoreItems[index].validation}
                            />
                        );
                        })}
                    </div>
                
                <SpinnerButton 
                startClass="reg-btn"
                spinner={this.state.spinner}
                btn={this.state.submBtnActive}
                btnName="Prześlij"
                disClass="reg-btn-dis"
                corClass="reg-btn-cor"
                />
                

                
            </form> 
            
           <EmailConfirmCart closeModal={this.closeModal} 
           modalOpen={this.state.modalOpen} />
     */
    render() { 
        return ( 
        <div className="register-form-container">
           
        </div>
        
        )
    }
}
 

const mapStateToProps = state => {
    return {
        sendEmailResult: state.Authenticate.sendEmailResult,
        sendEmailError: state.Authenticate.sendEmailError
    };
}

const mapDispatchToProps = dispatch => {
    return {
        sendRegisterEmail: (registerCoreItems) => dispatch(sendRegisterEmailActionCreator(registerCoreItems))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);