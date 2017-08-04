"use strict";

const xs = require("xstream").default;
const fromDiagram = require("xstream/extra/fromDiagram").default;
const delay = require("xstream/extra/delay").default;


const get = () => {

    console.log("called");
    return Promise.resolve("lol");

};

const process = () => {

    const getNext = prev => xs.fromPromise(get())
        .fold((prev, next) => next + prev, prev)
        .drop(1);

    const input$ = fromDiagram("----a----b----c----d|");

    const props$ = xs.of(1)
        .compose(delay(1000));

    const firstLoad$ = props$
        .map(() => get())
        .map(xs.fromPromise)
        .flatten()
        .debug("first load");

    const next$ = firstLoad$
        .map(val => {


            return input$
                .debug("input$ ")
                .fold((prev, _) => {

                    return prev
                        .then( v => get()
                            .then( val => v + val ));

                }, Promise.resolve(val))
                .drop(1)
                .map(xs.fromPromise)
                .flatten();


        })
        .flatten()
        .debug("next");


        
    return xs.merge(firstLoad$, next$);
};


process().subscribe({
    next ( value ) {

        console.log("received there : ", value);

    },
    complete () {},
    error ( error ) {

        console.error(error);

    }
});


