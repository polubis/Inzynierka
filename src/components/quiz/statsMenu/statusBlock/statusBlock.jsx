import React from 'react';

const statusBlock = ({status, icon, classes, time, wasPaused, sugestionsWasRemoved}) => (
    <div className={`status-block ${classes ? classes : ""}`}>
        <i className={`fa fa-${icon}`}></i>
        <p>{status}</p>
        {time && 
            <p>
                <span><i className="fa fa-clock-o"></i>{time} s</span>
                {wasPaused && 
                    <span><i className="fa fa-pause-circle"></i></span>
                }
                {sugestionsWasRemoved &&
                    <span><i className="fa fa-medkit"></i></span>
                }
                
            </p>
        }
        
    </div>
);

export default statusBlock;