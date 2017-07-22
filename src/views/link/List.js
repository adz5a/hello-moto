import React from "react";
import {
    viewStyle,
    linkStyle,
    joinClasses as join,
    centerFlex
} from "components/styles";
import {
    Link
} from "react-router-dom";
import {
    DefaultBorderedText as Text
} from "components/Text";
import { connect } from "react-redux";
import fmap from "lodash/fp/map";

const ls = join(linkStyle, "ma3");
// const vs = join(viewStyle, "justify-around");


export const renderLink = fmap(
    link => <p 
        key={link.id}
        className="flex justify-between"
    >
        <Text>{link.url.split("/").pop()}</Text>
        <Text>{link.contentType}</Text>
    </p>
);

export function View () {

    return (
        <section
            className={viewStyle}
        >
            <EnhancedList />
        </section>
    );

}


export function List ( { links = {}, ...rest } ) {

    // console.log(links, rest);
    return (
        <section
            className={"flex flex-column pl3 mt5"}
        >
            <ListHeader links={links}/>
            <LinkList links={links}/>
        </section>
    );

}


export function ListHeader ( { links = {} } ) {

    return (
        <header>
            <Text>{"Items " + Object.keys(links).length}</Text>
        </header>
    );

}


export function LinkList ( { links = {} } ) {


    return (
        <section className={"flex flex-column"}>
            {renderLink(links)}
        </section>
    );

}


export const enhanceList = connect(
    state => ({
        links: state.links
    })
);


export const EnhancedList = enhanceList(List);
