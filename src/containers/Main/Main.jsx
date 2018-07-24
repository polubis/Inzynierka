import React, { Component } from 'react';
import './Main.css';
import {Route} from 'react-router-dom';
import MainStartPage from '../../components/Main/StartPage/StartPage';
import { scrollBottom } from '../../services/componentsMethods';
class Main extends Component {
    componentDidMount(){
        scrollBottom(this.scrollRef);
    }
    render() { 
        return ( 
            <section className="main">
                <Route path="/main" render={() => {
                    return (
                        <MainStartPage scrollRef={el => { this.scrollRef = el }} />
                    );
                }} />
            </section> 
        );
    }
}
 
export default Main;