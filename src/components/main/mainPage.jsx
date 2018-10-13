import React from 'react';
import './mainPage.scss';
import Guitar from '../../assets/bgs/guitar.jpg';
import Button from '../UI/button/button';

const mainPage = ({push, scrollRef}) => {
    return(
        <div className="main-start-page">
            <section className="main-advise">
                <div>
                    <h1>Muzyka, Sluch.</h1>
                    <article>
                        Ciągłe trenowanie i uczenie się dźwięków podczas gry, staje się z czasem monotonne.
                        Przejdź quiz muzyczny i wybierz odpowiedni dla Ciebie poziom trudności. Podziel się wynikiem
                        na swoim ulubionym portalu społecznościowym i powiększ naszą bazę wiedzy, dzięki której
                        z każda kolejną grą nasz system w lepszy sposób wylosuje kolejne pytania.
                    </article>
                </div>
                <ul>
                    <li onClick={() => push("/main/quiz/sounds")}>
                        <i className="fa fa-signal"></i>
                        <p>Dźwięki</p>
                        <p>Rozegraj 10 pytaniowy quiz oraz zapisz wynik w rankingu</p>
                    </li>
                    <li onClick={() => push("/main/quiz/chords")}>
                        <i className="fa fa-photo"></i>
                        <p>Akordy</p>
                        <p>Rozegraj 20 pytaniowy quiz dotyczący znajmości akordów i zapisz wynik w rankingu</p>
                    </li>
                    <li onClick={() => push("/main/quiz/mixed")}>
                        <i className="fa fa-photo"></i>
                        <p>Akordy oraz dźwięki</p>
                        <p>W tym trybie odtwarzane będą kolejno 
                            dźwięki wraz z akordami. Wynik zostanie zapisany w rankingu.
                        </p>
                    </li>
                </ul>
            </section>

            <div className="row" ref={scrollRef} >
                <Button onClick={() => push("/main/quiz/training")} name="Samouczek" className="medium-btn go-next-btn"/>
            </div>
            <figure className="slider">
                <div style={{ backgroundImage: `url(${Guitar})` }} />
                
            </figure>

            <div className="big-container">
                <div id="bg2"></div>
            </div>
        </div>
    );
}

export default mainPage;