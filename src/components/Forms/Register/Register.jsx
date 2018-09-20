import React from "react";
import "./Register.css";
import { connect } from "react-redux";
import { sendRegisterEmailActionCreator, sendRegisterEmail } from "../../../store/actions/Account.js";
import Form from "../../UI/form/form";
import { formTitlesGenerator } from "../../../constants/formTitles";
import Button from '../../UI/button/button';
import RegisterModal from '../../modals/register';

class Register extends React.PureComponent {
  state = {
    blockNumber: 1,
    formItems: [], 
    secondFormItems: [],
    showSendEmailModal: false
  };
  componentWillReceiveProps(nextProps){
    if(nextProps.sendEmailResult === true){
      this.setState({showSendEmailModal: true});
    }
  }
  changeToNextBlock = registerObject => {
    this.setState({blockNumber: this.state.blockNumber + 1, registerObject: registerObject});
  }
  onSubmit = () => {
    const { formItems, secondFormItems } = this.state;
    this.props.sendRegisterEmail(formItems, secondFormItems);
  }
  setFields = (name, formItems) => { 
    this.setState({[name]: formItems});
  }
  pushIntoRouteWithDataClear = () => {
    this.props.clearRegisterData(null, []);
    this.props.pushIntoRoute("/");
  }
  render() {
    const { sendEmailError, sendEmailResult } = this.props;
    const { formItems, secondFormItems, showSendEmailModal } = this.state;
    return (
      <div className="register-form-container">
        {this.state.blockNumber === 1 ? (
          <Form
            setFields={this.setFields}
            arrayName="formItems"
            formItems={formItems}
            additionalClasses="space-from-bottom"
            key={1}
            {...formTitlesGenerator(
              "registerTypes",
              "registerRequirements",
              "Rejestracja"
            )}
            subHeader="Etap 1"
            onSubmit={this.changeToNextBlock}
            comparePasswordIndexes={[2,3]}
            btnTitle="Dalej"
          />
        ) : (
          <Form
            setFields={this.setFields}
            arrayName="secondFormItems"
            formItems={secondFormItems}
            additionalClasses="space-from-bottom"
            subHeader="Etap 2"
            key={2}
            {...formTitlesGenerator(
              "registerDetailsTypes",
              "registerDetailsRequirements",
              "Rejestracja"
            )}
            onSubmit={this.onSubmit}
            submitErrors={sendEmailError}
            submitResult={sendEmailResult}
            btnTitle="Załóż konto"
            additionalBtn={
              <Button 
              name="Cofnij"
              className="btn btn-abs form-hlp-btn"
              onClick={() => this.setState({blockNumber: 1})}
              />
              }
          />
            
        )}
        <Button name="Powrót" 
        className="medium-btn go-next-btn" 
        onClick={this.pushIntoRouteWithDataClear} />

        <RegisterModal close={() => this.setState({ showSendEmailModal: false })} 
          username={formItems.length > 0 ? formItems[0].value : ""} 
          email={formItems.length > 0 ? formItems[1].value : ""} show={showSendEmailModal} />
       
     
        
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    sendEmailResult: state.Account.sendEmailResult,
    sendEmailError: state.Account.sendEmailError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendRegisterEmail: (firstArray, secondArray) =>
      dispatch(sendRegisterEmailActionCreator(firstArray, secondArray)),
    clearRegisterData: (sendEmailResult, sendEmailError) => dispatch(sendRegisterEmail(sendEmailResult, sendEmailError))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);
