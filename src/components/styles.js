export const joinClasses = (...classes) => classes.join(" ");

export const defaultBordered = "b ph3 pa2 ba b--black bg-transparent f6";

export const linkStyle = joinClasses(defaultBordered, "dim", "link", "black");

export const inputStyle = joinClasses(defaultBordered, "input-reset", "pointer", "grow");

export const centerFlex ="flex flex-column items-center";
