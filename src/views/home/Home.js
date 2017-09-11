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
                to={"/snake"}
            >
                {"Snake"}
            </Link>
            <Link
                className={ls}
                to={"/showcase"}
            >
                {"Showcase"}
            </Link>
            <Link
                className={ls}
                to={"/youtube"}
            >
                {"Youtube"}
            </Link>
        </section>
    );

}
