import React, { } from 'react';
import map from "lodash/map";
import { connect } from "react-redux";
import { 
    compose,
    mapProps,
    withProps,
    lifecycle
} from "recompose";
import {
    DefaultBorderedText as Text
} from "components/Text";
import {
    bucket as bucketFactory,
    LIST_CONTENT
} from "data/bucket"
import {
    inputStyle,
    centerFlex,
    joinClasses as join
} from "components/styles";
// import { makeId } from "data/link";

// const renderList = links => map(links, ( link, _) => (
//     <li key={makeId(link)}>
//         {link.url + " - " + link.contentType}
//     </li>
// ));

export function LinkList ( { bucket = bucketFactory(), ...props } ) {

    console.log(bucket);
    console.log(props);
    return (
        <section>
            <Text text={bucket.name}/>
            <EmptyLinkList />
        </section>
    );

}


export function EmptyLinkList () {

    return (
        <section className={centerFlex}>

            <input
                className={inputStyle}
                type="button"
                onClick={() => {}}
                value="Get bucket content"
            />

        </section>
    );

}


const enhanceLinkList = compose(
    connect(
        state => {

            return {
                buckets: state.buckets
            };

        }
    ),
    withProps( props => ({

        bucketId: props.match.params.bucketId

    })),
    mapProps(
        props => {

            return {
                bucket: props.buckets[props.bucketId],
                dispatch: props.dispatch
            };

        }  
    ),
);

export const EnhancedLinkList = enhanceLinkList(LinkList);
