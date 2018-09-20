
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import Authenticate from './reducers/Authenticate';
import User from './reducers/User';
import Account from './reducers/Account';
import createHistory from 'history/createBrowserHistory';
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
    key: "root",
    storage,
    blacklist: ["User", "Account"]
};

const storeCreator = () => {
    const history = createHistory();

    const rootReducer = combineReducers({Authenticate, User, Account});

    const persistedReducer = persistReducer(
        persistConfig,
        rootReducer
    );
    

    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
    const store = createStore(persistedReducer, 
        composeEnhancers(applyMiddleware(thunk)));

    const persistor = persistStore(store);

    return {store, history, persistor};
};

export default storeCreator();