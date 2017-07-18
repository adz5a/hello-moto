import React, { Component } from 'react';
import { 
    // Form,
    EnhancedForm as Form,
    // List,
    EnhancedList as List
} from "views/Bucket";

class App extends Component {
    render() {
        return (
            <div
                style={{
                    display: "flex",

                }}
            >
                <div className="dib"><Form /></div>
                <List />
            </div>
        );
    }
}

export default App;
