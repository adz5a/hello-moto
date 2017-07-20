import React, { Component } from 'react';
import { 
    // Form,
    EnhancedForm as Form,
    // List,
    EnhancedList as List
} from "views/Bucket";
import { Drop } from "components/Drop";

class App extends Component {
    render() {
        return (
            <div
                style={{
                }}
            >
                <div className="dib"><Form />
            </div>
                <List />
                <Drop />
            </div>
        );
    }
}

export default App;
