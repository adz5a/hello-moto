import {
    fromMiddleware,
    isSafe
} from "data/commons";


test("isSage + fromMiddleware", () => {

    const action = {
        type: "",
        data: {},
        meta: fromMiddleware()
    };

    expect(isSafe(action)).toBe(false);

});
