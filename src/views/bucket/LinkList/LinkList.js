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

export function LinkListView ( { 
    bucket = Map(),
    contents = [],
    nextContinuationToken = undefined,
    listNext
} ) {

    console.log(bucket);
    return (
        <section>
            <Text text={bucket.get("name")}/>
            <List 
                contents={contents}
                bucket={bucket} 
                listNext={listNext}
            />
        </section>
    );

}

const getList = ({ 
    bucket,
    continuationToken,
    contents = ImmutableList()
}) => listBucket({
    baseURL: bucket.get("baseURL"),
    name: bucket.get("name"),
    continuationToken
})
    .then(({ contents: newContents, nextContinuationToken }) => {

        const baseURL = bucket.get("baseURL");
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
                    bucket
                };

            });

        const nextBuckets = bucketProps$
            .map( props => next$
                .fold((bucket, _) => {


                }, Promise.resolve(props)) );

        return bucketProps$.map( props => <Component {...props}/>);
    })
);


export const LinkList = enhanceLinkList(LinkListView);

