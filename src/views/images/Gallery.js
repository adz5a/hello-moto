import React from "react";
import { connect } from "react-redux";
import {
    Map,
} from "immutable";
import { ImageList, } from "./list/List";
import {
    once,
    compose
} from "components/recompose";
import {
    Page
} from "components/Page";
import { FIND_DOC } from "data/db";
// import {
//     Route
// } from "react-router-dom";
import {
    Menu
} from "views/images/GalleryMenu";



export const route = match => match.url + "/gallery";


export function GalleryStatView ( { count = 0 } ) {

    return (
        <section className="dib">
            {"Image count : " + count}
        </section>
    );

}


export const GalleryStat = connect(
    state => ({
        count: state.db.byType.get("image", Map()).size
    })
)(GalleryStatView);




export function GalleryView ({ match }) {

    return (
        <Page
            title="Gallery"
            menuOpen={true}
            MenuItems={Menu}
        >
            <GalleryStat />
            <ImageList />
        </Page>
    );

}


export const Gallery = compose(
    connect(),
    once(
        // will executeas soon as mounted
        () => true,
        props => props.dispatch({
            type: FIND_DOC,
            data: {
                query: {
                    selector: {
                        type: "image"
                    }
                }
            }
        })
    )
)(GalleryView);
