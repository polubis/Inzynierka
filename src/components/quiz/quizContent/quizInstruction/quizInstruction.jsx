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
        const { startQuiz, settings } = this.props;
        if(currentCart === 0)
            return (
                <div>
                    <header>
                        Witaj w <span className="dots">Quizie</span>, który zweryfikuje twój słuch muzyczny
                    </header>
                    <article>
                        <p>Wybrany przez Ciebie tryb pozwala na przejście quizu składającego się z <span>{settings.numberOfQuestions}</span> pytań</p>
                        <p>W<span> panelu bocznym</span> przedstawiony jest Twój progres dotyczący obecnego quizu</p>
                        <div className="row-column">
                            <Button onClick={this.goToNextCart} name="Dalej" className="medium-btn quiz-cart-btn" />
                            <Button onClick={() => this.setState({currentCart: 5})} name="Pomiń i graj" className="medium-btn quiz-instruction-nt-main-btn" />
                        </div>
                    </article>
                </div>
              
            );

        if(currentCart === 1)
            return (
                <div>
                    <header>
                        Wybrany przez Ciebie tryb <span className="dots">{settings.translation}</span> posiada następujące zasady
                    </header>
                    <article>
                        <p>Podczas rozpoczęcia każdego pytania użytkownik startuję z <span>bazową liczbą podpowiedzi</span>, które zależą od trybu</p>
                        <p>Następnie po upływie <span>kilku sekund</span> z puli podpowiedzi będą znikały kolejne warianty</p>
                        <p>Liczba punktów uwarunkowana jest <span>czasem</span> oraz tym ile razy <span>system zabierze podpowiedzi</span></p>
                        <Button onClick={this.goToNextCart} name="Dalej" className="medium-btn quiz-cart-btn"/>
                    </article>
                </div>
            );
        
        if(currentCart === 2)
            return (
                <div>
                    <header>
                        Po zakończeniu rozgrywki zobaczysz swoje <span className="dots">statystyki</span>
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
                    W grze istnieją również <span className="dots">Tryby rankingowe</span>
                </header>
                <article>
                    <p>Rozgrywki oznaczone specjalną <span>ikoną</span> brać udział w rozgrywkach rankingowych</p>
                    <p><span>Najlepsi użytkownicy</span> zostaną uchorowani na stronie startowej</p>
                    <Button onClick={this.goToNextCart} name="Dalej" className="medium-btn quiz-cart-btn"/>
                </article>
            </div>
        );
        if(currentCart === 4)
            return (
                <div>
                    <header>
                        Podczas gry dostępne są <span className="dots">{settings.numberOfPauses} pauzy</span>, które trwają <span>{settings.timeForPause} sekund</span>
                    </header>
                    <article>
                        <p>Podczas skorzystania z pauzy w pokaże się <span>okienko z informacjami</span> oraz czas pauzy</p>
                        <p>Po ukończeniu odliczania gra zostanie <span>wznowiona automatycznie</span></p>
                        <p>Wyjście ze strony lub zmiana zakładki podczas trwania quizu skutkuje otrzymaniem <span>zerowej oceny</span></p>
                        <p>Jeżeli jesteś gotowy klikni w przycisk <span>Rozpocznij</span></p>
                        <Button onClick={this.goToNextCart} name="Rozpocznij" className="medium-btn quiz-cart-btn"/>
                    </article>
                </div>
            );
        if(currentCart === 5)
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