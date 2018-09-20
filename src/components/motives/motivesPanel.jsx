import React, { Component } from 'react'
import Motive from './motive/motive';
import './motivesPanel.scss';
import { filterDataByKeys } from '../../services/manageData.js';
class MotivesPanel extends Component{
    state = { sortOrd: 'asc' };

    manageDataConfig = { orderBy: { sortBy: 'name', order: '' } }

    changeSortOrder = () => { this.setState({sortOrd: this.state.sortOrd === "asc" ? "desc" : "asc"}); }

    render(){
        const { motives, currentMotive } = this.props;
        const { sortOrd } = this.state;
        this.manageDataConfig.orderBy.order = sortOrd;

        const filteredMotives = filterDataByKeys(this.manageDataConfig, motives);

        return (
      
            <div className="panel-container">
                <h4>Twoje motywy</h4>
                <nav>
                    <span style={{color: currentMotive.fontColor}}>Nowy</span>
                    <span style={{color: currentMotive.fontColor}}>Udostępnij</span>
                    <span onClick={this.changeSortOrder} style={{color: currentMotive.fontColor}}>Filtr 
                        <i className={`fa fa-sort-alpha-${sortOrd === 'asc' ? "asc" : "desc"}`}></i>
                    </span>
                </nav>
                {filteredMotives.length > 0 ? 
                    <ul>
                        {filteredMotives.map((motive, index) => <Motive motive={motive} key={index}/> )}
                    </ul> : 
                <p>Brak stworzonych motywów</p>
                }
                
            </div>
        );
    }
}

export default MotivesPanel;