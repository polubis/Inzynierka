import React from 'react'
import { Route, Redirect } from 'react-router-dom';

const privateRoute = ({component: Component, isAuthenticated, pathToRedirect, ...rest}) => {
    return (
        <Route {...rest} render={(props) => (
            isAuthenticated === true ? 
            <Component {...props} /> : 
            <Redirect to={pathToRedirect} />
        )}/>
    );
}

export default privateRoute;