import {
    joinClasses
} from "./styles";

export { joinClasses }




export function parseForm ( names = [], form ) {

    return names.reduce(( res, name ) => {

        res[name] = form.elements[name].value;
        return res;

    }, {});

}

export function preventDefault ( e ) {

    e.preventDefault();

}
