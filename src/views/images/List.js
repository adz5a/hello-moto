import React from "react";
import{
    branch,
    compose,
    renderComponent
} from "components/recompose";
import { connect } from "react-redux";
import { Map, List } from "immutable";


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
