import React from "react";
import {
    centerFlex,
    inputStyle
} from "components/styles";
import {
    DefaultBorderedText as Text
} from "components/Text";
import fmap from "lodash/fp/map";
import noop from "lodash/noop";
import { lazyList } from "components/lazyList";

const shorten = len => str => str.length > len ?
    str.slice(0, len) + "..." :
    str;

const short25 = shorten(25);


export const renderLink = fmap(
    link => <p
        key={link.id}
        className="flex justify-between"
    >
        <Text>{short25(link.url.split("/").pop())}</Text>
        <Text>{link.contentType}</Text>
    </p>
);


export function ListHeader ( { total = 0 } ) {

    return (
        <header>
            <Text>{"Items " + total}</Text>
        </header>
    );

}


export function ListFooter ( { links = {}, total, displayed, listMore = noop } ) {

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


export function LinkList ( { links = {} } ) {

    return (
        <section className={"flex flex-column"}>
            {renderLink(links)}
        </section>
    );

}


export function ListContent ( { total, displayed, items, listMore } ) {

    // console.log("HERE");
    // console.log(displayed);
    return (
        <div
            className={"flex flex-column pl3 mt5"}
        >
            <ListHeader total={total}/>
            <LinkList 
                links={items.slice(0, displayed)}
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
    chunkSize: 15
});


export const List = enhanceList(ListContent);
