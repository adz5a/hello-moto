import flow from "lodash/flow";
import defaults from "lodash/fp/defaults";
import pick from "lodash/fp/pick";


export const factory = defaults({
    name: null,
    description: null,
    id: null
});


export const makeId = tag => {

    return btoa(encodeURIComponent(tag.name || null));

};


const onlyKeys = pick(["name", "id", "description"]);
export const fromObject = tag => {

    const _tag = factory(tag);

    const id = makeId(tag);

    return onlyKeys({
        ..._tag,
        id
    });

}
