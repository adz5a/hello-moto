import React from "react";
import{
    branch,
    compose,
    renderComponent,
    mapPropsStream,
    getContext
} from "components/recompose";
import { connect } from "react-redux";
import { Map, List, Seq } from "immutable";
import { css } from "glamor";
import {
    // viewStyle,
    // centerFlex,
    // inputStyle
    joinClasses as join
} from "components/styles";
import PropTypes from "prop-types";
import debounce from "xstream/extra/debounce";
import {
    Thumb
} from "./ImageThumb";


const EmptySeq = Seq();



const renderImage = imageDoc => <Thumb
    key={imageDoc.get("_id")}
    image={imageDoc}
/>


const list = join("flex", "justify-between", "flex-wrap");
export function ListView ({
    images = EmptySeq,
    size = 10,
    scrollHeight
}) {

    return (
        <section
            className={list}
        >
            {images.slice(0, size).map(renderImage).toArray()}
        </section>
    );

}


const enhanceListView = compose(
    getContext({
        scrollMonitor: PropTypes.object
    }),
    mapPropsStream(props$ => props$
        .map(props => {


            const maxHeight = window.document.body.scrollHeight;
            const innerHeight = window.innerHeight;

            const {
                scrollMonitor: scroll$,
                images,
                ...otherProps
            } = props;


            return scroll$
                .compose(debounce(70))
                .map( () => window.scrollY )
                .map( currentHeight => window.document.body.scrollHeight - innerHeight - currentHeight )
                .fold(( size, spread ) => {

                    if ( spread < 100 && size < images.size ) {

                        return size + 10;

                    } else {

                        return size;

                    }

                }, 10)
                .map(size => {

                    return {
                        ...props,
                        size
                    };

                });

        })
        .flatten()
    )
);

export function EmptyListView () {

    return (
        <section>
            No images for you
        </section>
    );

}


export const ImageList = compose(
    connect(
        state => ({
            images: state.db.byType.get("image", EmptySeq).toSeq()
        })
    ),
    branch(
        props => props.images.size === 0,
        renderComponent(EmptyListView)
    ),
    enhanceListView
)(ListView);
