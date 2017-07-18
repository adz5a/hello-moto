import { MiddlewareFactory } from "./middlewareFactory";
import isFunction from "lodash/isFunction";
import noop from "lodash/noop";
import {
    createStore,
    applyMiddleware
} from "redux";
import {
    ACTIONFACTORY
} from "data/commons";


const effect = x => x;
const actionType = "actionType";

const is = (expect, pred) => testee => expect(isFunction(testee)).toBe(true);

test("middleware factory", () => {

    const middleware = MiddlewareFactory({
        [actionType]: effect
    });
    const isFunc = is(expect, isFunction);

    // a middleware is a function
    isFunc(middleware);

    // a middleware returns :: ( next => ( action => action ) )
    isFunc(middleware());

    // should be a :: action => action 
    isFunc(middleware()());

});

describe("expect at least one argument", () => {

    test("must be a non null object", () => {

        // thrower
        [
            null,
            0,
            NaN,
            undefined,
            true,
            false
        ]
            .forEach(value => {

                expect( () => MiddlewareFactory(value) ).toThrowErrorMatchingSnapshot();

            });


        // does not throw
        [
            {}
        ]
            .forEach(value => {

                expect( () => MiddlewareFactory(value)).not.toThrow();

            });


    });

    test("each keys must be function", () => {


        // thrower
        [
            null,
            0,
            NaN,
            undefined,
            true,
            false
        ]
            .forEach(value => {

                expect( () => MiddlewareFactory({ key: value }) ).toThrowErrorMatchingSnapshot();

            });


        // does not throw
        [
            function () {},
            () => {}
        ]
            .forEach(value => {

                expect( () => MiddlewareFactory({ key: value }) ).not.toThrow();

            });

    });

});

describe("effects", () => {


    const prep = ( { effect = noop } = {} ) => {

        const reducer = ( state = {} ) => state;
        const scope = ACTIONFACTORY("test");
        const action = scope("action");
        const _effect = jest.fn(effect);
        const store = createStore(
            reducer, 
            applyMiddleware(MiddlewareFactory({ [action]: _effect }))
        );
        return {
            action,
            effect: _effect,
            reducer,
            store
        };


    };

    test("called once when action matches", () => {

        const { store, action, effect } = prep();

        store.dispatch({
            type: action
        });

        expect(effect).toHaveBeenCalledTimes(1);

        // return store.promise.then();
    });

    test("does not throw synchronously", () => {


        const { store, action, effect } = prep({ effect: () => {

            throw new Error("BOOM");

        } });

        expect(() => store.dispatch({
            type: action
        })).not.toThrow();

        expect(effect).toHaveBeenCalledTimes(1);
    });
    
});

