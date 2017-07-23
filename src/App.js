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
    View as Link
} from "views/link/List";
import {
    View as Gallery
} from "views/images/Gallery";
import {
    View as Tag
} from "views/tag/Tag";


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
                        path="/link"
                        component={Link}
                    />
                    <Route
                        path="/images"
                        component={Gallery}
                    />
                    <Route
                        path="/tag"
                        component={Tag}
                    />
                </div>
            </Router>
        );
    }
}

export default App;
