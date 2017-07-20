import React, { Component } from 'react';
import {
    joinClasses
} from "./styles";

export { joinClasses }



export const resetInput = "input-reset";
export const controlStyle = "b pa2 input-reset ba bg-transparent";
export const linkStyle = joinClasses(controlStyle, "dim", "link", "black");

export function parseForm ( names = [], form ) {

    return names.reduce(( res, name ) => {

        res[name] = form.elements[name].value;
        return res;

    }, {});

}
