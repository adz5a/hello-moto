import React from "react";
import {
    // viewStyle,
    // linkStyle,
    joinClasses as join,
    centerFlex,
    inputStyle
} from "components/styles";
import {
    Link,
    withRouter
} from "react-router-dom";
import {
    DefaultBorderedText as Text
} from "components/Text";
import noop from "lodash/noop";
import { lazyList } from "components/lazyList";
// import fmap from "lodash/fp/map";
import map from "lodash/map";
import { css } from "glamor";
// import FavIcon from "react-icons/lib/md/favorite";
import FavIconEmpty from "react-icons/lib/md/favorite-outline";
import AddTagIcon from "react-icons/lib/md/queue";

const imgStyle = join(css({
        width: "30%",
        height: "auto"
}), "pb2", "pt2");


const iconStyle = css({
    borderColor: "red",
    width: "2em",
    height: "1.4em"
});

export const renderImg = ( baseURL, images ) => map(
    images,
    img => <div
        key={img.id}
        className={imgStyle}
    >
        <Link 
            to={baseURL + "/" + img.id}
            className="link"
        >
            <img
                src={img.url}
                alt={img.url}
            />
        </Link>
        <div className={"flex justify-around"}>
            <FavIconEmpty className={join(iconStyle, "grow", "pointer")}/>
            <AddTagIcon className={join(iconStyle, "grow", "pointer")}/>
        </div>
    </div>
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


export function ImageList ( { images = {}, match } ) {

    return (
        <section className={"flex justify-around flex-wrap"}>
            {renderImg(match.url, images)}
        </section>
    );

}


const EnhancedImageList = withRouter(ImageList);

export function ListContent ( { total, displayed, items, listMore } ) {

    return (
        <div
            className={"flex flex-column pl3 mt5"}
        >
            <ListHeader total={total}/>
            <EnhancedImageList 
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
