import {
    setPropTypes,
    mapPropsStream,
    getContext,
    compose
} from "components/recompose";
import xs from "xstream";
import debounce from "xstream/extra/debounce";
import dropRepeats from "xstream/extra/dropRepeats";
import PropTypes from "prop-types";


const anyProp = PropTypes.any.isRequired;
const context = getContext({
    scrollMonitor: PropTypes.object
});


export const infiniteScroll = ( propName, propType = anyProp, start = 10 ) => compose(
    mapPropsStream(props$ => {


        const innerHeight = window.innerHeight;
        const getSize = props => props[propName].size || 0;

        const scroll$ = xs.create({
            start( listener ) {

                this._listener = e => listener.next(e);

                window.addEventListener("scroll", this._listener, true);
            },
            stop () {

                window.removeEventListener("scroll", this._listener, true);

            }
        });

        const size$ = props$
            .map(getSize)
            .compose(dropRepeats())
            .map( maxSize => {

                return scroll$
                    .compose(debounce(70))
                    .map( () => window.scrollY )
                    .map( currentHeight => window.document.body.scrollHeight - innerHeight - currentHeight )
                    .fold(( size, spread ) => {

                        if ( spread < 100 && size < maxSize ) {

                            return size + 10;

                        } else {

                            return size;

                        }

                    }, start );


            } )
            .flatten()
            .compose(dropRepeats());

        return xs
            .combine(props$, size$)
            .map(([props, size]) => {

                return {
                    ...props,
                    size
                };

            })

    }),
    setPropTypes({
        [propName]: propType
    })
);
