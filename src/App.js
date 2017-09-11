import React from 'react';
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
import {
    Showcase
} from "views/showcase";



const NotFound = () => (
    <div>not found mofo</div>
)


class App extends React.Component {
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
                    component={() => <Snake 
                        width={300}
                        height={300}
                    />}
                />
                <Route
                    path="/showcase"
                    component={Showcase}
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
