import { setObservableConfig } from "recompose";
import config from "recompose/xstreamObservableConfig";
import {
    lifecycle
} from "recompose";

setObservableConfig(config);

export * from "recompose";




/**
 * @param predicate {Function} - props -> boolean
 * @param action {Function} - props -> void
 * @return HOC
 *
 * Will play predicate at each update of the component and after 
 * it first mounted. Once it returns true it will play the action.
 * Both callbacks receives the current set of props as argument
 *
 */
export const once = ( predicate, action ) => {

    let wasPlayed = false;

    const hook = function hook () {


            if ( !wasPlayed ) {

                wasPlayed = !!predicate(this.props);

                // side effect
                if ( wasPlayed ) action(this.props);

            }


    };

    return lifecycle({


        componentDidMount: hook,
        componentDidUpdate: hook

    })






};
