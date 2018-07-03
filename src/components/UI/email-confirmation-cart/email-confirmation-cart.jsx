import React from 'react';
import './email-confirmation-cart.css';
import Modal from '../../UI/modal/modal';

const emailConfCart = props => (
    <Modal close={props.closeModal} 
    show={props.modalOpen}>
        <div className="email-confimration-cart">
            <h2>Witamy w naszych szeregach!</h2>
            <article>Wszystko już prawie gotowe. Musisz tylko aktywować swoje konto.
                Na adres mailowy podany przez Ciebie w formularzu rejestracji, został wysyłany
                link aktywacyjny. Uruchom go, i zacznij korzystać z naszej serwisu. 
                <br/>
                Pamiętaj, aby przed rozpoczęciem przygody z serwisem - uważnie przeczytać jego <b>regulamin</b>.
                Dodatkowo w związku z ustawą <b>RODO</b> nasz serwis umożliwia usuwanie wszystkich treści
                jakie na nim opublikujesz. Pamiętaj, aby jednak zastanowić się dwukrotnie przed wykonaniem 
                operacji usuwania. 
                <p>Serdecznie pozdrawiamy! - Administracja serwisu</p>
            </article>
        </div>
    </Modal>   
);

export default emailConfCart;
