
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import Authenticate from './reducers/Authenticate';
import createHistory from 'history/createBrowserHistory';



const storeCreator = () => {
    const history = createHistory();
    
    const rootReducer = combineReducers({Authenticate});

    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
    const store = createStore(rootReducer, 
        composeEnhancers(applyMiddleware(thunk)));
    
    return {store, history};
};

export default storeCreator;