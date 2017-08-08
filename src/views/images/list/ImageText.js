import React from "react";
import { css } from "glamor";
import {
    Map,
    // List,
    Seq
} from "immutable";
import {
    // viewStyle,
    // centerFlex,
    // inputStyle
    defaultBorderedBlock as defaultBordered,
    joinClasses as join
} from "components/styles";
import { withAddTag } from "components/withAddTag";
import EmptyHeart from "react-icons/lib/md/favorite-outline";
import FullHeart from "react-icons/lib/md/favorite";
import noop from "lodash/noop";


const EmptySeq = Seq();
const EmptyMap = Map()

const textStyle = join(
    defaultBordered,
    "mb2",
    "mt2",
    "flex",
    "justify-between",
    css({
    })
);


const likeStyle = join(
    "grow",
    "pointer",
    css({
        fontSize: "1.5em",
        color: "red",
        ":hover": {
            fill: "red"
        }
    }),
);

function AddTagView ({ onAddTag = noop, image = EmptyMap }) {

    const isFav = image.getIn(
        [ "tag", "favorite" ],
        false
    );

    if ( isFav ) {

        return (
            <FullHeart
                onClick={() => onAddTag("favorite")}
                className={likeStyle}
            />
        );

    } else {

        return (
            <EmptyHeart
                onClick={() => onAddTag("favorite")}
                className={likeStyle}
            />
        );

    }

}


const AddTag = withAddTag("image")(AddTagView);


export function TextImage ({ image = EmptyMap }) {

    return (
        <p
            className={textStyle}>
            <span>
                {image.getIn(["data", "url"], "lol").split("/").slice(4).join("/").slice(0, 50)}
            </span>
            <AddTag image={image}/>
        </p>
    );

}




const renderText = imageDoc => {

    return (
        <TextImage
            key={imageDoc.get("_id")}
            image={imageDoc}
        />
    );

};





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
