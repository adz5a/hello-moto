import {
    setPropTypes,
    mapPropsStream,
    getContext,
    compose
} from "components/recompose";
import debounce from "xstream/extra/debounce";
import PropTypes from "prop-types";


const anyProp = PropTypes.any.isRequired;
const context = getContext({
    scrollMonitor: PropTypes.object
});


export const infiniteScroll = ( propName, propType = anyProp, start = 10 ) => compose(
    context,
    mapPropsStream(props$ => props$
        .map(props => {


            const innerHeight = window.innerHeight;

            const data = props[propName];

            const {
                scrollMonitor: scroll$,
            } = props;


            return scroll$
                .compose(debounce(70))
                .map( () => window.scrollY )
                .map( currentHeight => window.document.body.scrollHeight - innerHeight - currentHeight )
                .fold(( size, spread ) => {

                    if ( spread < 100 && size < data.size ) {

                        return size + 10;

                    } else {

                        return size;

                    }

                }, start)
                .map(size => {

                    return {
                        ...props,
                        size
                    };

                });

        })
        .flatten()
    ),
    setPropTypes({
        [propName]: propType
    })
);
