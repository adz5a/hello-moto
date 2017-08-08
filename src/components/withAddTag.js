import { connect } from "react-redux";
import {
    compose,
    withProps
} from "components/recompose";
import {
    TAG_DOC,
    TOGGLE_DOC_TAG
} from "data/tag";


export const withAddTag = docPropName => compose(
    connect(),
    withProps(props => {

        const doc = props[docPropName];
        const dispatch = props.dispatch
        return {
            onAddTag( tag ) {

                return dispatch({
                    type: TAG_DOC,
                    data: {
                        tag,
                        doc
                    }
                });

            }
        }

    })
);


export const withToggleTag = docPropName => compose(
    connect(),
    withProps(props => {

        const doc = props[docPropName];
        const dispatch = props.dispatch
        return {
            onAddTag( tag ) {

                return dispatch({
                    type: TOGGLE_DOC_TAG,
                    data: {
                        tag,
                        doc
                    }
                });

            }
        }

    })
);
