import React from 'react';
import ReactDOM from 'react-dom';
import {
    Bucket,
} from './Bucket';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Bucket />,
        div
    );
});
