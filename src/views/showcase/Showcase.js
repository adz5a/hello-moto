import React from 'react';
import {
    Page
} from "components/Page";

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

export function ShowcaseView () {

    return (
        <Page
            MenuItems={
                MenuItems
            }
        >
            <h1>Lorem</h1>
            <p>
                {lorem}
            </p>
        </Page>
    );

}


export const Showcase = ShowcaseView;
