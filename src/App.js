import React, { Component } from 'react';
import {
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
import {
    Snake
} from "views/snake";



const NotFound = () => (
    <div>not found mofo</div>
)


class App extends Component {
    render() {
        return (
            <div className="helvetica">
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
                    path="/snake"
                    component={Snake}
                />
                <Route
                    path="/404"
                    component={NotFound}
                />
            </div>
        );
    }
}

export default App;
