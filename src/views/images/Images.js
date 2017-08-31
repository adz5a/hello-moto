import React from "react";
import { css } from "glamor";
import {
    viewStyle,
    centerFlex,
    linkStyle,
    joinClasses as join
} from "components/styles";
import {
    Page
} from "components/Page";
import {
    Link,
    Route
} from "react-router-dom";
import {
    Gallery,
    route as galleryRoute
} from "./Gallery";
import PropTypes from "prop-types";
import { MenuIcon } from "components/icons";

function Home ({ match }) {

    const link = join(linkStyle, "ma3", "hover-bg-black", "hover-white");
    const linkContainer = join(centerFlex, "space-between", "pa3");

    return (
        <Page
            hasMenu={false}
            title="Images"
        >
            <div className={linkContainer}>
                <Link
                    to={match.url + "/gallery"}
                    className={link}
                >
                    Gallery
                </Link>
            </div>
        </Page>
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
