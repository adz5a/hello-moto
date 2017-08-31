import React from "react";
import { css } from "glamor";
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
import { MenuIcon } from "components/icons";

function Home ({ match }) {

    const link = join(linkStyle, "ma3", "hover-bg-black", "hover-white");
    const linkContainer = join(centerFlex, "space-between", "pa3");

    return (
        <PageView>
            <div className={linkContainer}>
                <Link
                    to={match.url + "/gallery"}
                    className={link}
                >
                    Gallery
                </Link>
            </div>
        </PageView>
    );

}


export const mainStyle = join(
    "mt5",
    "mw6-l",
    "mw4-m",
    "w-100",
    css({
        backgroundColor: "lightblue"
    })
);


const headerStyle = join(
    "fixed",
    "shadow-3",
    "header",
    "h3",
    "flex",
    "items-center",
    "justify-between",
    "pl1",
    "pr1",
    css({
        top: "0",
        left: "0",
        right: "0",
        zIndex: 2000
    })
);

const titleStyle = join(
    "h2"
);

const menuIconStyle = join(
    "h2",
    "w2",
    "pointer",
    "grow",
);
function PageView ({ children }) {

    return (
        <section
        >
            <header className={headerStyle}>
                <h2 className={titleStyle}>Gallery</h2>
                <MenuIcon className={menuIconStyle} />
            </header>
            <main className={mainStyle}>
                {children}
            </main>
        </section>
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
