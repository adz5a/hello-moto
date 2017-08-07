import React from "react";
import {
    viewStyle,
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
    branch,
    compose,
    renderComponent
} from "components/recompose";
import { Map, List } from "immutable";



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


export function ListView ({ images = List() }) {

    return (
        <section className="">
            {"hihi"}
        </section>
    );

}


export function EmptyListView () {

    return (
        <section className="">
            No images for you
        </section>
    );

}


export const ImageList = compose(
    connect(
        state => ({
            images: state.db.byType.get("image", Map()).toList()
        })
    ),
    branch(
        props => props.images.size === 0,
        renderComponent(EmptyListView)
    )
)(ListView);


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
