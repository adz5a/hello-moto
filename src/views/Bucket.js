import React, { 
    // Component
} from 'react';
import {
    InputWithLabel,
    // Input,
    Button,
    Span
} from "components/Form";
import noop from "lodash/noop";
// import curry from "lodash/curry";
import {
    bucket,
    ADD_BUCKET,
    makeId
} from "data/bucket";
import {
    connect
} from "react-redux";
import {
    compose
} from "recompose";
import keys from "lodash/keys";

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
            className="dib"
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

export function InertForm ( bucket ) {

    return (
        <form action="sign-up_submit"
            method="get"
            acceptCharset="utf-8"
            className="dib"
            key={makeId(bucket)}
        >
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="ph0 mh0 fw6">Bucket Form</legend>
                <div className="mt3">
                    <label className="db fw4 lh-copy f6">{"Base URL"}</label>
                    <Span className="dib ">{bucket.baseURL}</Span>
                </div>
                <div className="mt3">
                    <label className="db fw4 lh-copy f6">{"Bucket Name"}</label>
                    <Span className="dib ">{bucket.name}</Span>
                </div>
            </fieldset>
            <Button
                value="Edit"
                type="submit"
            />
        </form>
    );

}

const enhanceForm = compose(
    connect(null, dispatch => ({
        onAdd ( data ) {

            return dispatch({
                type: ADD_BUCKET,
                data
            });

        }
    }))
);

export const EnhancedForm = enhanceForm(Form);

export function BucketItem ( bucket ) {

    return (
        <li key={makeId(bucket)}>
            <p>
                <Span>{bucket.name}</Span>
            </p>
        </li>
    );

}

export function List ( { buckets } ) {

    console.log(buckets);
    return (
        <div className="dib">
            {keys(buckets).map( key => buckets[key] ).map(InertForm)}
        </div>
    )

}

export const enhanceList = compose(
    connect( state => ({ buckets: state.buckets }) )
);

export const EnhancedList = enhanceList(List);
