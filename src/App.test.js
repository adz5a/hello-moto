import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux";
import { createStore } from "data/store";


function Wrapper ( { children } ) {

    return (
        <Provider store={createStore()}>
            { children }
        </Provider>
    );

}


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Wrapper>
            <App />
        </Wrapper>,
        div
    );
});
