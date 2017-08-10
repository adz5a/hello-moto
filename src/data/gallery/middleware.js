import { createStreamMiddleware } from "data/streamMiddleware";
import { withType } from "data/commons";
import {
    ADD_TAG
} from "./actions";


export const creator = action$ => {

    return action$
        .filter(withType(ADD_TAG))
        .mapTo({
            type: "noop"
        });


};


export const middleware = createStreamMiddleware(creator, "gallery");
