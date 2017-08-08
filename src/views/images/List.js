import React from "react";
import{
    branch,
    compose,
    renderComponent,
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
    joinClasses as join
} from "components/styles";
import {
    Thumb
} from "./ImageThumb";
import { infiniteScroll } from "components/infiniteScroll";


const EmptySeq = Seq();



const renderImage = imageDoc => <Thumb
    key={imageDoc.get("_id")}
    image={imageDoc}
/>


const list = join("flex", "justify-between", "flex-wrap");
export function ListView ({
    images = EmptySeq,
    size = 10,
    scrollHeight
}) {

    return (
        <section
            className={list}
        >
            {images.slice(0, size).map(renderImage).toArray()}
        </section>
    );

}



export function EmptyListView () {

    return (
        <section>
            No images for you
        </section>
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
    infiniteScroll("images")
)(ListView);
