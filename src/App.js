import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";
import {
    View as Bucket
} from "views/bucket";


class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Route 
                            path="/"
                            exact
                            component={() => <div>hello world</div>}
                        />
                        <Route 
                            path="/bucket"
                            component={Bucket}
                        />
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
