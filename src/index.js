import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'font-awesome/css/font-awesome.min.css';
import Authenticate from './store/reducers/Authenticate';
import User from './store/reducers/User';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider} from 'react-redux';
import thunk from 'redux-thunk';

import WebFont from 'webfontloader';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

WebFont.load({
  google: {
    families: ['Montserrat:300,400,700', 'sans-serif']
  }
});

const rootReducer = combineReducers({
  Authenticate: Authenticate,
  User: User
}); 


const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
;
registerServiceWorker();
