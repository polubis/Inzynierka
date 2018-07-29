import React, { Component } from 'react';
import './Quiz.css';
import Button from '../../components/UI/button/button';
import { withRouter } from 'react-router';
import Clock from './clock/clock';
import BeforeStartPrompt from './beforeStartPrompt/beforeStartPrompt';
import Counter from './counter/counter';
import { basicContentItems, quizTypes } from '../../constants/quiz';

const basicContent = (
    <article>
        <p>{basicContentItems.header}</p>
        {basicContentItems.content}
    </article>
);
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
        isOpenedFirstTime: true,

        startCounter: 3,
        showStartCounting: null
    }
    goIntoNextLevel = () => { 
        this.setState({actualLevel: this.state.actualLevel + 1})
    }
    startGame = () => {
        this.setState({isOpenedFirstTime: false, showStartCounting: true});
        this.intervalId = setInterval(() => {this.counting()}, 1000);
    }
    counting = () => {
        if(this.state.startCounter !== 1)
            this.setState({startCounter: this.state.startCounter-1});
        else{
            clearInterval(this.intervalId); 
            this.setState({shouldStart: true, showStartCounting: false});
        }
    }
    componentWillUnmount(){
        clearInterval(this.intervalId);
    }
    render() { 
        const { levels, actualLevel, shouldStart,
            isOpenedFirstTime, showStartCounting, startCounter } = this.state;
        const { push } = this.props.history;
        return ( 
            <div className="quiz-container">
                <Clock shouldStart={shouldStart}/>
                
                <div className="quiz-content">
                    {isOpenedFirstTime && 
                        <BeforeStartPrompt key={1} header="Zanim rozpoczniesz" name="Rozpocznij"
                        className="small-btn" onClick={this.startGame}>
                            {basicContent}
                        </BeforeStartPrompt>
                    }
                    
                    {showStartCounting && 
                        <Counter currentCounter={startCounter} />
                    }

                    {(!shouldStart && showStartCounting === false) && 
                        <p className="paused-game-info">
                            Gra została wstrzymana
                        </p>
                    }

                    {(shouldStart && showStartCounting === false) && 
                        <div className="quiz-question-container">
                            Tu beda pytania
                        </div>

                    }

                </div>

                <ul className={`quiz-navigation ${!shouldStart ? "q-nav-open" : "q-nav-closed"}`}>
                    {levels.map((level, index) => {
                        return ( 
                            <li className={index <= actualLevel ? "reached" : null} key={level}>
                              {level}  
                            </li>
                        );
                    })}
                </ul>
               
                <div className="quiz-options-top">
                    {showStartCounting || 
                        <i onClick={
                            isOpenedFirstTime ? this.startGame :
                            () => this.setState({shouldStart: !shouldStart})
                        } 
                        className={`fa ${shouldStart ? "fa-pause" : "fa-play"}`}></i>
                    }
                    
                </div>

                <Button
                onClick={() => push("/main")}
                name="Wyjdź"
                className="medium-btn go-next-btn"
                />
            </div> 
        );
    }
}
 
export default withRouter(Quiz);