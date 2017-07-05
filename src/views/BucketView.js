import React, {  } from 'react';
import curry from "lodash/curry";
import {
    connect
} from "react-redux";
import {
    compose
} from "recompose";
import {
    LIST_DIRS,
    LIST_CONTENT,
    SAVE
} from "data/bucket";
import keys from "lodash/keys";


function renderList ( prefixes ) {

    return keys(prefixes)
        .map( prefix => {

            const children = renderList(prefixes[prefix]);

            console.log(prefix);
            return (
                <li key={prefix}>
                    <span>{prefix}</span>
                    { 
                        children.length > 0 ?
                            <ul>{children}</ul>:
                            null
                    }
                </li>
            )

        });

}



export function BucketView ( { prefixes = {} } ) {

    console.log(prefixes);
    return (
        <section
            style={{
                textAlign: "left"
            }}
        >
            <ul>{renderList(prefixes)}</ul>
        </section>
    );

}

const enhance = connect(
    state => state.bucket
);

export const EnhancedBucketView = enhance(BucketView);
