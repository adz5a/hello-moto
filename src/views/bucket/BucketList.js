import React from "react";
import {
    fromObject as bucketFactory,
    makeId,
    DELETE_ALL
} from "data/bucket";
import {
    joinClasses as join,
    preventDefault
} from "components/Form";
import {
    defaultBordered,
    linkStyle,
} from "components/styles";
import {
    Link
} from "react-router-dom";
import noop from "lodash/noop";
// import keys from "lodash/keys";
import { 
    compose,
    renderComponent,
    branch
} from "recompose";
import {
    connect
} from "react-redux";
import map from "lodash/map";


function Text ( { text } ) {

    return <span className={defaultBordered}>{text}</span>

}

const centerFlex ="flex flex-column items-center";

export function BucketList ( { 
    buckets = [],
    onDeleteAll = noop,
    match = {}
} ) {

    return (
        <section
            className={centerFlex}
        >
            <form onSubmit={preventDefault}>
                <input
                    value="Delete All"
                    type="submit"
                    className={join(linkStyle, "reset-input")}
                    onClick={onDeleteAll}
                />
            </form>
            {
                buckets.map(
                    bucket => <BucketQuickDescription 
                        key={makeId(bucket)}
                        bucket={bucket}
                        match={match}
                    />
                )
            }
        </section>
    );

}

function EmptyBucketList () {

    return (
        <section
            className={centerFlex}
        >
            <Text text={"You don't seem to have any bucket :("} />
        </section>
    );

}

export const enhanceBucketList = compose(
    connect(
        state => ({
            buckets: map(state.buckets)
        }),
        dispatch => ({
            onDeleteAll() {

                return dispatch({
                    type: DELETE_ALL
                });

            }
        })
    ),
    branch(
        ({ buckets }) => buckets.length === 0,
        renderComponent(EmptyBucketList)
    )
);

export const EnhancedBucketList = enhanceBucketList(BucketList);

export function BucketQuickDescription ( {
    bucket = bucketFactory(),
    match  = {},
    onDelete = noop
} ) {

    const bucketId = makeId(bucket);

    return (
        <form action="sign-up_submit "
            method="get"
            acceptCharset="utf-8"
            className="dib pv4"
            onSubmit={ e => e.preventDefault() }
        >
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="ph0 mh0 fw6">Bucket</legend>
                <div className="mt3">
                    <label className="db fw4 lh-copy f6">{"Base URL"}</label>
                    <span className={join(linkStyle, "dib")}>{bucket.baseURL}</span>
                </div>
                <div className="mt3">
                    <label className="db fw4 lh-copy f6">{"Bucket Name"}</label>
                    <span className={join(linkStyle, "dib")}>{bucket.name}</span>
                </div>
            </fieldset>
            <Link
                className={linkStyle}
                to={match.url + "/" + bucketId + "/edit"}
            >
                Edit
            </Link>
            <Link
                className={linkStyle}
                to={match.url + "/" + bucketId + "/list"}
            >
                List Items
            </Link>
            <input
                value="Delete"
                type="submit"
                className={join(linkStyle, "reset-input")}
                onClick={() => {

                    onDelete(bucket);

                }}
            />
        </form>
    );

}
