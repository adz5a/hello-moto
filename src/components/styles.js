import { css } from "glamor";

export const joinClasses = (...classes) => classes.join(" ");

export const defaultBordered = "b ph3 pa2 ba b--black  f6 dit";
export const defaultBorderedBlock = "b ph3 pa2 ba b--black  f6 db";
export const defaultBorderedInlineBlock = "b ph3 pa2 ba b--black  f6 dib";
export const defaultBorderedFixed = "b ph3 pa2 ba b--black  f6 df";

export const linkStyle = joinClasses(defaultBordered, "dim", "link", "black");

export const inputStyle = joinClasses(defaultBordered, "input-reset", "pointer");

export const inversedInputStyle = joinClasses(
    "input-reset",
    "pointer",
    "b ph3 pa2 ba b--white",
    "bg-black",
    "white"
);
export const centerFlex ="flex flex-column items-center";

export const viewStyle = css({
    // minWidth: "45em",
    maxWidth: "80%",
    // border: "solid 1px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "2em"
});


export const pillStyle = "dim br-pill ph3 pv2 mb2 dib white bg-black";
export const smallPillStyle = joinClasses(
    pillStyle,
    "f6"
);
