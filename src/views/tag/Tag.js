import React from "react";
import {
    viewStyle,
    centerFlex,
    inputStyle,
    joinClasses as join
} from "components/styles";



export function Form ( {} ) {

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
                    <input type="text" name="baseURL" className={inputStyle} />
                </div>
                <div className="mt3">
                    <label className="db fw4 lh-copy f6">{"Quick Description"}</label>
                    <input type="text" name="name" className={inputStyle} />
                </div>
            </fieldset>
            <input
                value="Add"
                type="button"
                className={inputStyle}
                onClick={( e ) => {

                    e.preventDefault();
                    // onAdd(parseForm(["baseURL", "name"], e.target.form));

                }}
            />
        </form>
    );

}

export function View () {

    return (
        <section
            className={join(viewStyle, centerFlex)}
        >
            <Form />
        </section>
    );

}
