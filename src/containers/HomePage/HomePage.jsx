import React, { Component } from 'react';
import './HomePage.css';
import MidleContainer from '../../components/HomePage/midleContainer/midleContainer';
class HomePage extends Component {
    render() { 
        return ( 
            <main className="home-page">
               <MidleContainer />
            </main>
        )
    }
}
 
export default HomePage;