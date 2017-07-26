import React, { } from 'react';
import {
    Map
} from "immutable";
import { connect } from "react-redux";
import {
    compose,
    mapProps,
    // withProps,
    // lifecycle,
    // branch,
    // renderComponent
} from "components/recompose";
import {
    DefaultBorderedText as Text
} from "components/Text";
import {
    withRouter
} from "react-router-dom";
import {
    List
} from "./List";


export function LinkListView ( { bucket = Map(), ...props } ) {

    return (
        <section>
            <Text text={bucket.get("name")}/>
            <List bucket={bucket} />
        </section>
    );

}


export const enhanceLinkList = compose(
    withRouter,
    connect( state => {

        return {
            store: state.db.store
        };

    } ),
    mapProps(
        ( { match, store } ) => {

            // console.log(match);
            const bucketId = match.params.bucketId
            const bucket = store.get(bucketId, Map()).get("data");
            console.log(bucket);

            return {
                bucket
            };

        }
    )
);


export const LinkList = enhanceLinkList(LinkListView);

