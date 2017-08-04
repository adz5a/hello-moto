import React, { } from 'react';
import noop from "lodash/noop";
// import fmap from "lodash/fp/map";
import {
    inputStyle,
    centerFlex,
    // joinClasses as join
} from "components/styles";
import {
    DefaultBorderedText as Text
} from "components/Text";
import {
    Input
} from "components/Form";
import { connect } from "react-redux";
import {
    compose,
    // mapProps,
    // withProps,
    // lifecycle,
    branch,
    renderComponent
} from "components/recompose";
import {
} from "data/db";


export function EmptyListView ( {
    onRequestContent = noop,
    bucket = Map()
} ) {

    return (
        <section className={centerFlex}>

            <input
                className={inputStyle}
                type="button"
                onClick={() => onRequestContent(bucket)}
                value="Get bucket content"
            />

        </section>
    );

}


const enhanceEmptyList = connect(
    null,
    dispatch => ({
        onRequestContent( bucket ) {


        }
    })
);

export const EmptyList = enhanceEmptyList(EmptyListView);


const renderLinks = links => links.map( link => (
    <p
        key={link.get("url")}
        className={"flex justify-between"}
    >
        <Text>{link.get("url").split("/").pop()}</Text>
        <Text>{link.get("contentType")}</Text>
    </p>
));


export function ListView ( { 
    bucket,
    listNext = noop,
    saveAll = noop,
    contents = []
} ) {

    // console.log(listNext);
    // console.log(contents);
    // const links = contents
    console.log(contents);
    return (
        <section
            className="mt5"
        >
            <section
                className="flex justify-between"
            >
                <Input
                    type="button"
                    value="Save All"
                    onClick={saveAll}
                />
                <Input
                    type="button"
                    value="Load More Items"
                    onClick={listNext}
                />
            </section>
            <section
                className={"flex flex-column pl3 mt5"}
            >
                <header>
                    <Text>{"Items " + contents.size}</Text>
                </header>
                {renderLinks(contents)}
            </section>
            <section>
                <Input
                    type="button"
                    value="Load More Items"
                    onClick={listNext}
                />
            </section>
        </section>
    );

}


export const enhanceList = compose(
    branch(
        props => !props.bucket,
        renderComponent(EmptyList)
    ),
);


export const List = enhanceList(ListView);
