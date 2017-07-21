import React, { } from 'react';
import map from "lodash/map";
import { connect } from "react-redux";
import { 
    compose,
    mapProps,
    withProps
} from "recompose";
import {
    DefaultBorderedText as Text
} from "components/Text";
import {
    bucket as bucketFactory
} from "data/bucket"
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

            console.log(props);         
            return {
                bucket: props.buckets[props.bucketId]
            };

        }  
    )
);

export const EnhancedLinkList = enhanceLinkList(LinkList);
