import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { renderApp } from "components/renderApp";

renderApp(App, document.getElementById("root"));

registerServiceWorker();
