import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import { Provider } from "react-redux";
import { createStore } from "data/store";
// import { ScrollMonitor } from "src/ScrollMonitor";

import { Router } from "components/Router";




export function renderApp (
    Component,
    options,
    render = ReactDOM.render
) {

    const store = createStore();
    const root = render(
        <Provider store={store}>
            <Router>
                <Component />
            </Router>
        </Provider>,
        options
    );

    return {
        root,
        store
    };

}


export const withContext = Component => {

    return (
        <Provider store={createStore()}>
            <Router>
                <Component />
            </Router>
        </Provider>
    );


};
