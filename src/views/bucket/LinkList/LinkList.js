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
    // lifecycle,
    // branch,
    // renderComponent
    componentFromStream,
    createEventHandler
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

export function LinkListView ( {
    bucket = Map(),
    contents = [],
    nextContinuationToken = undefined,
    listNext = noop,
    syncBucket = noop
} ) {

    // console.log("linklist view : ", bucket);
    return (
        <section>
            <Text text={bucket.get("name")}/>
            <List
                contents={contents}
                bucket={bucket}
                listNext={listNext}
                syncBucket={syncBucket}
            />
        </section>
    );

}

const getList = ({
    bucket = Map(),
    nextContinuationToken: continuationToken,
    contents = ImmutableList()
}) => {

    // console.log("called");
    // console.log(bucket.get("baseURL"));
    // console.log(bucket.get("name"));

    return listBucket({
        baseURL: bucket.get("baseURL"),
        name: bucket.get("name"),
        continuationToken
    })
        .then(({ contents: newContents, nextContinuationToken }) => {

            const baseURL = bucket.get("baseURL");
            // console.log("new : ", newContents);
            // console.log("old : ", contents);

            return {
                nextContinuationToken,
                contents: contents.concat(ImmutableList(newContents.map(item => {

                    const url = baseURL + "/" + item.Key;
                    return Map({
                        url,
                        size: item.Size,
                        lastModified: item.LastModified,
                        contentType: contentType({ url })
                    });

                }))),
                bucket
            };

        });

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

            return {
                bucket
            };

        }
    ),
    Component => componentFromStream(props$ => {


        const { handler: listNext, stream: next$ } = createEventHandler();
        const { handler: syncBucket, stream: sync$ } = createEventHandler();



        const bucketProps$ = props$
            .map( props => props.bucket )
            .compose(dropRepeats(is))
            .filter( bucket => bucket !== undefined )
            .map( bucket => {


                return getList({ bucket });

            } )
            .map(xs.fromPromise)
            .flatten()
            .map(({ contents, nextContinuationToken, bucket }) => {

                return {
                    contents,
                    nextContinuationToken,
                    bucket,
                };

            });

        const nextBucketsProps$ = bucketProps$
            .map( props => xs.merge(next$, sync$)
                .mapTo(props)
                .debug("next")
                .fold((prevRqst, _) => {

                    return prevRqst
                    // gets prev request calls for a new
                    // state
                        .then(getList)
                    // restore previous correct state
                        .catch(() => prevRqst);

                }, Promise.resolve(props)))
            .flatten()
            .map(xs.fromPromise)
            .flatten()
            .drop(1);

        return xs
            .merge(bucketProps$, nextBucketsProps$)
            .debug("props")
            .map( props => <Component
                    {...props}
                    listNext={listNext}
                    syncBucket={syncBucket}
                /> );
    })
);


export const LinkList = enhanceLinkList(LinkListView);
