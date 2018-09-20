import React, { Component } from 'react'
import Motive from './motive/motive';
import './motivesPanel.scss';
import { filterDataByKeys } from '../../services/manageData.js';
import ErrorHoc from '../../hoc/errorHoc';
class MotivesPanel extends Component{
    state = { sortOrd: 'asc', isLoadingUserDataAgain: false };

    manageDataConfig = { orderBy: { sortBy: 'name', order: '' } }

    changeSortOrder = () => { this.setState({sortOrd: this.state.sortOrd === "asc" ? "desc" : "asc"}); }

    render(){
        const { userData, getUserDataErrors } = this.props;
        const { sortOrd, isLoadingUserDataAgain } = this.state;
        
        this.manageDataConfig.orderBy.order = sortOrd;

        const filteredMotives = getUserDataErrors.length === 0 && filterDataByKeys(this.manageDataConfig, userData.motives);

        return (
            <div className="panel-container">
                <h4>Twoje motywy<span className="sub-title-span">przestrzeń sztuki</span></h4>
                <nav>
                    <span className="span-btn">Nowy</span>
                    <span className="span-btn">Udostępnij</span>
                    <span className="span-btn" onClick={this.changeSortOrder}>Filtr 
                        <i className={`fa fa-sort-alpha-${sortOrd === 'asc' ? "asc" : "desc"}`}></i>
                    </span>
                </nav>
                <ErrorHoc errors={getUserDataErrors} isLoading={isLoadingUserDataAgain}>
                    {filteredMotives.length > 0 ? 
                        <ul>
                        {filteredMotives.map((motive, index) => 
                                <Motive motive={motive} key={index}/> )}
                        </ul> : 
                    <p>Brak stworzonych motywów</p>}
                </ErrorHoc>
            </div>
        );
    }
}

export default MotivesPanel;