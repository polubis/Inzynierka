import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'font-awesome/css/font-awesome.min.css';
import { Provider} from 'react-redux';
import WebFont from 'webfontloader';
import storeCreator from './store/index';
import { PersistGate } from "redux-persist/integration/react";

export const {store, history,persistor} = storeCreator;

WebFont.load({
  google: {
    families: ['Roboto:300,400,600,700', 'sans-serif']
  }
});

ReactDOM.render(
  <Provider store={store} >
     <PersistGate persistor={persistor}>
        <App history={history}/>
      </PersistGate>
  </Provider>,
  document.getElementById('root')
);
;
registerServiceWorker();
