import React, { 
    // Component
} from 'react';
import {
    InputWithLabel,
    // Input,
    Button
} from "components/Form";
import noop from "lodash/noop";
// import curry from "lodash/curry";
import { bucket } from "data/bucket";
import {
    connect
} from "react-redux";
import {
    compose
} from "recompose";
const parseForm = ( names = [] ) => form => {


    return names.reduce(( res, name ) => {

        res[name] = form.elements[name].value;
        return res;

    }, {});


};
const parse = parseForm(["baseURL", "name"]);

export function Form ( {
    onAdd = noop
} ) {

    return (
        <form action="sign-up_submit"
            method="get"
            acceptCharset="utf-8"
            onSubmit={ e => {

                e.preventDefault();
                const data = parse(e.target);
                onAdd(bucket(data));

            }}
        >
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="ph0 mh0 fw6">Bucket Form</legend>
                <div className="mt3">
                    <InputWithLabel
                        name="baseURL"
                        type="text"
                        label="Base URL"
                    />
                </div>
                <div className="mt3">
                    <InputWithLabel
                        name="name"
                        type="text"
                        label="Bucket Name"
                    />
                </div>
            </fieldset>
            <Button
                value="Add Bucket"
                type="submit"
            />
            <Button
                value="Save Bucket"
                type="button"
            />
        </form>
    );

}

export function BucketItem ( bucket ) {

    return (
        <li>
            <span>{bucket.name}</span>
        </li>
    );

}

export function List ( { buckets = [] } ) {

    return (
        <ul>{buckets.map(BucketItem)}</ul>
    )

}
