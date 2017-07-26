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
import { contentType } from "data/link";

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
            .map( bucket => {

                return listBucket({
                    baseURL: bucket.get("baseURL"),
                    name: bucket.get("name")
                })
                    .then(({ contents, nextContinuationToken }) => {

                        const baseURL = bucket.get("baseURL");
                        return {
                            nextContinuationToken,
                            contents: contents.map(item => {

                                const url = baseURL + "/" + item.Key;
                                return {
                                    url,
                                    size: item.Size,
                                    lastModified: item.LastModified,
                                    contentType: contentType({ url })
                                };

                            })
                        };

                    });

            } )
            .map(xs.fromPromise)
            .flatten()
            .map(({ contents, nextContinuationToken }) => {

                return {
                    contents,
                    nextContinuationToken
                };

            });


        return xs.combine(props$, bucket$)
            .map( ([props, bucketData ]) => {


                const finalProps = {
                    ...props,
                    ...bucketData
                };

                return <Component {...finalProps}/>
            } );
    })
);


export const LinkList = enhanceLinkList(LinkListView);

