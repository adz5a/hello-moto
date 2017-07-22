import React from "react";
import {
    viewStyle,
    linkStyle,
    joinClasses as join,
    centerFlex
} from "components/styles";
import {
    Link
} from "react-router-dom";

const ls = join(linkStyle, "ma3");
const vs = join(viewStyle, centerFlex, "justify-around");
export function View () {

    return (
        <section
            className={vs}
        >
            <Link
                className={ls}
                to={"/bucket"}
            >
                {"Buckets"}
            </Link>
            <Link
                className={ls}
                to={"/link"}
            >
                {"Links"}
            </Link>
            <Link
                className={ls}
                to={"/images"}
            >
                {"Images"}
            </Link>
        </section>
    );

}
