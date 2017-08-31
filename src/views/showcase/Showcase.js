import React from 'react';
import {
    Page
} from "components/Page";
import {
    Link
} from "react-router-dom";
import * as styles from "components/styles";

const lorem = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
`;


const MenuItems = () => (
    <ul className="list pa0 ma0">
        <li className="ph3 pv3 bb b--light-silver">Mackeral Tabby</li>
        <li className="ph3 pv3 bb b--light-silver">Burmese</li>
        <li className="ph3 pv3 bb b--light-silver">Orange Tabby</li>
        <li className="ph3 pv3 bb b--light-silver">Maine Coon</li>
        <li className="ph3 pv3 bb b--light-silver">Siamese</li>
        <li className="ph3 pv3 bb b--light-silver">Scottish Fold</li>
        <li className="ph3 pv3">American Bobtail</li>
    </ul>
);



export function Lorem () {

    return (
        <section>
            <h1>Lorem</h1>
            <p>
                {lorem}
            </p>
        </section>
    );

}
export function TextExample () {

    return (
        <section>
            <h1>Text Examples</h1>
            <div className={"list flex flex-column items-center justify-between"}>
                    <Link 
                        to="#"
                        className={styles.linkStyle}
                    >a link</Link>
                    <br />
                    <Link 
                        to="#"
                        className={styles.linkHoverableStyle}
                    >
                        a link with hover
                    </Link>
                    <br />
            </div>
            <div className={"list flex flex-column items-center justify-between"}>
                    <span className={styles.defaultBordered}>
                        a span
                    </span>
                    <br />
            </div>
            <div className={"list flex flex-column items-center justify-between"}>
                <input 
                    type="text"
                    defaultValue="a text input"
                    className={styles.inputStyle} />
                <br />
                <input 
                    type="button"
                    defaultValue="a button"
                    className={styles.inputStyle} />
                <br />
                <input 
                    type="button"
                    defaultValue="a button with hover"
                    className={styles.hoverableInputStyle} />
                <br />
            </div>
        </section>
    );

}

export function ShowcaseView () {

    return (
        <Page
            MenuItems={MenuItems}
        >
            <Lorem />
            <TextExample />
        </Page>
    );

}

export const Showcase = ShowcaseView;
