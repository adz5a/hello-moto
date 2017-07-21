import React, { } from 'react';
import {
    joinClasses as join,
    // controlStyle,
    // resetInput,
} from "components/Form";
import {
        linkStyle
} from "components/styles";
import {
    Link,
    Route
} from "react-router-dom";
import {
    // bucket as bucketFactory,
    // makeId,
} from "data/bucket";
// import { connect } from "react-redux";
// import noop from "lodash/noop";
import {
    // BucketList,
    EnhancedBucketList as BucketList
} from "./List";
import {
    Add
} from "./Add";

const viewStyle = {
    maxWidth: "45em",
    // border: "solid 1px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "2em"
};


function HomeHeader ( { match } ) {

    return (
        <section
            className={join("tr")}
        >
            <Link
                className={linkStyle}
                to={match.url + "/new"}
            >
                Create New
            </Link>
        </section>
    );

}


export function View ( { match, ...props } ) {

    return (
        <section
            style={viewStyle}
        >
            <Route
                path={match.url}
                exact
                component={() => <HomeHeader match={match}/>}
            />
            <Route
                path={match.url}
                exact
                component={BucketList}
            />
            <Route
                path={match.url +"/new"}
                component={Add}
            />
        </section>
    );

}
