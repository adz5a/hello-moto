import React from "react";
import{
    branch,
    compose,
    renderComponent,
    withReducer
} from "components/recompose";
import { connect } from "react-redux";
import {
    Seq
} from "immutable";
import {
    ThumbListView
} from "./ImageThumb";
import { 
    TagList
} from "./TagList";
import { infiniteScroll } from "components/infiniteScroll";
import { TextListView } from "./ImageText";
import { ToggleListView } from "./ToggleList";
import { CreateTagModal } from "./CreateTag";
// import noop from "lodash/noop";
import {
    OPEN_TAG_MODAL
} from "data/gallery";


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
    ...props
}) {


    return (
        <div>
            <ToggleListView onToggle={onToggle}/>
            <TagList />
            <CreateTagModal />
            <View
                {...props}
            />
        </div>
    );

}

export const ImageList = compose(
    connect(
        state => ({
            images: state.db.byType.get("image", EmptySeq).toSeq()
        }),
        {
            openTagModal ( doc ) {

                return {
                    type: OPEN_TAG_MODAL,
                    data: { doc }
                };

            }
        }
    ),
    branch(
        props => props.images.size === 0,
        renderComponent(EmptyListView)
    ),
    // injects a "size" props
    // which is refreshed with
    // the scroll
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
    )
)(ListView);
