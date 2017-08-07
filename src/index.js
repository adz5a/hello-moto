import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from "react-redux";
import { createStore } from "data/store";
import { ScrollMonitor } from "./ScrollMonitor";


ReactDOM.render(
    <Provider store={createStore()}>
        <ScrollMonitor>
            <App />
        </ScrollMonitor>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
