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
import { FIND_DOC } from "data/db";



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




export function GalleryView () {

    return (
        <section
        >
            <h1>Gallery</h1>
            <GalleryStat />
            <ImageList />
        </section>
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
