import React from "react";
import {
    defaultBordered
} from "./styles";


export function DefaultBorderedText ( { text, children } ) {


    return (
        <span className={defaultBordered}>{text || children}</span>
    );


}
