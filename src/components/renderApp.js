import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import { Provider } from "react-redux";
import { createStore } from "data/store";
// import { ScrollMonitor } from "src/ScrollMonitor";





export function renderApp (
    Component,
    dom = null,
    render = ReactDOM.render
) {

    const store = createStore();
    const root = render(
        <Provider store={store}>
            <Component />
        </Provider>,
        dom
    );

    return {
        root,
        store
    };

}


export const withContext = Component => {

    return (
        <Provider store={createStore()}>
            <Component />
        </Provider>
    );


};
