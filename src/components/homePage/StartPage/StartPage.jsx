import React from "react";
import "./StartPage.css";
import Button from "../../UI/button/button.jsx";

const startPage = ({changeOnRegister}) => (
  <div className="content-container">
    <h1>MCompose</h1>
    <p>Trenowanie słuchu na wysokim poziomie</p>
    <article>
      Jeżeli lubisz muzykę i grasz na instrumencie powinieneś spotkać się z
      problemem, który dotyczy wszystkich instrumentalistów. Każdego z nas
      spotkała sytuacja kiedy słuchając ulubionego utworu zastanawialiśmy się,
      jaki aktualnie akord bądź dźwięk jest grany. Ciężko jest wytrentować słuch
      muzyczny bez ciężkiej pracy i odpowiedniej metodyki.
    </article>
    <section>
      <Button name="Sprawdź" className="big-btn check-out-btn " />
      <Button
        onClick={changeOnRegister}
        name="Załóż konto"
        className="big-btn check-out-btn-empty btn-white-item"
      />
    </section>
    <Button name="Dalej" className="medium-btn go-next-btn" />
  </div>
);
export default startPage;
