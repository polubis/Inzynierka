import React from 'react';
import './quizInstruction.scss';
import Button from '../../../UI/button/button';
import Timer from '../../timer/timer';
class QuizInstruction extends React.PureComponent{
    state = {
        currentCart: 0
    }
    putCartIntoDom = () => {
        const { currentCart } = this.state;
        const { startQuiz } = this.props;
        if(currentCart === 0)
            return (
                <div>
                    <header>
                        Witaj w <span className="dots">Quizie</span>, który zweryfikuje twój słuch muzyczny
                    </header>
                    <article>
                        <p>Wybrany przez Ciebie tryb pozwala na przejście quizu składającego się z <span>dziesięciu pytań</span></p>
                        <p>W<span> panelu bocznym</span> przedstawiony jest Twój progres dotyczący obecnego quizu</p>
                        <div className="row-column">
                            <Button onClick={this.goToNextCart} name="Dalej" className="medium-btn quiz-cart-btn" />
                            <Button onClick={() => this.setState({currentCart: 4})} name="Pomiń i graj" className="medium-btn quiz-instruction-nt-main-btn" />
                        </div>
                    </article>
                </div>
              
            );

        if(currentCart === 1)
            return (
                <div>
                    <header>
                        Zasady gry w trybie <span className="dots">Dźwięków</span>
                    </header>
                    <article>
                        <p>Podczas odpowiadania pytań przez pierwsze kilka sekund będziesz miał możliwość wpisania <span>własnej odpowiedzi</span> </p>
                        <p>Następnie po upływie <span>kilku sekund</span> pokazanych zostanie <span>kilka podpowiedzi</span></p>
                        <p>Odpowiedź przed <span>pokazaniem proponowanych</span> wariantów jest punktowana dodatkowo</p>
                        <Button onClick={this.goToNextCart} name="Dalej" className="medium-btn quiz-cart-btn"/>
                    </article>
                </div>
            );
        
        if(currentCart === 2)
            return (
                <div>
                    <header>
                        Po zakończeniu rozgrywki twój wynik zostanie umieszczony w <span className="dots">rankingu</span>
                    </header>
                    <article>
                        <p>Po każdym zakończonym Quizie system wyświetli podsumowanie rozgrywki w postaci <span>szczegółowych statystyk</span></p>
                        <p>Statystyki obowiązują we wszystkich trybach z wyjątkiem trybu <span>Samouczek</span></p>
                        <p>Otrzymana punktacja jest uwarunkowana <span>wybranym trybem</span></p>
                        <Button onClick={this.goToNextCart} name="Dalej" className="medium-btn quiz-cart-btn"/>
                    </article>
                </div>
            );
        if(currentCart === 3)
            return (
                <div>
                    <header>
                        Podczas gry dostępne są <span className="dots">dwie pauzy</span>, które trwają <span>15 sekund</span>
                    </header>
                    <article>
                        <p>Podczas skorzystania z pauzy w <span>menu nawigacyjnym</span> pojawi się odliczanie</p>
                        <p>Po ukończeniu odliczania gra zostanie <span>wznowiona automatycznie</span></p>
                        <p>Wyjście ze strony lub zmiana zakładki podczas trwania quizu skutkuje otrzymaniem <span>zerowej oceny</span></p>
                        <p>Jeżeli jesteś gotowy klikni w przycisk <span>Rozpocznij</span></p>
                        <Button onClick={this.goToNextCart} name="Rozpocznij" className="medium-btn quiz-cart-btn"/>
                    </article>
                </div>
            );
        if(currentCart === 4)
            return <Timer numberOfDigitsToShow={0} frequency={1200} accuracy={1} startTime={3} shouldDecrement timerEndFunction={startQuiz} />;
    }
    goToNextCart = () => {
        const { currentCart } = this.state;
        this.setState({currentCart: currentCart+1});
    }

    render(){
        const { isOpenedFirstTime } = this.state;
        return (
        <div className="quiz-instruction">
            {this.putCartIntoDom()}
        </div>
        );
    }
}

export default QuizInstruction;