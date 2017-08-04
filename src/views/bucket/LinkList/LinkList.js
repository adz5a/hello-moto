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
    // componentFromStream,
    createEventHandler,
    mapPropsStream
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


const awaitPromise = stream => stream
    .map(xs.fromPromise)
    .flatten();


const getList = ({
    bucket = Map(),
    nextContinuationToken: continuationToken,
    contents = ImmutableList()
}) => {

    console.log("called");
    // console.log(bucket.get("baseURL"));
    // console.log(bucket.get("name"));

    return listBucket({
        baseURL: bucket.get("baseURL"),
        name: bucket.get("name"),
        continuationToken
    })
        .then(({ contents: newContents, nextContinuationToken, ...rest }) => {

            const baseURL = bucket.get("baseURL");
            // console.log("new : ", newContents);
            // console.log("old : ", contents);

            console.log(rest);
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
                bucket,
                isTruncated: rest.isTruncated === "true" // it currently returns a string
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
    mapPropsStream(props$ => {


        const { handler: listNext, stream: next$ } = createEventHandler();
        const { handler: syncBucket, stream: sync$ } = createEventHandler();

        const propsProxy$ = xs.create();

        const bucket$ = props$
            .map( props => props.bucket )
            .filter( bucket => bucket !== undefined && Map.isMap(bucket) )
            .compose(dropRepeats(is));


        const initialState$ = bucket$
            .map( bucket => {

                return [ { bucket }, getList({ bucket }) ];

            } );


        const onNewBucket$ = initialState$
            .map( ([ props, next ]) => xs
                .fromPromise(next)
                .map( res => ({
                    ...res,
                    loading:false
                }) )
                .startWith({
                    ...props,
                    loading: true
                }))
            .flatten();


        const nextBucketsProps$ = propsProxy$
            .map( props => xs
                .merge(next$, sync$)
                .map(_ => [ props, getList(props) ]))
            .flatten()
            .drop(1)
            .map(([ props, next ]) => {


                return xs
                    .fromPromise(next)
                    .map(props => ({
                        ...props,
                        loading: false
                    }))
                    .startWith({
                        ...props,
                        loading: true
                    });


            })
            .flatten()
            .debug("next");

        const finalProps$ = xs
            .merge(onNewBucket$, nextBucketsProps$)
            .debug("props")
            .map(props => ({
                ...props,
                listNext,
                syncBucket
            }))
            .replaceError(e => {

                console.error(e);
                return e;

            });


        propsProxy$.imitate(finalProps$);


        return finalProps$;
    })
);


export const LinkList = enhanceLinkList(LinkListView);
