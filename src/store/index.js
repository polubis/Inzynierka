
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import Authenticate from './reducers/Authenticate';

const storeCreator = () => {
    const rootReducer = combineReducers({Authenticate});
  
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
    const store = createStore(rootReducer, 
        composeEnhancers(applyMiddleware(thunk)));
  
    return {store};
};

export default storeCreator;