import React from "react";
import {
    inputStyle,
    joinClasses as join,
    defaultBordered
} from "components/styles";
import { css } from "glamor";


export const route = match => match.url + "/add";


const input = join(inputStyle, "hover-bg-black", "hover-white");



const dragZoneSize = css({
    width: "100%",
    height: "10em",
});


const dragZone = join(defaultBordered, dragZoneSize, "flex", "justify-center", "items-center");

export function Add () {

    return (
        <section>
            <h1>Add Images</h1>
            <form>
                <section className={dragZone}>
                    <span className="dib">Drag here</span>
                </section>
                <input
                    className={input}
                    type="submit"

                />
            </form>
        </section>
    );

}

