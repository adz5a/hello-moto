import React from "react";
import { css } from "glamor";
import {
    Map,
    // List,
    Seq
} from "immutable";
import {
    withReducer
} from "components/recompose";
import {
    // viewStyle,
    // centerFlex,
    // inputStyle
    defaultBorderedBlock as defaultBordered,
    joinClasses as join
} from "components/styles";
import { 
    // withAddTag,
    withToggleTag
} from "components/withAddTag";
import {
    EmptyHeart,
    FullHeart,
    DownArrow,
    UpArrow,
    // AddBox
} from "components/icons";
import {
    AddTag
} from "./CreateTag";
import noop from "lodash/noop";


const EmptySeq = Seq();
const EmptyMap = Map()

const textStyle = join(
    defaultBordered,
    "mb2",
    "mt2",
    "flex",
    "justify-between",
    "items-center",
    "flex-wrap",
    css({
    })
);


const iconFontSize = css({
    fontSize: "1.5em"
});
const likeStyle = join(
    "grow",
    "pointer",
    iconFontSize,
    css({
        color: "red",
        transformOrigin: "center center"
    }),
);

const expandStyle = join(
    iconFontSize,
    "pointer",
);


function FavTagView ({ onAddTag = noop, image = EmptyMap }) {

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

const FavTag = withToggleTag("image")(FavTagView);


function TagView ({ 
    image, 
    onAddTag = noop,
    openTagModal= noop
}) {

    // console.log(onAddTag);
    return (
        <section className="dib">
            <AddTag 
                image={image}
                className={join(expandStyle, "dim")}
                openTagModal={openTagModal}
            />
            <FavTag image={image} />
        </section>
    );

}


const expandableStyle = join(
    "w-100",
    css({
        textAlign: "center",
        transition: "height 0.3s",
        height: "0",
    })
);

const expandedStyle = join(
    expandableStyle,
    css({
        height: "20em"
    })
);
function Expandable ( { expand = false, image = EmptyMap } ) {

    if ( expand ) {

        return (
            <section className={expandedStyle}>
                <img
                    src={image.getIn(["data", "url"], "")}
                    className="w-auto h-100"
                    alt=""
                />
            </section>
        );

    } else {

        return (
            <section className={expandableStyle}>
                <img
                    src={image.getIn(["data", "url"], "")}
                    className="w-auto h-100"
                    alt=""
                />
            </section>
        );

    }

}



export function TextImageView ({ 
    image = EmptyMap,
    showExpand,
    toggleExpand = noop,
    onAddTag = noop,
    openTagModal = noop
}) {

    return (
        <section
            className={textStyle}>
            <span>
                {image.getIn(["data", "url"], "lol").split("/").slice(4).join("/").slice(0, 50)}
            </span>
            <div>
                <TagView 
                    image={image}
                    openTagModal={openTagModal}
                />
                {
                    showExpand ?
                        <UpArrow className={expandStyle} onClick={toggleExpand}/>:
                        <DownArrow className={expandStyle} onClick={toggleExpand}/>
                }
            </div>
            <Expandable image={image} expand={showExpand}/>
        </section>
    );

}



const TextImage = withReducer(
    "showExpand",
    "toggleExpand",
    ( state, _ ) => !state,
    () => false
)(TextImageView);





export function TextListView ({
    images = EmptySeq,
    size = 10,
    onAddTag = noop,
    openTagModal = noop
}) {

    const style = join("flex", "justify-between", "flex-wrap", "flex-column");
    // console.log(size);

    return (
        <section
            className={style}
        >
            {
                images
                    .toSeq()
                    .slice(0, size)
                    .map(imageDoc => {

                        return (
                            <TextImage
                                key={imageDoc.get("_id")}
                                image={imageDoc}
                                onAddTag={onAddTag}
                                openTagModal={openTagModal}
                            />
                        );

                    }).toArray()
            }
        </section>
    );

}
