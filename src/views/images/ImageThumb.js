import React from "react";
// import{
//     branch,
//     compose,
//     renderComponent,
//     mapPropsStream,
//     getContext
// } from "components/recompose";
// import { connect } from "react-redux";
import {
    Map,
    // List,
    // Seq
} from "immutable";
import { css } from "glamor";
import {
    // viewStyle,
    // centerFlex,
    // inputStyle
    joinClasses as join
} from "components/styles";
// import PropTypes from "prop-types";
// import debounce from "xstream/extra/debounce";


const EmptyMap = Map();
const imageStyle = join(
    "dib",
    css({
        width: "100%",
        height: "auto"
    })
);

const imageContainerStyle = join(
    "dib",
    "flex",
    "items-center",
    "mt2",
    "mb2",
    css({
        width: "28%"
    })
);


export function Thumb ({ image = EmptyMap }) {

    return (
        <div
            key={image.get("_id")}
            className={imageContainerStyle}
        >
            <img
                alt={image.get("data").get("url")}
                src={image.get("data").get("url")}
                className={imageStyle}
            />
        </div>
    );

}
