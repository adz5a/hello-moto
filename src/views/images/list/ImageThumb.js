import React from "react";
import { Unchecked, Checked } from "components/icons";
import{
//     branch,
    compose,
    setPropTypes
} from "components/recompose";
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
    withToggleTag
} from "components/withAddTag"
import {
    AddTag
} from "./CreateTag";


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
    "w-80",
    "w-30-ns"
);


export function Thumb ({
    image = EmptyMap,
    openTagModal = noop
}) {

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
            <ThumbFooter
                image={image}
                openTagModal={openTagModal}
            />
        </div>
    );

}


Thumb.propTypes = {
    openTagModal: PropTypes.func.isRequired,
    image: PropTypes.any.isRequired
};

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
    onAddTag = noop,
    openTagModal = noop,
    selected = false
}) {

    const isFav = image.getIn(
        [ "tag", "favorite" ],
        false
    );


    const checkBox = selected ?
        <Checked /> :
        <Unchecked />

    return (
        <footer>
             {checkBox}
            {

                isFav ?
                    <FullHeart
                        className={ThumIconStyle}
                        onClick={() => onAddTag("favorite")}
                    /> :
                    <EmptyHeart
                        className={ThumIconStyle}
                        onClick={() => onAddTag("favorite")}
                    />

            }
            <AddTag
                openTagModal={openTagModal}
                image={image}
            />
        </footer>
    );


}


const ThumbFooter = compose(
    setPropTypes({
        image: PropTypes.object.isRequired,
        openTagModal: PropTypes.func.isRequired
    }),
    withToggleTag("image")
)(ThumbFooterView);


const list = join(
"flex",
"justify-between-ns",
    "justify-center",
"flex-wrap",
);
export function ThumbListView ({
    images = EmptySeq,
    size = 10,
    openTagModal = noop
}) {

    return (
        <section
            className={list}
        >
            {
                images
                    .slice(0, size)
                    .map(image => {

                        return (
                            <Thumb
                                key={image.get("_id")}
                                image={image}
                                openTagModal={openTagModal}
                            />
                        );

                    })
                    .toArray()
            }
        </section>
    );

}
