import React from "react";
import { css } from "glamor";
import {
    // Map,
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
import EmptyHeart from "react-icons/lib/md/favorite-outline";
const EmptySeq = Seq();

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


const renderText = imageDoc => {

    return (
        <p
            key={imageDoc.get("_id")}
            className={textStyle}>
            <span>
                {imageDoc.getIn(["data", "url"], "lol").split("/").slice(4).join("/").slice(0, 50)}
            </span>
            <EmptyHeart
                className={likeStyle}
            />
        </p>
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
