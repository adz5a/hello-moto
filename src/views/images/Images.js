import React from "react";
import {
    viewStyle,
    centerFlex,
    linkStyle,
    joinClasses as join
} from "components/styles";
import {
    Link,
    Route
} from "react-router-dom";



function Links ({ match }) {

    const link = join(linkStyle, "ma3");
    const linkContainer = join(centerFlex, "space-between", "pa3");

    return (
        <div className={linkContainer}>
            <Link
                to={match.url + "/gallery"}
                className={link}
            >
                Gallery
            </Link>
            <Link
                to={match.url + "/add"}
                className={link}
            >
                Add
            </Link>
        </div>
    );

}


export function Images ( { match } ) {




    return (
        <section className={viewStyle}>
            <Route
                path={match.url}
                exact
                component={Links}
            />
        </section>
    );

}
