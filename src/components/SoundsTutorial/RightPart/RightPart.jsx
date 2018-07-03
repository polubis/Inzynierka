import React from 'react';
import './RightPart.css';
import Spinner from '../../UI/spinner/spinner';
import Aux from '../../../hoc/hoc';
import ServerError from '../../UI/server-error/server-error';
const rightPart = props => (
<div className="right-tutorial-container">
    {props.isLoading ? 
    
    <Spinner /> : 


    props.result !== null &&

    props.result === true ?
    <Aux>
        <div className="track-list-navigation">
            <h3>Utwory użytkownika <b>jaro1994</b></h3>
            <nav>
                <i className="fa fa-sort"></i>
                <input className="searcher" type="text" placeholder="znajdź utwór..." />
            </nav>
        </div>

        {props.data.length > 0 ?
        <ul className="track-list-items">
        {props.data.map(i => {
            return (
                <li key={i.id}>
                    {i.title}
                    <b>3.43</b>
                </li>
            );
        })}
        </ul>
        : 
        <p className="empty-list-comunicate">Użytkownik <b>jaro1994</b>
        nie ma jeszcze żadnych utworów</p>}
       
    </Aux>

    : <ServerError error={props.error[0]}/>}
    
                       
</div>    
);

export default rightPart;