import React from "react";
import {
    viewStyle,
    linkStyle,
    joinClasses as join,
    // centerFlex,
    // inputStyle
} from "components/styles";
import {
    // Link
} from "react-router-dom";
import {
    DefaultBorderedText as Text
} from "components/Text";
import { connect } from "react-redux";
import{
} from "recompose";
// import fmap from "lodash/fp/map";
// import map from "lodash/map";
import { List } from "./list/List";

const shorten = len => str => str.length > len ?
    str.slice(0, len) + "..." :
    str;

const short25 = shorten(25);

// const vs = join(viewStyle, "justify-around");



export function View () {

    return (
        <section
            className={viewStyle}
        >
            <EnhancedList />
        </section>
    );

}


const enhanceList = connect(
    state => ({ links: state.links })
);


const EnhancedList = enhanceList(List);
