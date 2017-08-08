import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import { Provider } from "react-redux";
import { createStore } from "data/store";
import { ScrollMonitor } from "src/ScrollMonitor";





export function renderApp ( Component, render = ReactDOM.render ) {

    const store = createStore();
    const root = render(
        <Provider store={createStore()}>
            <ScrollMonitor>
                <Component />
            </ScrollMonitor>
        </Provider>,
        document.getElementById('root')

    );

    return {
        root,
        store
    };

}
