import React from 'react';
import './form.css';
import * as Types from '../../constants/inputsTypes';
import FormInput from './formInput/formInput';
import { validateInput } from '../../services/inputValidator';
import SpinnerButton from '../UI/spinner-button/spinner-button';
import { isSomethingExists } from '../../services/helperMethods';
class Form extends React.PureComponent{
    state = {
        items: [],
        isSubmiting: false,
        ableToSubmit: null
    }
    componentDidMount(){
        const items = [];
        for(let i = 0; i < Types[this.props.type].length; i++)
            items.push({value: "", error: ""});
        this.setState({items: items});
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.submitErrors !== this.props.submitErrors)
            this.setState({isSubmiting: false});
    }
    onChange = (value, itemsId) => {
        const newItems = [...this.state.items];
        newItems[itemsId].value = value;
        newItems[itemsId].error = validateInput(value, 
            Types[this.props.requirements][itemsId]);
        
           
        const ableToSubmit = isSomethingExists(newItems, "error");
        this.setState({items: newItems, ableToSubmit: !ableToSubmit});
    }
    validateBeforeSubmit = () => {
        const newItems = [...this.state.items];
        for(let i = 0; i < newItems.length; i++){
            newItems[i].error = validateInput(newItems[i].value, 
                Types[this.props.requirements][i]);
        }
        return newItems;
    }
    onSubmit = e => {
        e.preventDefault();
        const items = this.validateBeforeSubmit();
        const ableToSubmit = isSomethingExists(items, "value");
        if(!ableToSubmit){
            this.setState({items: items, ableToSubmit: false})
        }
        else{
           this.setState({isSubmiting: true, ableToSubmit: true});
           this.props.onSubmit(this.state.items[0].value, 
            this.state.items[1].value);
        }
       
    }
    render(){
        const {items} = this.state;
        console.log(this.props.submitResult);
        return (
            <form onSubmit={e => this.onSubmit(e)} className="u-form-container">
                <header>
                    <h1>{this.props.formTitle}</h1>
                </header>
                {items.length > 0 && 
                    Types[this.props.type].map((i, index) => {
                    return (
                        <FormInput
                        onChange={e => this.onChange(e.target.value, index)}
                        value={items[index].value}
                        error={items[index].error}
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
                btnName="Zaloguj"
                disClass="reg-btn-dis"
                corClass="reg-btn-cor"
                />

                {this.props.submitResult !== null && 
                    <p className="server-error">
                        {!this.props.submitResult ? this.props.submitErrors[0] : null}
                    </p>
                }
            </form>
        );
    }
}

export default Form;
