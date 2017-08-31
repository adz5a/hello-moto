import { css } from "glamor";

export const joinClasses = (...classes) => classes.join(" ");

export const defaultBordered = "b ph3 pa2 ba b--black f6";
export const defaultBorderedBlock = "b ph3 pa2 ba b--black  f6 db";
export const defaultBorderedInlineBlock = "b ph3 pa2 ba b--black  f6 dib";
export const defaultBorderedFixed = "b ph3 pa2 ba b--black  f6 df";
export const defaultBorderedInlineTable= "b ph3 pa2 ba b--black  f6 dit";


export const smallDefaultBordered = "b ph3 pa2 ba b--black f7";
export const smallDefaultBorderedBlock = "b ph3 pa2 ba b--black   db f7";
export const smallDefaultBorderedInlineBlock = "b ph3 pa2 ba b--black   dib f7";
export const smallDefaultBorderedFixed = "b ph3 pa2 ba b--black   df f7";
export const smallDefaultBorderedInlineTable= "b ph3 pa2 ba b--black   dit f7";



export const linkStyle = joinClasses(
    defaultBordered,
    "link",
    "black"
);
export const linkHoverableStyle = joinClasses(
    linkStyle,
    "hover-bg-black",
    "hover-white",
);

export const inputStyle = joinClasses(
    defaultBordered,
    "input-reset",
    "pointer",
    "bg-white"
);

export const hoverableInputStyle = joinClasses(
    inputStyle,
    "hover-bg-black",
    "hover-white"
);

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
