import React, { Component } from 'react';
import './Main.css';
import {Route} from 'react-router-dom';
import MainStartPage from '../../components/Main/StartPage/StartPage';
import { scrollBottom } from '../../services/componentsMethods';
import { withRouter } from 'react-router';
class Main extends Component {
    componentDidMount(){
        if(this.scrollRef) scrollBottom(this.scrollRef);
    }
    render() { 
        const { push } = this.props.history;
        return ( 
            <section className="main">
                <Route path="/main" render={() => {
                    return (
                        <MainStartPage push={push}
                        scrollRef={el => { this.scrollRef = el }} />
                    );
                }} />
              
               
            </section> 
        );
    }
}
 
export default withRouter(Main);