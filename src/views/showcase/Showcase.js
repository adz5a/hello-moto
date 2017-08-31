import React from 'react';
import {
    Page
} from "components/Page";
import {
    joinClasses as join
} from "components/styles";
import {
    TextListView,
    TextImage
} from "views/images/list/ImageText";
import {
    ThumbListView,
    Thumb as ImageThumb
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
import noop from "lodash/noop";

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


    const images = Repeat(300, 2)
        .map((width, i) => Doc({
            _id: "yolo" + i,
            data: Image({
                url: "https://unsplash.it/" + width + "/300?random"
            }),
            tag: Tag()
        }))
    return (
        <section>
            <section>
                {
                    images
                        .toSeq()
                        .map((imageDoc, i) => {

                            return (
                                <TextImage
                                    key={imageDoc.get("_id")}
                                    image={imageDoc}
                                    selected={i % 2 === 0}
                                />
                            );

                        })
                        .toArray()
                }
            </section>
            <section className={join("flex", "justify-between", "flex-wrap", "flex-column")}>
                {
                    images
                        .toSeq()
                        .map((imageDoc, i) => {

                            return (
                                <ImageThumb
                                    key={imageDoc.get("_id")}
                                    image={imageDoc}
                                    openTagModal={noop}
                                    selected={i % 2 === 0}
                                />
                            );

                        })
                        .toArray()
                }
            </section>
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
