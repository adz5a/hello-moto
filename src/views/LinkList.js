import React, { } from 'react';
import {
    InputWithLabel
} from "components/Form";
import map from "lodash/map";
import { connect } from "react-redux";
import { compose } from "recompose";
import { makeId } from "data/link";

const renderList = links => map(links, ( link, _) => (
    <li key={makeId(link)}>
        {link.url + " - " + link.contentType}
    </li>
));

export function LinkList ( { links } ) {

    return (
        <div>
            <ul>
                {renderList( links )}
            </ul>
        </div>
    );

}

const enhanceLinkList = connect( state => ({links: state.links }) );

export const EnhancedLinkList = enhanceLinkList(LinkList);
