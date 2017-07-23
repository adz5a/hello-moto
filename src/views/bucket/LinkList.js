import React, { } from 'react';
// import map from "lodash/map";
import fmap from "lodash/fp/map";
// import keys from "lodash/keys";
import { connect } from "react-redux";
import {
    compose,
    mapProps,
    withProps,
    // lifecycle,
    branch,
    renderComponent
} from "recompose";
import {
    DefaultBorderedText as Text
} from "components/Text";
import {
    bucket as bucketFactory,
    LIST_CONTENT,
    LIST_NEXT_CONTENT,
    SAVE_ALL
} from "data/bucket"
import {
    inputStyle,
    centerFlex,
    // joinClasses as join
} from "components/styles";
import {
    Input
} from "components/Form";

import noop from "lodash/noop";
// import { makeId } from "data/link";

// const renderList = links => map(links, ( link, _) => (
//     <li key={makeId(link)}>
//         {link.url + " - " + link.contentType}
//     </li>
// ));

export function LinkList ( { bucket = bucketFactory(), ...props } ) {

    // console.log(bucket);
    // console.log(props);
    return (
        <section>
            <Text text={bucket.name}/>
            <EnhancedList bucket={bucket} />
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

const renderLinks = fmap( link => (
    <p
        key={link.id}
        className={"flex justify-between"}
    >
        <Text>{link.url.split("/").pop()}</Text>
        <Text>{link.contentType}</Text>
    </p>
));


// const canContinue = get("status.continuationToken", null);

export function List ( { bucket, listNext = noop, saveAll = noop } ) {

    const { links = {}, } = bucket.links;
    return (
        <section
            className="mt5"
        >
            <section
                className="flex justify-between"
            >
                <Input
                    type="button"
                    value="Save All"
                    onClick={saveAll}
                />
                <Input
                    type="button"
                    value="Load More Items"
                    onClick={listNext}
                />
            </section>
            <section
                className={"flex flex-column pl3 mt5"}
            >
                <header>
                    <Text>{"Items " + Object.keys(links).length}</Text>
                </header>
                {renderLinks(links)}
            </section>
            <section>
                <Input
                    type="button"
                    value="Load More Items"
                    onClick={listNext}
                />
            </section>
        </section>
    );

}

export const enhanceList = compose(
    branch(
        props => !props.bucket || !props.bucket.links,
        renderComponent(EnhancedEmptyLinkList)
    ),
    connect( state => ({
        buckets: state.buckets
    })),
    withProps(
        props => ({
            listNext() {

                return props.dispatch({
                    type: LIST_NEXT_CONTENT,
                    data: props.bucket
                });

            },
            saveAll() {

                return props.dispatch({
                    type: SAVE_ALL,
                    data: props.bucket
                });

            }
        })
    )
);

export const EnhancedList = enhanceList(List);
