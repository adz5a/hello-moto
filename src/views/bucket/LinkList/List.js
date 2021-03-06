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
// import { connect } from "react-redux";
import {
    compose,
    withReducer,
    // mapProps,
    // withProps,
    // lifecycle,
    branch,
    renderComponent
} from "components/recompose";
import {
    SAVE_ALL
} from "data/bucket";
import {
    List as ImmutableList
} from "immutable";
import {
    connect
} from "react-redux";

export function EmptyListView ( {
    listNext = noop,
    bucket = Map()
} ) {

    return (
        <section className={centerFlex}>

            <input
                className={inputStyle}
                type="button"
                onClick={() => listNext(bucket)}
                value="Get bucket content"
            />

        </section>
    );

}


export const EmptyList = EmptyListView;


// const renderLinks = links => links.map( link => (
//     <p
//         key={link.get("url")}
//         className={"flex justify-between"}
//     >
//         <Text>{link.get("url").split("/").pop()}</Text>
//         <Text>{link.get("contentType")}</Text>
//     </p>
// ));


export function ListView ( {
    bucket,
    listNext = noop,
    saveAll = noop,
    contents = ImmutableList(),
    syncBucket = noop,
    loading = false,
    isTruncated = false,
    listSize = 10,
    bumpList = noop
} ) {

    // console.log(listNext);
    // console.log(contents);
    // const links = contents
    // console.log(listSize);
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
                    onClick={() => saveAll(bucket)}
                />
            </section>
            <section
                className={"flex flex-column pl3 mt5"}
            >
                <header>
                    <Text>{"Items " + contents.size}</Text>
                </header>
            </section>
            <section className={centerFlex}>
                <Input
                    type="button"
                    value="Show More"
                    onClick={bumpList}
                    className={"hover-bg-black hover-white grow"}
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
    withReducer(
        "listSize",
        "bumpList",
        ( count, _ ) => count + 10,
        10
    ),
    connect(
        null,
        {
            saveAll( bucket ) {

                return {
                    type: SAVE_ALL,
                    data: { bucket }
                };

            }
        }
    )
);


export const List = enhanceList(ListView);
