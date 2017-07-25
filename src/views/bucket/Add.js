import React, { } from 'react';
import {
    parseForm
} from "components/Form";
import noop from "lodash/noop";
import {
    centerFlex,
    inputStyle,
    defaultBordered
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
    Map,
    fromJS
} from "immutable";
import {
    compose,
    createEventHandler
} from "recompose";
import {
    componentFromStream
} from "components/stream";
import xs from "xstream";



function FormView ( { 
    onAdd = noop,
    onChange = noop,
    showSaved = false,
    showSpinner = false
} ) {

    // console.log(showSpinner);

    const spinnerStyle = showSpinner ? defaultBordered : "dn";
    const savedStyle = showSaved ? defaultBordered : "dn";
    return (
        <form action="sign-up_submit "
            method="get"
            acceptCharset="utf-8"
            className="dib pv4"
            onSubmit={ e => e.preventDefault() }
            onChange={() => console.log("changing")}
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
                    const { baseURL, name } = onAdd(parseForm(["baseURL", "name"], e.target.form));

                    return onAdd(fromObject({ baseURL, name }));

                }}
            />
            <span className={savedStyle}>Saved !</span>
            <span className={spinnerStyle}>Saving... </span>
        </form>
    );

}


const enhanceFormView = connect(
    null,
    dispatch => ({
        onAdd( bucket ) {

            const data = fromObject(bucket);
            return dispatch({

                type: INSERT_DOC,
                data: Map({
                    _id: data.id,
                    type: "bucket",
                    data: Map(data)
                })

            });

        }
    })
);



export const enhanceWithStream = Component => componentFromStream( prop$ => {

    const { handler: sendNextAdd, stream } = createEventHandler();
    console.log(stream);
      
    const add$ = xs.fromObservable(stream);

    const updateStatus = ( isAdding = false ) => !isAdding;

    const toDoc = bucket => Map({
        _id: bucket.id,
        type: "bucket",
        data: Map(bucket)
    });

    return prop$
        .map( ownProps => {

            const { onAdd: _onAdd } = ownProps;


            const onAdd = data => {

                console.log(data);
                return sendNextAdd(_onAdd(data));

            };


            return add$
                .fold(updateStatus, false)
                .map( isAdding => ({ 
                    showSpinner: isAdding,
                    onAdd: _onAdd
                }) );

        })
        .flatten()
        .map( props  => {

            return (
                <Component
                    { ...props }
                />
            );

        } );


} );

export const Form = compose(
    enhanceFormView,
    enhanceWithStream
)(FormView);

export function Add () {

    return (
        <section className={centerFlex}>
            <Form />
        </section>
    );

}
