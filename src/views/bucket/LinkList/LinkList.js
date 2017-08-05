import React, { } from 'react';
import {
    Map,
    is,
    List as ImmutableList
} from "immutable";
import { connect } from "react-redux";
import {
    compose,
    mapProps,
    // withProps,
    lifecycle,
    // branch,
    // renderComponent
    // componentFromStream,
    createEventHandler,
    mapPropsStream,
    once
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
import {
    listBucket
} from "data/xml.utils";
import xs from "xstream";
import dropRepeats from "xstream/extra/dropRepeats";
import { contentType } from "data/link";
import noop from "lodash/noop";
import {
    LIST_CONTENT
} from "data/bucket";

export function LinkListView ( {
    bucket = Map(),
    contents = ImmutableList(),
    nextContinuationToken = undefined,
    listNext = noop,
    syncBucket = noop,
    loading = false,
    isTruncated = false
} ) {

    // console.log("linklist view : ", bucket);
    return (
        <section>
            <Text text={bucket.get("name")}/>
            {loading ? <Text>Loading</Text>: null}
            <List
                contents={contents}
                bucket={bucket}
                listNext={listNext}
                syncBucket={syncBucket}
                isTruncated={isTruncated}
            />
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
        ( { 
            match, 
            store,
            dispatch
        } ) => {

            // console.log(match);
            const bucketId = match.params.bucketId
            console.log(bucketId);
            const bucket = store
                .get(bucketId, Map())
                .get("data", Map());

            console.log(bucket);
            return {
                bucket,
                dispatch
            };

        }
    ),
    once(
        props => props.bucket.get("id") !== undefined,
        props => props.dispatch({
            type: LIST_CONTENT,
            data: {
                bucket: props.bucket
            }
        })
    )
);





export const LinkList = enhanceLinkList(LinkListView);
