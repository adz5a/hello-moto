import React, { } from 'react';
import noop from "lodash/noop";
import fmap from "lodash/fp/map";
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
    mapProps,
    withProps,
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


const renderLinks = fmap( link => (
    <p
        key={link.id}
        className={"flex justify-between"}
    >
        <Text>{link.url.split("/").pop()}</Text>
        <Text>{link.contentType}</Text>
    </p>
));


export function ListView ( { bucket, listNext = noop, saveAll = noop } ) {

    const { links = {}, } = bucket.links;
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
                    <Text>{"Items " + Object.keys(links).length}</Text>
                </header>
                {renderLinks(links)}
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
        props => !props.bucket || !props.bucket.links,
        renderComponent(EmptyList)
    ),
    connect( state => ({
        buckets: state.buckets
    })),
    withProps(
        props => ({
            listNext() {

                // return props.dispatch({
                //     type: LIST_NEXT_CONTENT,
                //     data: props.bucket
                // });

            },
            saveAll() {

                // return props.dispatch({
                //     type: SAVE_ALL,
                //     data: props.bucket
                // });

            }
        })
    )
);


export const List = enhanceList(ListView);

