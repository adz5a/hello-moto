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
import noop from "lodash/noop";
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
            <EnhancedEmptyLinkList bucket={bucket} />
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


export function EmptyLinkList ( {
    onRequestContent = noop,
    bucket = bucketFactory()
} ) {

    return (
        <section className={centerFlex}>

            <input
                className={inputStyle}
                type="button"
                onClick={() => onRequestContent(bucket)}
                value="Get bucket content"
            />

        </section>
    );

}

const enhanceEmptyLinkList = connect(null,
    dispatch => ({
        onRequestContent( bucket ) {

            return dispatch({
                type: LIST_CONTENT,
                data: bucket
            });

        }
    })
);

export const EnhancedEmptyLinkList = enhanceEmptyLinkList(EmptyLinkList);
