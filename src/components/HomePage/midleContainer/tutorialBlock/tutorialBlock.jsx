import React from 'react';
import './tutorialBlock.css';

const tutorialBlock = props => (
    <div className="tutorial-block">
        <h1>Czym dokładnie jest ta strona?</h1>
        <section>
            <p>Użytkowniku przeczytaj to</p>
            <article>
                <span>Strona</span> została stworzona w celu pomocy muzykom podczas procesu
                kształcenia słuchu muzycznego. Każdy muzyk w różnym stopniu zaawansowania i wtajemniczenia
                w teorie muzyki, zmaga się z problemem jakim jest <b>rozpoznawanie dźwięków</b>.
            </article>
            <article>
                <span>Każdy</span> użytkownik może przejść przez kurs startowy, który posiada jednak
                pewne ogarniczenia. Nie zalogowany użyktownik może brać udział tylko i wyłącznie w jednym trybie quizu o to tym najtrudniejszym, który
                polega na rozpoznawaniu <b>dźwięków, akordów oraz interwałów</b> w tym samym czasie. 
                Aby skorzystać ze wszystkich opcji, takich jak: możliwość skonfigurowania quizu, 
                korzystania z różnych jego rodzajów oraz prowadzenia statystyk rankingowych, należy
                założyć konto.
            </article>
            <button>
                Załóż konto
            </button>
        </section>
    </div>
);

export default tutorialBlock;