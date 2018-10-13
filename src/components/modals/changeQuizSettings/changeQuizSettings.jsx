import React from 'react';
import Modal from '../../UI/modal/modal';
import './changeQuizSettings.scss';
const changeQuizSettings = ({closeSettings}) => (
    <Modal timeout={500} show={true} close={closeSettings} showIcon 
        animationIn="animation-opacity-in" animationOut="animation-opacity-out" backdropInAnimation="open-backdrop-short"
        backdropOutAnimation="hide-backdrop-short">


        <header></header>
        <div className="settings-modal">Edycja ustwien tutaj</div>
    </Modal>
);

export default changeQuizSettings;