import React from "react";
import {
    // viewStyle,
    // centerFlex,
    // inputStyle
} from "components/styles";
import {
    // Link
} from "react-router-dom";
import {
    // DefaultBorderedText as Text
} from "components/Text";
import { connect } from "react-redux";
import{
    // branch,
    // compose,
    // renderComponent
} from "components/recompose";
import {
    Map,
    // List,
    // Seq
} from "immutable";
import { ImageList, EmptyListView } from "./List";



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


export const Gallery = GalleryView;
