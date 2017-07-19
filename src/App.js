import React, { Component } from 'react';
import { 
    // Form,
    EnhancedForm as Form,
    // List,
    EnhancedList as List
} from "views/Bucket";
import {
    // LinkList,
    EnhancedLinkList as LinkList
} from "views/LinkList";

class App extends Component {
    render() {
        return (
            <div>
                <div
                    style={{
                        display: "flex",

                    }}
                >
                    <div className="dib"><Form /></div>
                    <List />
                </div>
                <LinkList />
            </div>
        );
    }
}

export default App;
