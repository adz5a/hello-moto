import React, { } from 'react';
import {
    joinClasses as join,
    // controlStyle,
    // resetInput,
} from "components/Form";
import {
    linkStyle,
    viewStyle
} from "components/styles";
import {
    Link,
    Route,
    Switch
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
} from "./BucketList";
import {
    Add
} from "./Add";
import {
    // LinkList,
    EnhancedLinkList as LinkList
} from "./LinkList";
import {
    Edit
} from "./Edit";

// const viewStyle = {
//     // minWidth: "45em",
//     maxWidth: "80%",
//     // border: "solid 1px",
//     marginLeft: "auto",
//     marginRight: "auto",
//     marginTop: "2em"
// };


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
            className={viewStyle}
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
            <Switch>
                <Route
                    path={match.url +"/new"}
                    component={Add}
                />
                <Route
                    path={match.url +"/:bucketId/list"}
                    component={LinkList}
                />
                <Route
                    path={match.url +"/:bucketId/edit"}
                    component={Edit}
                />
            </Switch>
        </section>
    );

}
