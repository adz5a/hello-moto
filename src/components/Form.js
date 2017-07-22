import React from "react";
import {
    joinClasses,
    inputStyle
} from "./styles";

export { joinClasses }




export function parseForm ( names = [], form ) {

    return names.reduce(( res, name ) => {

        res[name] = form.elements[name].value;
        return res;

    }, {});

}

export function preventDefault ( e ) {

    e.preventDefault();

}

export function Input ( { className, ...props } ) {

    return (
        <input 
            {...props}
            className={joinClasses(inputStyle, className)}
        />
    );

}
