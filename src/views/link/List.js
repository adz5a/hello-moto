import React from "react";
import {
    viewStyle,
    // centerFlex,
    // inputStyle
} from "components/styles";
import {
    // Link
} from "react-router-dom";
import {
    // DefaultBorderedText as Text
} from "components/Text";
import { connect } from "react-redux";
import{
} from "recompose";
// import fmap from "lodash/fp/map";
// import map from "lodash/map";
import { List } from "./list/List";
import { Home } from "./Home";


// const vs = join(viewStyle, "justify-around");



export function View () {

    return (
        <section
            className={viewStyle}
        >
            <Home />
            <EnhancedList />
        </section>
    );

}


const enhanceList = connect(
    state => ({ links: state.links })
);


const EnhancedList = enhanceList(List);
