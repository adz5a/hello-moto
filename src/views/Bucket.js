import React, { Component } from 'react';
import { 
    InputWithLabel,
    Input,
    Button
} from "components/Form";

export function Form () {

    return (
        <form action="sign-up_submit" method="get" acceptCharset="utf-8">
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
                        name="bucketname"
                        type="text"
                        label="Bucket Name"
                    />
                </div>
            </fieldset>
            <Button type="submit" />
        </form>
    );

}
