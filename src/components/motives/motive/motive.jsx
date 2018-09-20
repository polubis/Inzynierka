import React from 'react'

const motive = ({motive}) => (
    <li>
        <div style={{background: motive.mainColor}} className="theme-main"/>
        <div style={{background: motive.fontColor}} className="theme-font"/>
        <span>{motive.name}</span>
    </li>
);

export default motive;