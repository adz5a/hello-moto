import React from "react";
import {
    joinClasses as join
} from "components/styles";
import { css } from "glamor";
import { MenuIcon } from "components/icons";


export const mainStyle = join(
    "mt5",
    "pl3",
    "pr3"
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

export function PageView ({ children }) {

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

