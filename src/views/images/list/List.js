import React from "react";
import{
    branch,
    compose,
    renderComponent,
    withReducer
} from "components/recompose";
import { connect } from "react-redux";
import {
    // Map,
    // List,
    Seq
} from "immutable";
// import { css } from "glamor";
import {
    // viewStyle,
    // centerFlex,
    // inputStyle
} from "components/styles";
import {
    ThumbListView
} from "./ImageThumb";
import { TagListView, TagList } from "./TagList";
import { infiniteScroll } from "components/infiniteScroll";
import { TextListView } from "./ImageText";
import { ToggleListView } from "./ToggleList";
import { CreateTagModal } from "./CreateTag";
import noop from "lodash/noop";


const EmptySeq = Seq();








export function EmptyListView () {

    return (
        <section>
            No images for you
        </section>
    );

}


export function ListView ({
    View = TextListView,
    onToggle,
    modalState = {},
    toggleModal = noop,
    ...props
}) {

    const { show, image: currentImage } = modalState;

    console.log(show, currentImage);
    return (
        <div>
            <ToggleListView onToggle={onToggle}/>
            <TagList />
            <CreateTagModal
                image={currentImage}
                show={show}
            />
            <View
                {...props}
                openTagModal={toggleModal}
            />
        </div>
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
    infiniteScroll(
        "images",
        undefined,
        25
    ),
    withReducer(
        "View",
        "onToggle",
        ( View, name ) => {

            switch ( name ) {

                case "text":
                    return TextListView;

                case "thumb":
                    return ThumbListView;

                default:
                    return View;

            }

        },
        () => TextListView
    ),
    withReducer(
        "modalState",
        "toggleModal",
        ( state, { image } ) => {

            console.log(image);
            return {
                image,
                show: true
            };

        },
        () => ({
            show: false
        })
    )
)(ListView);
