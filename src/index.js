import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'font-awesome/css/font-awesome.min.css';
import { Provider} from 'react-redux';
import WebFont from 'webfontloader';
import storeCreator from './store/index';

const {store}  = storeCreator();

console.log(store);
WebFont.load({
  google: {
    families: ['Roboto:300,400,600,700', 'sans-serif']
  }
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
;
registerServiceWorker();
