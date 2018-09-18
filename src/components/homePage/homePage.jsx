import React from "react";
import "./homePage.scss";
import Button from "../UI/button/button.jsx";
const homePage = ({ pushIntoRoute, changeOnTestQuiz }) => (
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
      <Button onClick={changeOnTestQuiz} name="Sprawdź" className="big-btn check-out-btn " />
      <Button 
        onClick={() => pushIntoRoute("/register")}
        name="Załóż konto"
        className="big-btn check-out-btn-empty btn-white-item"
      />
    </section>
    <Button
      onClick={() => pushIntoRoute("/login")}
      name="Logowanie"
      className="medium-btn go-next-btn"
    />
  </div>
);
export default homePage;
