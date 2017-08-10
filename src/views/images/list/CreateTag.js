import React from "react";
import {
    defaultBordered,
    inversedInputStyle as inputStyle,
    joinClasses as join
} from "components/styles";
import {
    compose,
    withReducer,
    mapPropsStream,
    createEventHandler
} from "components/recompose";
import { css } from "glamor";
import {
    Close,
    AddBox
} from "components/icons";
import {
    parseForm
} from "components/Form";
import {
    Map
} from "immutable";
import {
    connect
} from "react-redux";
import PropTypes from "prop-types";
import noop from "lodash/noop";


const modalStyle = join(
    defaultBordered,
    "fixed",
    "w-60",
    "bg-near-black",
    "white",
    css({
        zIndex: 1,
        marginLeft: "50%",
        transition: "0.5s"
    })
);

const closedStyle = css({
    left: "60%",
    opacity: 0
});
const openStyle = css({
    left: "-30%",
    opacity: 1
});
const textLabel = css({
    width: "20em"
});

const close = css({
    float: "right",
    cursor: "pointer",
});


export function CreateTagView ({ 
    show = true,
    image = Map(),
    tags = Map(),
    onClose = noop
}) {

    console.log(image);

    const name = image.getIn(["data", "url"], "").split("/").pop();
    return (
        <section >
            <section
                className={join(
                    modalStyle,
                    show ?
                    openStyle:
                    closedStyle
                )}
            >
                <Close 
                    onClick={onClose}
                    className={close}
                />

                <h1>Add new tag</h1>
                <h3>{name.slice(0, 20)}</h3>
                <form
                    onSubmit={e => {

                        e.preventDefault();
                        const data = parseForm([ "newTag", "oldTag" ], e.target);
                        console.log(data);

                    }}
                >
                    <p>
                        <label
                            className="flex"
                        >
                            <span className={textLabel}>Create New</span>
                            <input
                                className={inputStyle}
                                type="text"
                                name="newTag"
                            />
                        </label>
                    </p>
                    <p>
                        <label
                            className="flex"
                        >
                            <span className={textLabel}>Select one</span>
                            <select
                                className={inputStyle}
                                name="oldTag"
                            >
                                <option value={"none"}>Select</option>
                                {
                                    tags
                                        .toSeq()
                                        .map(( _, name ) => (
                                            <option
                                                key={name}
                                                value={name}
                                            >
                                                {name}
                                            </option>
                                        ))
                                        .toArray()
                                }
                            </select>
                        </label>
                    </p>
                    <input 
                        className={inputStyle}
                        type="submit"
                    />
                </form>
            </section>
        </section>
    );

}



export const CreateTagModal = compose(
    connect(
        state => ({
            tags: state.tags.byName
        })
    ),
    mapPropsStream( props$ => {

        const { handler: onClose, stream: close$ } = createEventHandler();

        return props$
            .map( props  => {

                const  { show = false } = props;

                return close$
                    .fold( show => !show, show )
                    .debug("show")
                    .map( show => {

                        return {
                            ...props,
                            show,
                            onClose
                        };

                    } );

            })
            .flatten();


    } )
)(CreateTagView);


const expandStyle = join(
    css({
        fontSize: "1.5em"
    }),
    "pointer",
);

export function AddTagView ({ image, openTagModal = noop }) {

    // console.log(openTagModal);
    return (
        <AddBox 
            className={join(expandStyle, "dim")}
            onClick={() => openTagModal({ image })}
        />
    );

}

AddTagView.propTypes = {
    openTagModal: PropTypes.func
};

export const AddTag = AddTagView;
