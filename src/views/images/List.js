import React from "react";
import { css } from "glamor";
import{
    branch,
    compose,
    renderComponent,
    mapPropsStream,
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
    defaultBordered,
    joinClasses as join
} from "components/styles";
import {
    Thumb
} from "./ImageThumb";
import { infiniteScroll } from "components/infiniteScroll";


const EmptySeq = Seq();



const renderThumb = imageDoc => <Thumb
    key={imageDoc.get("_id")}
    image={imageDoc}
/>


const list = join("flex", "justify-between", "flex-wrap");
export function ThumbListVieww ({
    images = EmptySeq,
    size = 10,
}) {

    return (
        <section
            className={list}
        >
            {images.slice(0, size).map(renderThumb).toArray()}
        </section>
    );

}


const textStyle = join(defaultBordered, "dib", "mb2", "mt2", css({
    maxWidth: "60%"
}));

const renderText = imageDoc => <span
    key={imageDoc.get("_id")}
    className={textStyle}>
    {imageDoc.getIn(["data", "url"], "lol").split("/").slice(4).join("/").slice(0, 50)}
    </span>

export function TextListView ({
    images = EmptySeq,
    size = 10,
}) {

    const style = join("flex", "justify-between", "flex-wrap", "flex-column");

    return (
        <section
            className={style}
        >
            {images.slice(0, size).map(renderText).toArray()}
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


export function ListView ({ View = TextListView, ...props }) {

    return <View {...props} />

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
    infiniteScroll("images"),
)(ListView);
