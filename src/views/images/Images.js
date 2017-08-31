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
import {
    Gallery,
    route as galleryRoute
} from "./Gallery";
import PropTypes from "prop-types";


function Home ({ match }) {

    const link = join(linkStyle, "ma3", "hover-bg-black", "hover-white");
    const linkContainer = join(centerFlex, "space-between", "pa3");

    return (
        <div className={linkContainer}>
            <Link
                to={match.url + "/gallery"}
                className={link}
            >
                Gallery
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
                component={Home}
            />
            <Route
                path={galleryRoute(match)}
                component={Gallery}
            />
        </section>
    );

}
Images.propTypes = {
    match: PropTypes.any.isRequired
};
