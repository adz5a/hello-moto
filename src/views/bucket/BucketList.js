import React from "react";
import {
    joinClasses as join,
    preventDefault
} from "components/Form";
import {
    defaultBordered,
    linkStyle,
} from "components/styles";
import {
    Link,
    withRouter
} from "react-router-dom";
import noop from "lodash/noop";
// import keys from "lodash/keys";
import {
    compose,
    renderComponent,
    branch
} from "components/recompose";
import {
    connect
} from "react-redux";
// import map from "lodash/map";
import {
    Map,
    // is
} from "immutable";


function Text ( { text } ) {

    return <span className={defaultBordered}>{text}</span>

}

const centerFlex ="flex flex-column items-center";


export function BucketQuickDescriptionView ( {
    bucket = Map(),
    match  = {},
    onDelete = noop
} ) {

    const bucketId = bucket.get("id", null);
    const baseURL = bucket.get("baseURL", null);
    const name = bucket.get("name", null);

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
                    <span className={join(linkStyle, "dib")}>{baseURL}</span>
                </div>
                <div className="mt3">
                    <label className="db fw4 lh-copy f6">{"Bucket Name"}</label>
                    <span className={join(linkStyle, "dib")}>{name}</span>
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


export function BucketListView ( {
    buckets = Map(),
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
                buckets
                    .toArray()
                    .map(
                        bucket => <BucketQuickDescriptionView
                            key={bucket.get("id")}
                            bucket={bucket}
                            match={match}
                        />
                    )
            }
        </section>
    );

}


function EmptyBucketListView () {

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
            buckets: state.db.store
            .filter( doc => doc.get("type") === "bucket")
            .map( doc => doc.get("data") )
        }),
    ),
    branch(
        ({ buckets }) => buckets.size === 0,
        renderComponent(EmptyBucketListView)
    ),
    withRouter
);

export const BucketList = enhanceBucketList(BucketListView);

