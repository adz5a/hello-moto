import { css } from "glamor";

export const joinClasses = (...classes) => classes.join(" ");

export const defaultBordered = "b ph3 pa2 ba b--black bg-transparent f6 dit";
export const defaultBorderedBlock = "b ph3 pa2 ba b--black bg-transparent f6 db";
export const defaultBorderedInlineBlock = "b ph3 pa2 ba b--black bg-transparent f6 dib";

export const linkStyle = joinClasses(defaultBordered, "dim", "link", "black");

export const inputStyle = joinClasses(defaultBordered, "input-reset", "pointer");

export const centerFlex ="flex flex-column items-center";

export const viewStyle = css({
    // minWidth: "45em",
    maxWidth: "80%",
    // border: "solid 1px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "2em"
});
