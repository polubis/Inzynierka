import React, { Component } from 'react';
import './Quiz.css';
import Button from '../../components/UI/button/button';
import { withRouter } from 'react-router';
import Clock from './clock/clock';
import BeforeStartPrompt from './beforeStartPrompt/beforeStartPrompt';
const quizTypes = ["basic", "advanced", "master"];

class Quiz extends Component {
    state = {
        quizType: "",
        levels: [
            "Pierwszy",
            "Drugi",
            "Trzeci",
            "Czwarty",
            "Piąty",
            "Szósty",
            "Siódmy",
            "Ósmy",
            "Dziewiąty",
            "Dziesiąty"
        ],
        actualLevel: 0,
        shouldStart: false,
        isPaused: false
    }
    goIntoNextLevel = () => { 
        this.setState({actualLevel: this.state.actualLevel + 1})
    }
    render() { 
        const { levels, actualLevel, shouldStart, isPaused } = this.state;
        const { push } = this.props.history;
        return ( 
            <div onClick={this.goIntoNextLevel} className="quiz-container">
                <div className="quiz-content">
                    
                    {shouldStart && 
                        <BeforeStartPrompt key={1}/>
                    }
                    {isPaused && 
                        <BeforeStartPrompt key={2}/>
                    }
                
                </div>
                <ul className="quiz-navigation">
                    {levels.map((level, index) => {
                        return ( 
                            <li className={index <= actualLevel ? "reached" : null} key={level}>
                              {level}  
                            </li>
                        );
                    })}
                </ul>
                <Button
                onClick={() => push("/main")}
                name="Wyjdź"
                className="medium-btn go-next-btn"
                />
            
                <Clock shouldStart={shouldStart}/>
            </div> 
        );
    }
}
 
export default withRouter(Quiz);