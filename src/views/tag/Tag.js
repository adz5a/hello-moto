import React from "react";
import {
    viewStyle,
    centerFlex,
    inputStyle,
    joinClasses as join
} from "components/styles";
import {
    parseForm
} from "components/Form";
import noop from "lodash/noop";
import {
    fromObject,
    CREATE_TAG
} from "data/tag";
import { connect } from "react-redux";


export function FormView ( { onAdd = noop } ) {

    return (
        <form action="sign-up_submit "
            method="get"
            acceptCharset="utf-8"
            className="dib pv4"
            onSubmit={ e => e.preventDefault() }
        >
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="ph0 mh0 fw6">Create New Tag</legend>
                <div className="mt3">
                    <label className="db fw4 lh-copy f6">{"Tag Name"}</label>
                    <input type="text" name="name" className={inputStyle} />
                </div>
                <div className="mt3">
                    <label className="db fw4 lh-copy f6">{"Quick Description"}</label>
                    <input type="text" name="description" className={inputStyle} />
                </div>
            </fieldset>
            <input
                value="Add"
                type="submit"
                className={inputStyle}
                onClick={( e ) => {

                    e.preventDefault();
                    onAdd(parseForm(["name", "description"], e.target.form));

                }}
            />
        </form>
    );

}


export const enhanceFormView = connect(
    null,
    dispatch => {
        return {
            onAdd ( tagObject ) {

                return dispatch({
                    type: CREATE_TAG,
                    data: fromObject(tagObject)
                });

            }
        };
    }
);


export const Form = enhanceFormView(FormView);



export function View () {

    return (
        <section
            className={join(viewStyle, centerFlex)}
        >
            <Form />
        </section>
    );

}
