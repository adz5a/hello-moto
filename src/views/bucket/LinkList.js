import React, { } from 'react';
// import map from "lodash/map";
import fmap from "lodash/fp/map";
// import keys from "lodash/keys";
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
    DefaultBorderedText as Text
} from "components/Text";
import {
    // fromObject as bucketFactory,
    LIST_CONTENT,
    LIST_NEXT_CONTENT,
    SAVE_ALL
} from "data/bucket"
import {
    inputStyle,
    centerFlex,
    // joinClasses as join
} from "components/styles";
import {
    Input
} from "components/Form";
import {
    Map
} from "immutable";
import {
    withRouter
} from "react-router-dom";
import noop from "lodash/noop";



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

                return props.dispatch({
                    type: LIST_NEXT_CONTENT,
                    data: props.bucket
                });

            },
            saveAll() {

                return props.dispatch({
                    type: SAVE_ALL,
                    data: props.bucket
                });

            }
        })
    )
);


export const List = enhanceList(ListView);


export function LinkListView ( { bucket = Map(), ...props } ) {

    // console.log(bucket);
    // console.log(props);
    console.log("yolo");
    return (
        <section>
            <Text text={bucket.get("name")}/>
            <List bucket={bucket} />
        </section>
    );

}


export const enhanceLinkList = compose(
    withRouter,
    mapProps(
        ( { match } ) => {

            console.log(match);
            // const bucketId = match.para

            return {
                bucket: undefined
            };

        }
    )
);


export const LinkList = enhanceLinkList(LinkListView);
