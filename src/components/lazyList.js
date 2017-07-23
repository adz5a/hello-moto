import React from "react";
import { createEventHandler } from "recompose";
import { componentFromStream } from "components/stream";
import filterData from "lodash/filter";
import xs from "xstream";

const identity = x => x;
const K = x => () => x;

export const lazyList = ( {
    selector = identity,
    filter = K(true),
    chunkSize = 10
} = {} ) => {

    return Component => componentFromStream( prop$ => {

    const { handler: listMore, stream: more } = createEventHandler(); 

    const more$ = xs.from(more);
    const reset = ownerProps => {

        const items = filterData(selector(ownerProps), filter);
        const total = items.length;
        // console.log("lol", links, items, total);


        return {
            total,
            displayed: total < chunkSize ? total : chunkSize,
            items
        };

    }

    const update = ( { total, displayed, items }, _ ) => {
        const limit = displayed + chunkSize > total ?
            total :
            displayed + chunkSize;
        return {
            total,
            displayed: limit,
            items
        };

    };

    return prop$
        .map( ownerProps=> {

            return more$
                .fold(
                    update,
                    reset(ownerProps)
                )
            // merge props back
            // if names conflicts, new ones will 
            // erase old ones
                .map( newProps => ({
                    ...ownerProps,
                    ...newProps,
                    listMore
                }));

        })
        .flatten()
        .map(
            props => <Component
                {...props}
            />
        );
} );

}
