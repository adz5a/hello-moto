import React from "react";
import {
    bucket as bucketFactory,
    makeId,
} from "data/bucket";
import {
    joinClasses as join,
    controlStyle,
    resetInput,
    linkStyle
} from "components/Form";
import {
    Link
} from "react-router-dom";
import noop from "lodash/noop";
import keys from "lodash/keys";
import { 
    compose
} from "recompose";
import {
    connect
} from "react-redux";


const Yolo = () => <div>yolo</div>;

export function BucketList ( { buckets = [] } ) {

    return (
        <section
            className="flex flex-column items-center"
        >

            {
                buckets.map(
                    bucket => <BucketQuickDescription 
                        key={makeId(bucket)}
                        bucket={bucket}
                    />
                )
            }
        </section>
    );

}

export const enhanceBucketList = connect(
    state => ({
        buckets: keys(state.buckets)
            .map(bucket => state.buckets[bucket])
    })
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
