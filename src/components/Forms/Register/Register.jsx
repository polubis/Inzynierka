import React from "react";
import "./Register.css";
import { connect } from "react-redux";
import { sendRegisterEmailActionCreator } from "../../../store/actions/actions";
import Form from "../../UI/form/form";
import { formTitlesGenerator } from "../../../constants/formTitles";
import Button from '../../UI/button/button';
class Register extends React.PureComponent {
  state = {
    blockNumber: 1,
    registerObject: null
  };
  changeToNextBlock = registerObject => {
    this.setState({blockNumber: this.state.blockNumber + 1, registerObject: registerObject});
  }
  onSubmit = registerObject => {
    let oldRegisterObject = {...this.state.registerObject};
    const newRegisterObject = Object.assign(oldRegisterObject, registerObject);
    this.props.sendRegisterEmail(newRegisterObject);
  }
  render() {
    const props = {...this.props};
    return (
      <div className="register-form-container">
        {this.state.blockNumber === 1 ? (
          <Form
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
          />
        ) : (
          <Form
            additionalClasses="space-from-bottom"
            subHeader="Etap 2"
            key={2}
            {...formTitlesGenerator(
              "registerDetailsTypes",
              "registerDetailsRequirements",
              "Rejestracja"
            )}
            onSubmit={this.onSubmit}
            submitErrors={props.sendEmailError}
            submitResult={props.sendEmailResult}
            additionalBtn={
              <Button 
              name="Cofnij"
              className="btn btn-abs form-hlp-btn"
              onClick={() => this.setState({blockNumber: 1})}
              />
              }
          />
            
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    sendEmailResult: state.Authenticate.sendEmailResult,
    sendEmailError: state.Authenticate.sendEmailError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendRegisterEmail: registerModel =>
      dispatch(sendRegisterEmailActionCreator(registerModel))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);
