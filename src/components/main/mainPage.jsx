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
                    <li onClick={() => push("/main/quiz/basic")}>
                        <i className="fa fa-photo"></i>
                        <p>Samouczek</p>
                        <p>Przejdź szybki quiz dla rozgrzania słychu.</p>
                    </li>
                    <li onClick={() => push("/main/quiz/advanced")}>
                        <i className="fa fa-photo"></i>
                        <p>Tryb domyślny</p>
                        <p>Wybierz odpowiedni rodzaj quizu, a następnie konkuruj z innymi graczami!</p>
                    </li>
                    <li onClick={() => push("/main/quiz/expert")}>
                        <i className="fa fa-photo"></i>
                        <p>Tryb weterana</p>
                        <p>Zgaduj dźwięki dotyczące różnych aspektów teorii muzyki</p>
                    </li>
                </ul>
            </section>

            <div className="row" ref={scrollRef} >
                <Button name="Samouczek" className="medium-btn go-next-btn"/>
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