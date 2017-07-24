import React, { } from 'react';
import {
    parseForm
} from "components/Form";
import noop from "lodash/noop";
import {
    centerFlex,
    inputStyle 
} from "components/styles";
import {
    connect
} from "react-redux";
import {
    INSERT_DOC,
} from "data/db";
import { Map } from "immutable";


function FormView ( { onAdd = noop } ) {

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
                    <input type="text" name="baseURL" className={inputStyle} />
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
                    onAdd(parseForm(["baseURL", "name"], e.target.form));

                }}
            />
        </form>
    );

}


const enhanceFormView = connect(
    null,
    dispatch => ({
        onAdd( bucket ) {

            return dispatch({

                type: INSERT_DOC,
                data: Map({
                    type: "bucket",
                    data: Map(bucket)
                })

            });

        }
    })
);

export const Form = enhanceFormView(FormView);


export function Add () {

    return (
        <section className={centerFlex}>
            <Form />
        </section>
    );

}
