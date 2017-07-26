import React, { } from 'react';
import {
    Map,
    is
} from "immutable";
import { connect } from "react-redux";
import {
    compose,
    mapProps,
    // withProps,
    lifecycle,
    // branch,
    // renderComponent
    componentFromStream
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


export function LinkListView ( { 
    bucket = Map(),
    contents = [],
    nextContinuationToken = undefined 
} ) {

    return (
        <section>
            <Text text={bucket.get("name")}/>
            <List 
                contents={contents}
                bucket={bucket} 
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

        const bucket$ = props$
            .map( props => props.bucket )
            .compose(dropRepeats(is))
            .filter( bucket => bucket !== undefined )
            .map( bucket => listBucket({
                baseURL: bucket.get("baseURL"),
                name: bucket.get("name")
            }) )
            .map(xs.fromPromise)
            .flatten()
            .map(({ contents, nextContinuationToken }) => {

                return {
                    contents,
                    nextContinuationToken
                };

            });


        return xs.combine(props$, bucket$)
            .map( ([props, list ]) => <Component {...{ ...props, list }}/> );
    })
);


export const LinkList = enhanceLinkList(LinkListView);

