import React from 'react';
import './quizInstruction.scss';
import Button from '../../../UI/button/button';
import Timer from '../../timer/timer';
import ChangeQuizSettingsModal from '../../../modals/changeQuizSettings/changeQuizSettings';
class QuizInstruction extends React.PureComponent{
    state = {
        currentCart: 0
    }
    quizHeaders = {
        "standard": [
            `Witaj w <span className="dots">Quizie</span>, który zweryfikuje twój słuch muzyczny`,
            `Wybrany przez Ciebie tryb <span className="dots">${this.props.settings.translation}</span> posiada następujące zasady`,
            `Po zakończeniu rozgrywki zobaczysz swoje <span className="dots">statystyki</span>`,
            `W grze istnieją również <span className="dots">Tryby rankingowe</span>`,
            `Podczas gry dostępne są <span className="dots">${this.props.settings.numberOfPauses} pauzy</span>, które trwają <span>${this.props.settings.timeForPause} sekund</span>`
        ],
        "training": [
            `Witaj w specjalnym <span className="dots">typie quizu</span>`,
            `Wybrany przez Ciebie tryb <span className="dots">${this.props.settings.translation}</span> posiada następujące zasady`,
            `Informacja o <span className="dots">ustawieniach</span> rozgrywki`
        ],
    }

    quizContents = {
        "standard": [
            [`Wybrany przez Ciebie tryb pozwala na przejście quizu składającego się z <span>${this.props.settings.numberOfQuestions}</span> pytań`, `W <span> panelu bocznym</span> przedstawiony jest Twój progres dotyczący obecnego quizu`],
            [`Podczas rozpoczęcia każdego pytania użytkownik startuję z <span>bazową liczbą podpowiedzi</span>, które zależą od trybu`, `Następnie po upływie <span>kilku sekund</span> z puli podpowiedzi będą znikały kolejne warianty`, `Liczba punktów uwarunkowana jest <span>czasem</span> oraz tym ile razy <span>system zabierze podpowiedzi</span>`],
            [`Po każdym zakończonym Quizie system wyświetli podsumowanie rozgrywki w postaci <span>szczegółowych statystyk</span>`, `Statystyki obowiązują we wszystkich trybach z wyjątkiem trybu <span>Samouczek</span>`, `Otrzymana punktacja jest uwarunkowana <span>wybranym trybem</span>`],
            [`Rozgrywki oznaczone specjalną <span>ikoną</span> brać udział w rozgrywkach rankingowych`, `<span>Najlepsi użytkownicy</span> zostaną uchorowani na stronie startowej`],
            [`Podczas skorzystania z pauzy w pokaże się <span>okienko z informacjami</span> oraz czas pauzy`, `Po ukończeniu odliczania gra zostanie <span>wznowiona automatycznie</span>`, `Wyjście ze strony lub zmiana zakładki podczas trwania quizu skutkuje otrzymaniem <span>zerowej oceny</span>`, `Jeżeli jesteś gotowy klikni w przycisk <span>Rozpocznij</span>`]
        ],
        "training": [
            [`Wybrany przez Ciebie tryb pozwala na przejście quizu składającego się z <span>ustawionej przez Ciebie liczby pytań</span>`, `W <span> panelu bocznym</span> przedstawiony jest Twój progres dotyczący obecnego quizu`],
            [`Ten tryb został stworzony w celu trenowania słuchu muzycznego <span>według preferencji użytkownika</span>`, `W trakcie rozgrywki lub przed jej rozpoczęciem można zmieniać <span>parametry gry</span>`, `Stan rozgrywki nie jest zapisywany <span>do rankingu</span>`],
            [`Domyślnie tryb ten posiada <span>domyślnie ustawione parametry</span>`, `Przed rozpoczęciem rozgrywki <span>pojawi się</span> okno parametryzacji rozgrywki`, `Rozgrywka rozpocznie się <span>po potwierdzeniu</span> parametrów`, `Podczas modyfikacji parametrów <span>w trakcie rozgrywki</span> gra zostanię wstrzymana`]
        ]
    }

    goToNextCart = () => {
        const { settings, openSettingsModal } = this.props;
        const { currentCart } = this.state;
        if(settings.havePermisionsToEditSettings && this.quizHeaders[settings.instructionType].length - 1 === currentCart){
            openSettingsModal();
        }
        else{
            this.setState({currentCart: currentCart+1});
        }
    }

    skipInstruction = () => {
        const { currentCart } = this.props;
        const { settings, openSettingsModal } = this.props;
        const lengthOfInstruction = this.quizHeaders[settings.instructionType].length;
        if(settings.havePermisionsToEditSettings){
            openSettingsModal();
        }
        else{
            this.setState({currentCart: lengthOfInstruction});
        }
    }

    onCloseSettingsModal = () => {
        const { settings } = this.props;
        this.setState({currentCart: this.quizHeaders[settings.instructionType].length});
        this.props.closeSettingsModal();
    }

    onChangeSettingsHandler = formItems => {
        this.props.changeSettings(formItems);
        this.onCloseSettingsModal();
    }
    
    render(){
        const { isOpenedFirstTime, currentCart } = this.state;
        const { startQuiz, settings, isSettingsModalOpen } = this.props;
        const quizHeader = this.quizHeaders[settings.instructionType];
        const quizContents = this.quizContents[settings.instructionType];
        return (
        <div className="quiz-instruction">
            {quizHeader.length === currentCart ? <Timer numberOfDigitsToShow={0} frequency={1200} accuracy={1} startTime={3} shouldDecrement timerEndFunction={startQuiz} /> : 
            <div>
                <header className="dots" dangerouslySetInnerHTML={{
                    __html: quizHeader[currentCart]
                }}>
                </header>
                <article>
                    {quizContents[currentCart].map(content => (
                        <p key={content} dangerouslySetInnerHTML={{
                            __html: content
                        }}></p>
                    ))}           
                    <div className="row-column">
                        {quizHeader.length-1 === currentCart ? 
                            <Button onClick={this.goToNextCart} name="Rozpocznij" className="medium-btn quiz-cart-btn"/> : 
                            <React.Fragment>
                                <Button onClick={this.goToNextCart} name="Dalej" className="medium-btn quiz-cart-btn" />
                                <Button onClick={this.skipInstruction} name="Pomiń i graj" className="medium-btn quiz-instruction-nt-main-btn" />
                            </React.Fragment>
                        }
                    </div>
                </article>
            </div>    
            }

            {isSettingsModalOpen && 
                <ChangeQuizSettingsModal changeSettings={this.onChangeSettingsHandler} settings={settings} closeSettings={this.onCloseSettingsModal} />
            }
        </div>
        );
    }
}

export default QuizInstruction;