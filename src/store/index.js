
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import Authenticate from './reducers/Authenticate';
import User from './reducers/User';
import createHistory from 'history/createBrowserHistory';



const storeCreator = () => {
    const history = createHistory();
    
    const rootReducer = combineReducers({Authenticate, User});

    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
    const store = createStore(rootReducer, 
        composeEnhancers(applyMiddleware(thunk)));
    
    return {store, history};
};

export default storeCreator;