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
            <ul>{renderList(prefixes)}</ul>
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
