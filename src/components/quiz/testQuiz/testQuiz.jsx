import React from 'react'
import './testQuiz.css';

class TestQuiz extends React.PureComponent{
    state = {
        currentLevel: 1
    }
    render(){
        return (
            <div className="test-quiz-container">
                <div className="t-quiz-wrapper">
                    <header className="test-quiz-navigation">
                        <h1>Adept dźwięków</h1>
                        <div className="statistics-nav">
                            <div className="nav-stat">
                                <span>Pozostały czas: 3s</span>
                                <i className="fa fa-clock"></i>
                            </div>
                        </div>
                    </header>
                    <main className="quiz-content">


                    </main>
                </div>
            </div>
        );
    }
}
export default TestQuiz;