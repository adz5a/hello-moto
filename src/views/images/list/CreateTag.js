import React from "react";
import {
    defaultBordered,
    inversedInputStyle as inputStyle,
    joinClasses as join
} from "components/styles";
import {
    compose,
    withReducer
} from "components/recompose";
import { css } from "glamor";
import {
    Close,
    AddBox
} from "components/icons";
import {
    Map
} from "immutable";
import {
    connect
} from "react-redux";
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
                <form>
                    <p>
                        <label
                            className="flex"
                        >
                            <span className={textLabel}>Create New</span>
                            <input
                                className={inputStyle}
                                type="text"
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
                            >
                                {
                                    tags
                                        .toSeq()
                                        .map(( _, name ) => (
                                            <option
                                                key={name}
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
    withReducer(
        "show",
        "onClose",
        ( show, _ ) => !show,
        () => true
    )
)(CreateTagView);


const expandStyle = join(
    css({
        fontSize: "1.5em"
    }),
    "pointer",
);

export function AddTagView ({ image }) {

    return (
        <AddBox 
            className={join(expandStyle, "dim")}
        />
    );

}


export const AddTag = AddTagView;
