import React from "react";
import{
    branch,
    compose,
    renderComponent,
    withReducer
} from "components/recompose";
import { connect } from "react-redux";
import {
    // Map,
    // List,
    Seq
} from "immutable";
// import { css } from "glamor";
import {
    // viewStyle,
    // centerFlex,
    // inputStyle
} from "components/styles";
import {
    ThumbListView
} from "./ImageThumb";
import { infiniteScroll } from "components/infiniteScroll";
import { TextListView } from "./ImageText";
import { ToggleListView } from "./ToggleList";


const EmptySeq = Seq();








export function EmptyListView () {

    return (
        <section>
            No images for you
        </section>
    );

}


export function ListView ({ View = TextListView, onToggle, ...props }) {

    return (
        <div>
            <ToggleListView onToggle={onToggle}/>
            <View {...props} />
        </div>
    );

}

export const ImageList = compose(
    connect(
        state => ({
            images: state.db.byType.get("image", EmptySeq).toSeq()
        })
    ),
    branch(
        props => props.images.size === 0,
        renderComponent(EmptyListView)
    ),
    infiniteScroll(
        "images",
        undefined,
        25
    ),
    withReducer(
        "View",
        "onToggle",
        ( View, name ) => {

            switch ( name ) {

                case "text":
                    return TextListView;

                case "thumb":
                    return ThumbListView;

                default:
                    return View;

            }

        },
        () => TextListView
    )
)(ListView);
