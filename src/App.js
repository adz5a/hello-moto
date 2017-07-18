import React, { Component } from 'react';
import { Form, List } from "views/Bucket";

class App extends Component {
    render() {
        return (
            <div>
                <Form onAdd={console.log} />
                <List />
            </div>
        );
    }
}

export default App;
