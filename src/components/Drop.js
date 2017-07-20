import React, { Component } from "react";
import forEach from "lodash/forEach";


const dropStyle = {
    border: "solid",
    width: "500px",
    height: "500px"
};


function onDrop ( e ) {

    e.preventDefault();
    const { dataTransfer } = e;
    console.log(dataTransfer.types);
    
    console.log(dataTransfer);
    
    forEach(dataTransfer.files, file => {


        console.log(file.name);
        console.log(file.size);
        console.log(file.webkitRelativePath);



    });

}

function onDragOver ( e ) {

    e.preventDefault();
    


}
export class Drop extends Component {

    render () {

        return (
            <div>
            <div 
                style={dropStyle}
                onDrop={onDrop}
                onDragOver={onDragOver}
            >hello</div>
            <input onChange={onDrop} type="file"/>
            </div>
        );

    }

}
