import React from 'react';
import './LeftPart.css';
import Image from '../../../assets/pictures/pic.jpg';
import Player from '../../Player/Player';

const leftPart = props => (
    <div className="left-tutorial-container">
    <div className="top-details">
        <div className="track-image-container">
            <img src={Image} alt="Zdjęcie okładki" />
            <div className="track-stats-container">
                 <button className="fa fa-plus"><span>1132</span></button>
                 <button className="fa fa-minus"><span>32</span></button>
                 <button className="fa fa-comment"><span>32</span></button>
            </div>
        </div>
        <div className="track-informations">
           <p>Jaro1994</p>
           <article>
             Duis Lorem nulla commodo mollit. Exercitation nulla proident commodo sunt commodo. Culpa est sit Lorem Lorem enim laborum ea aliqua enim laborum eu id. Nulla velit ex mollit pariatur exercitation. Deserunt commodo ipsum sit ex ex ad est et magna. Consequat dolore velit mollit nulla ipsum ex. Minim irure aliqua laborum ex labore enim qui occaecat ea sunt aute.
             Labore commodo enim quis irure ad anim cillum amet dolore nulla veniam. Occaecat nostrud eu ad eiusmod pariatur occaecat irure sint. Eiusmod sint excepteur eu commodo. Nisi consequat mollit laborum nisi aliqua. Nostrud cupidatat aliqua ea nostrud sint sint proident do incididunt nisi ad irure amet ad.
             Cupidatat cupidatat do culpa laborum commodo cillum. Velit ut velit voluptate laborum adipisicing id qui. Esse deserunt elit enim aute laborum ea Lorem consequat et proident. Voluptate pariatur voluptate pariatur eiusmod nostrud. Tempor nostrud sint ex esse adipisicing qui veniam magna velit exercitation anim anim enim. Amet eiusmod officia esse id tempor ad et proident aliquip sunt esse.
             Sit enim mollit excepteur laborum. Reprehenderit voluptate cupidatat non officia laborum magna aliquip sint mollit voluptate voluptate aute incididunt eiusmod. Labore et ipsum quis ut mollit cillum cillum incididunt qui non dolor sint sit. Reprehenderit nisi ipsum non esse adipisicing. Amet aliquip nisi cillum dolor. Exercitation amet cillum sit labore amet ullamco.
             Sint ullamco fugiat id laboris veniam eu reprehenderit reprehenderit et sunt. Culpa adipisicing amet laboris magna duis est reprehenderit proident quis anim. Elit esse magna laboris aliquip proident. Officia pariatur et qui aute deserunt excepteur eu aute ut labore ullamco tempor voluptate. Duis in magna officia in velit officia labore magna. Nisi cupidatat cillum irure id adipisicing ullamco ipsum proident adipisicing non cillum sint aliquip. Anim voluptate ullamco velit consectetur cupidatat.
           </article>
        </div>
    </div>
    <Player tune={props.tune}/>

</div>   
);

export default leftPart;