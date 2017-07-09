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



/*
 * Returns a list of folders as jsxElement
 * Recursively calls this function to list folders and
 * subfolders
 * @param prefixes - a list of { [ prefix ] : { [prefix/suffix]; ... } }
 * @returns ReactElement
 *
 */
export function folders ( prefixes ) {

    return keys(prefixes)
        .map( prefix => {

            const children = folders(prefixes[prefix]);

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



export function BucketFolderView ( { prefixes = {} } ) {

    return (
        <section
            style={{
                textAlign: "left"
            }}
        >
            <ul>{folders(prefixes)}</ul>
        </section>
    );

}


function renderContent ( item ) {

    return (
        <li key={item.Key}>{ item.Key }</li>
    );
}


export function BucketContentView ( {
    contents = {
        contents: []
} } ) {

    return (
        <section
            style={{
                textAlign: "left"
            }}
        >
            {
                contents ?
                    <ul>{ contents.contents.map(renderContent) }</ul>
                    : <span>nothing to show</span>
            }
        </section>
    );

}


const enhance = connect( state => state.bucket );


export const EnhancedBucketFolderView = enhance(BucketFolderView);
export const EnhancedBucketContentView = enhance(BucketContentView);
