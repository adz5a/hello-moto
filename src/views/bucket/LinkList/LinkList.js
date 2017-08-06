import React, { } from 'react';
import {
    Map,
    // is,
    List as ImmutableList
} from "immutable";
import { connect } from "react-redux";
import {
    compose,
    mapProps,
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
            store: state.db.store,
            buckets: state.buckets
        };

    } ),
    mapProps(
        ( { 
            match, 
            store,
            buckets,
            dispatch
        } ) => {

            // console.log(match);
            const bucketId = match.params.bucketId
            // console.log(bucketId);
            const bucket = store
                .get(bucketId, Map())
                .get("data", Map());


            const bucketData = buckets.get(bucket.get("id"));


            if ( bucketData !== undefined ) {


                const nextContinuationToken = bucketData
                    .get("nextContinuationToken");


                return {
                    bucket,
                    dispatch,
                    isTruncated: bucketData.get("isTruncated"),
                    nextContinuationToken,
                    contents: bucketData.get("contents"),
                    loading: bucketData.get("loading"),
                    listNext: () => dispatch({
                        type: LIST_CONTENT,
                        data: { bucket, nextContinuationToken }
                    })
                };

            } else {

                return {
                    bucket,
                    dispatch,
                };

            }



        }
    ),
    // will list the content 
    // as soon as a bucket prop is 
    // available to the component
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
