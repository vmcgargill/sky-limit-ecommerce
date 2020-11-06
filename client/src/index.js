import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
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

serviceWorker.unregister();
