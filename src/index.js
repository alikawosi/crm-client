/* #region  [- import -] */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//--------------------------------------------------Added
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import "react-widgets/styles.css";
import { ConfigProvider } from 'antd'; // Used For rtl 
import faIR from 'antd/es/locale/fa_IR'; // Used For rtl
import { Provider } from 'react-redux';
import configureStore from './configureStore'
/* #endregion */

const store=configureStore()
const app = (
  <Provider store={store}>
    <ConfigProvider locale={faIR} direction={"rtl"}>
      <App />
    </ConfigProvider>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
