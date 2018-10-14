import React from 'react';
import Modal from '../../UI/modal/modal';
import './changeQuizSettings.scss';
import QuizSettings from '../../Forms/QuizSettings/QuizSettings';
const changeQuizSettings = ({closeSettings, settings, changeSettings}) => (
    <Modal timeout={500} show={true} close={closeSettings} showIcon 
        animationIn="animation-opacity-in" animationOut="animation-opacity-out" backdropInAnimation="open-backdrop-short"
        backdropOutAnimation="hide-backdrop-short">

        <div className="settings-modal">
            <p className="modal-header">
                <i className="fa fa-cogs"></i>
                <span>
                    Ustawienia rozgrywki
                </span>
            </p>
            
            <QuizSettings settings={settings} changeSettings={changeSettings} />
        </div>
    </Modal>
);

export default changeQuizSettings;

/*
*/ 