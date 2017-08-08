import React from "react";
import{
//     branch,
    compose,
    mapProps,
    setPropTypes
} from "components/recompose";
import { connect } from "react-redux";
import {
    Map,
    // List,
    Seq
} from "immutable";
import { css } from "glamor";
import {
    // viewStyle,
    // centerFlex,
    // inputStyle
    joinClasses as join
} from "components/styles";
import EmptyHeart from "react-icons/lib/md/favorite-outline";
import FullHeart from "react-icons/lib/md/favorite";
import noop from "lodash/noop";
import PropTypes from "prop-types";
import {
    TAG_DOC,
    TAG_DOC_ADDED
} from "data/tag";
import {
    withToggleTag
} from "components/withAddTag"


const EmptySeq = Seq();
const EmptyMap = Map();
const imageStyle = join(
    "db",
    css({
        width: "100%",
        height: "auto"
    })
);

const imageContainerStyle = join(
    "dib",
    "flex",
    "flex-column",
    "items-center",
    "mt2",
    "mb2",
    "justify-center",
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
            <ThumbFooter image={image}/>
        </div>
    );

}

const ThumIconStyle = join(
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

export function ThumbFooterView ({
    image = EmptyMap,
    onAddTag = noop
}) {

    const isFav = image.getIn(
        [ "tag", "favorite" ],
        false
    );

    if ( isFav ) {

        return (
            <footer>
                <FullHeart
                    className={ThumIconStyle}
                    onClick={() => onAddTag("favorite")}
                />
            </footer>
        );

    } else {

        return (
            <footer>
                <EmptyHeart
                    className={ThumIconStyle}
                    onClick={() => onAddTag("favorite")}
                />
            </footer>
        );

    }

}


const ThumbFooter = compose(
    setPropTypes({
        image: PropTypes.object.isRequired
    }),
    withToggleTag("image")
)(ThumbFooterView);


const renderThumb = imageDoc => <Thumb
    key={imageDoc.get("_id")}
    image={imageDoc}
/>


const list = join("flex", "justify-between", "flex-wrap");
export function ThumbListView ({
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
