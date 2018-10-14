import React from 'react';
import Form from '../../UI/form/form';
import { formTitlesGenerator } from '../../../constants/formTitles';

class QuizSettings extends React.PureComponent{
    state = {
        formItems: []
    }
    setFields = (name, formItems) => { 
        this.setState({[name]: formItems});
    }
    onSubmitHandler = () => {
        console.log(this.state.formItems);
        this.props.changeSettings(this.state.formItems);
    }

    render(){
        const { settings } = this.props;
        const { formItems } = this.state;
        return (
            <Form 
                shouldShowLoadingAnimation={false} inputContainerClass="tiny-input" shouldShowHeader={false}
                setFields={this.setFields} arrayName="formItems" defaultValues={settings}
                formItems={formItems}
                onSubmit={this.onSubmitHandler}
                {...formTitlesGenerator(
                "quizSettingsTypes",
                "quizSettingsRequirements",
                "Ustawienia"
                )}
                btnTitle="Rozpocznij"
            />
        );
    }
}

export default QuizSettings;