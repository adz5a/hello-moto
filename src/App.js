import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
    // Bucket,
    EnhancedBucket as Bucket
} from "views/Bucket";

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <Bucket
                    onList={console.log}
                    onSave={console.log}
                    onListDir={console.log}
                />
            </div>
        );
    }
}

export default App;
