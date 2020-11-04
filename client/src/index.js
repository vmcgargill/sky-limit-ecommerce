import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import Nav from './general/Nav';
import Footer from './general/Footer';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

ReactDOM.render(
  <React.StrictMode>
    <Nav />
  </React.StrictMode>,
  document.getElementById('nav')
);

ReactDOM.render(
  <React.StrictMode>
    <Footer />
  </React.StrictMode>,
  document.getElementById('footer')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
