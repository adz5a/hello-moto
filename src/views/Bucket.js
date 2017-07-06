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
    SAVE,
    SAVE_ALL
} from "data/bucket";

const noop = () => {};

function parseForm ( keys, form ) {

    return keys.reduce( ( res, key ) => {

        res[key] = form.elements[key].value;
        return res;

    }, {});

}

const parse = curry(parseForm)(["baseURL", "bucket"]);

export function Bucket ({ 
    onListDir = noop,
    onList = noop,
    onSave = noop,
    onSaveAll = noop
}) {

    return (
        <form onSubmit={e => {
            e.preventDefault();
        }}>
        <ul>
            <li><input type="text" name="baseURL" placeholder="https://"/></li>
            <li><input type="text" name="bucket" placeholder="bucket-x"/></li>
        </ul>

        <button type="submit" onClick={e => onListDir(parse(e.target.form))}>List Folders</button>
        <button type="submit" onClick={e => onList(parse(e.target.form))}>List Content</button>
        <button type="submit" onClick={e => onSave(parse(e.target.form))}>Save</button>
        <button type="submit" onClick={e => onSaveAll(parse(e.target.form))}>Save All</button>
    </form>
    );

}


export const enhance = compose(
    connect(null, dispatch => ({
        onList( data ) {

            return dispatch({
                type: LIST_CONTENT,
                data
            });

        },
        onSave( data ) {

            return dispatch({
                type: SAVE,
                data
            });

        },
        onSaveAll( data ) {

            return dispatch({
                type: SAVE_ALL,
                data
            });

        },
        onListDir( data ) {

            return dispatch({
                type: LIST_DIRS,
                data
            });

        }
    }))
);


export const EnhancedBucket = enhance(Bucket);
