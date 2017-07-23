import flow from "lodash/flow";



export const makeId = tag => {

    return btoa(encodeURIComponent(tag.name || null));

};
