import flow from "lodash/flow";
import defaults from "lodash/fp/defaults";
import pick from "lodash/fp/pick";


export const factory = defaults({
    name: null,
    description: null,
    id: null
});


export const makeIdFromString = string => btoa(encodeURIComponent(string || null));
export const makeId = tag => {

    const t = typeof tag;

    if ( t === "object" && tag !== null ) {

        if ( tag.id ) {

            return tag.id;

        } else {

            return makeIdFromString(tag.name);

        }

    } else {

        return makeIdFromString(String(tag));

    }

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
