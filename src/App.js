import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";
import {
    View as Bucket
} from "views/bucket";
import {
    View as Home
} from "views/home/Home";


class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route
                        path="/"
                        exact
                        component={Home}
                    />
                    <Route
                        path="/bucket"
                        component={Bucket}
                    />
                </div>
            </Router>
        );
    }
}

export default App;
