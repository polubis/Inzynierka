import React from 'react';
import './form.css';
import * as Types from '../../../constants/inputsTypes';
import FormInput from './formInput/formInput';
import { validateInput, checkPasswordsAreTheSame } from '../../../services/inputValidator';
import SpinnerButton from '../spinner-button/spinner-button';
import { isSomethingExists, mapArrayIntoObject, isSomethingEqual } from '../../../services/helperMethods';
import ServerError from '../server-error-prompt/server-error';
class Form extends React.PureComponent{
    state = {
        isSubmiting: false,
        ableToSubmit: null
    }
    componentDidMount(){
        if(this.props.formItems.length === 0){
            const items = [];
            for(let i = 0; i < Types[this.props.type].length; i++){
                items.push({value: Types[this.props.type][i].type === "select" ? "wybierz pole" : "", error: ""});
            }
            this.props.setFields(this.props.arrayName, items);
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.submitErrors !== this.props.submitErrors)
            this.setState({isSubmiting: false});
    }
    onChange = (value, itemsId) => {
        const newItems = [...this.props.formItems];
        newItems[itemsId].value = value;
        newItems[itemsId].error = validateInput(value, 
            Types[this.props.requirements][itemsId]);

        if(this.props.comparePasswordIndexes){
            const { comparePasswordIndexes } = this.props;
            if(isSomethingEqual(comparePasswordIndexes, itemsId) && 
                newItems[comparePasswordIndexes[0]].value, newItems[comparePasswordIndexes[1]].value){
                    
                const result = checkPasswordsAreTheSame(newItems[comparePasswordIndexes[0]].value, 
                    newItems[comparePasswordIndexes[1]].value);
                    
                newItems[comparePasswordIndexes[0]].error = result;
                newItems[comparePasswordIndexes[1]].error = result;
            }
        }
       
        const ableToSubmit = isSomethingExists(newItems, "error").result;
        this.setState({ableToSubmit: !ableToSubmit});
        this.props.setFields(this.props.arrayName, newItems);
    }
   
    validateBeforeSubmit = () => {
        const newItems = [...this.props.formItems];
        for(let i = 0; i < newItems.length; i++){
            newItems[i].error = validateInput(newItems[i].value, 
                Types[this.props.requirements][i]);
        }
        return newItems;
    }
    onSubmit = e => {
        e.preventDefault();
        const items = this.validateBeforeSubmit();
        const ableToSubmit = isSomethingExists(items, "error").result;
        if(ableToSubmit){
            this.setState({ableToSubmit: false});
            this.props.setFields(this.props.arrayName, items);
        }
        else{
           this.setState({isSubmiting: true, ableToSubmit: true});
           this.props.onSubmit();
        }
       
    }
    render(){
        const { formItems } = this.props;
        const { additionalClasses } = this.props;
        const { submitResult } = this.props;
        const { submitErrors } = this.props;
        return (
            <form onSubmit={e => this.onSubmit(e)} className={`u-form-container ${additionalClasses}`}>
                <header>
                    <h1>{this.props.formTitle} {this.props.subHeader && <span>{this.props.subHeader}</span>}</h1>
                </header>
                {formItems.length > 0 && 
                    Types[this.props.type].map((i, index) => {
                    return (
                        <FormInput
                        nullable={Types[this.props.requirements][index].nullable} 
                        selectItems={i.selectItems}
                        onChange={e => this.onChange(e.target.value, index)}
                        value={formItems[index].value}
                        error={formItems[index].error}
                        key={i.title} 
                        type={i.type}
                        placeholder={i.holder}
                        title={i.title}
                        />
                        );
                    })
                }
                
                <SpinnerButton 
                startClass="reg-btn"
                isLoading={this.state.isSubmiting}
                btnType="submit"
                validation={this.state.ableToSubmit}
                btnName={this.props.btnTitle}
                disClass="reg-btn-dis"
                corClass="reg-btn-cor"
                />

                {(submitResult === false && submitResult !== undefined && 
                    submitErrors.length > 0) &&
                    <ServerError 
                    mainClass="server-error-container"
                    show={(submitResult === false && submitResult !== undefined && 
                    submitErrors.length > 0)}
                    content={submitErrors[0]} />
                }

                {this.state.isSubmiting || this.props.additionalBtn}
            </form>
        );
    }
}

export default Form;
