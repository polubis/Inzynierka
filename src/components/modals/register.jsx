import React from "react";
import "./modals-styles.css";
import Modal from '../UI/modal/modal';
import Logo from '../UI/logo/logo';
import Button from '../UI/button/button';

const registerModal = ({close, email, username, show}) => (
  <Modal
    show={show}
    close={close}
  >
    <div className="register-modal-container">
      <Logo type="modal-logo" />
      <h2>Witaj w muzycznych szeregach</h2>
      <p>
        Na podany przez <b>{username}</b> adres mailowy  został
        wysyłany link aktywacyjny
      </p>
      <article>
        Aby ukończyć procedurę rejestracji należy aktywować link wysyłany na
        adres mailowy <b>{email}</b>. Potwierdzenie linku pozwala
        na skorzystanie z głównych funkcji serwisu. Bez aktywnego nie ma
        możliwości skorzystania z większości opcji. <br /> <br />
        W razie problemów podczas korzystania z serwisu istnieje możliwość
        zgłoszenia ich do naszego działu obsługi klienta. Należy wysłać email na
        podany adres w stopce wiadomości ze szczegółowym opisem problemu.
        Wiadomości od użytkowników jak ty pomogą nam stworzyć bezpieczny i
        dobrze działający serwis.
        <p>
          Pozdrawiamy! <b>mcomposesupport@gmail.com</b>
        </p>
      </article>
      <Button
        onClick={close}
        name="Zamknij"
        className="medium-btn check-out-btn"
      />
    </div>
  </Modal>
);

export default registerModal;
