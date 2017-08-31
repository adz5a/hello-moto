import React from 'react';
import {
    Page
} from "components/Page";
import {
    TextListView
} from "views/images/list/ImageText";
import {
    ThumbListView
} from "views/images/list/ImageThumb";
import {
    Link
} from "react-router-dom";
import {
    Seq,
    List,
    Repeat,
    Map
} from "immutable";
import {
    Tag
} from "data/tag";
import {
    Data as Image,
} from "data/image";
import {
    Doc
} from "data/commons";

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



export function ListImageExample () {
    return (
        <section>
            <TextListView 
                images={
                    Repeat(300, 2)
                        .map((width, i) => Doc({
                            _id: "yolo" + i,
                            data: Image({
                                url: "https://unsplash.it/" + width + "/300?random"
                            }),
                            tag: Tag()
                        }))
                }
            />
            <ThumbListView 
                images={
                    Repeat(300, 2)
                        .map((width, i) => Doc({
                            _id: "yolo" + i,
                            data: Image({
                                url: "https://unsplash.it/" + width + "/300"
                            }),
                            tag: Tag()
                        }))
                }
            />
        </section>
    );
}
export function ShowcaseView () {

    return (
        <Page
            MenuItems={MenuItems}
            title="ShowCase"
        >
            <Lorem />
            <TextExample />
            <ListImageExample />

        </Page>
    );

}

export const Showcase = ShowcaseView;
