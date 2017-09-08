import React, { } from 'react';
import {
    parseForm
} from "components/Form";
import noop from "lodash/noop";
import {
    centerFlex,
    inputStyle,
    // defaultBordered
} from "components/styles";
import {
    connect
} from "react-redux";
import {
    INSERT_DOC,
} from "data/db";
import {
    fromObject
} from "data/bucket";
import {
    compose,
    // createEventHandler
} from "components/recompose";
// import {
//     componentFromStream
// } from "components/recompose";
// import xs from "xstream";



function FormView ( { 
    onAdd = noop,
    // onChange = noop,
    // showSaved = false,
    // showSpinner = false
} ) {

    // console.log(showSpinner);

    return (
        <form action="sign-up_submit "
            method="get"
            acceptCharset="utf-8"
            className="dib pv4"
            onSubmit={ e => e.preventDefault() }
        >
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="ph0 mh0 fw6">Create New Bucket</legend>
                <div className="mt3">
                    <label className="db fw4 lh-copy f6">{"Base URL"}</label>
                    <input type="text" name="url" className={inputStyle} />
                </div>
                <div className="mt3">
                    <label className="db fw4 lh-copy f6">{"Bucket Name"}</label>
                    <input type="text" name="name" className={inputStyle} />
                </div>
            </fieldset>
            <input
                value="Add"
                type="button"
                className={inputStyle}
                onClick={( e ) => {

                    e.preventDefault();
                    const { url, name } = parseForm(["url", "name"], e.target.form);

                    return onAdd(fromObject({ url, name }));

                }}
            />
        </form>
    );

}



export const Form = compose(
    connect(
        null,
        {
            onAdd ( bucket ) {
                return {
                    type: INSERT_DOC,
                    data: bucket
                }
            }
        }
    ),
)(FormView);

export function Add () {

    return (
        <section className={centerFlex}>
            <Form />
        </section>
    );

}
