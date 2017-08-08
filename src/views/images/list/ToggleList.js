import React from "react";
import {
    centerFlex,
    defaultBordered,
    joinClasses as join
} from "components/styles";
import { css } from "glamor";


const labelStyle = join(
    defaultBordered,
);


const inputStyle = join(
    "input-reset",
    css({
        ":checked + label": {
            backgroundColor: "black",
            color: "white"
        }
    })
);

export function ToggleListView ({ onToggle = console.log, current = "text"}) {

    return (
        <section className={centerFlex}>
            <form>
                <input 
                    className={inputStyle}
                    type="radio"
                    value="thumb"
                    name="form"
                    id="thumb_form"
                    defaultChecked={current === "thumb"}
                />
                <label 
                    onClick={() => onToggle("thumb")}
                    htmlFor="thumb_form" className={labelStyle}>
                    Thumb
                </label>
                <input 
                    className={inputStyle}
                    type="radio"
                    value="text"
                    name="form"
                    id="text_form"
                    defaultChecked={current === "text"}
                />
                <label 
                    onClick={() => onToggle("text")}
                    htmlFor="text_form" className={labelStyle}>
                    Text
                </label>   
            </form>
        </section>
    );

}
