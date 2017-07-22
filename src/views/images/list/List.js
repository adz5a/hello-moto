import React from "react";
import { componentFromStream } from "components/stream";
import { createEventHandler } from "recompose";
import {
    viewStyle,
    linkStyle,
    joinClasses as join,
    centerFlex,
    inputStyle
} from "components/styles";
import {
    Link
} from "react-router-dom";
import {
    DefaultBorderedText as Text
} from "components/Text";
import noop from "lodash/noop";
import { lazyList } from "components/lazyList";
import fmap from "lodash/fp/map";
import { css } from "glamor";

const imgStyle = css({
    width: "30%",
    height: "auto"
});


export const renderImg = fmap(
    img => <p
        key={img.id}
        className={imgStyle}
    >
        <img
            src={img.url}
        />
    </p>
);


export function ListHeader ( { total = 0 } ) {

    return (
        <header>
            <Text>{"Items " + total}</Text>
        </header>
    );

}


export function ListFooter ( { total, displayed, listMore = noop } ) {

    return (
        <footer className={centerFlex}>
            <input 
                className={inputStyle}
                value={`See More (left ${total - displayed})`}
                type="button"
                onClick={listMore}
            />
        </footer>
    );

}


export function ImageList ( { images = {} } ) {

    return (
        <section className={"flex justify-around flex-wrap"}>
            {renderImg(images)}
        </section>
    );

}


export function ListContent ( { total, displayed, items, listMore } ) {

    return (
        <div
            className={"flex flex-column pl3 mt5"}
        >
            <ListHeader total={total}/>
            <ImageList 
                images={items.slice(0, displayed)}
            />
            <ListFooter 
                listMore={listMore}
                total={total}
                displayed={displayed}
            />
        </div>
    );

}


export const enhanceList = lazyList({
    selector: props => props.links,
    filter: links => typeof links.url === "string",
    chunkSize: 15
});


export const List = enhanceList(ListContent);
