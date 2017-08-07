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
import {
    Images
} from "views/images";



const NotFound = () => (
    <div>not found mofo</div>
)


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
                    <Route
                        path="/images"
                        component={Images}
                    />
                    <Route
                        path="/404"
                        component={NotFound}
                    />
                </div>
            </Router>
        );
    }
}

export default App;
