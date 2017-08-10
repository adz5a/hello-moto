import { connect } from "react-redux";
// import {
//     compose,
//     withProps
// } from "components/recompose";
import {
    TAG_DOC,
    TOGGLE_DOC_TAG
} from "data/tag";


export const withAddTag = ( docPropName, newPropName = "onAddTag" ) => connect(
    null,
    dispatch => ({ dispatch }),
    (_, { dispatch }, ownProps ) => {

        const doc = ownProps[docPropName];

        return {
            ...ownProps,
            [newPropName]: ( tag ) => {

                return dispatch({
                    type: TAG_DOC,
                    data: {
                        tag,
                        doc
                    }
                });

            }

        };



    });


export const withToggleTag = ( docPropName, newPropName = "onAddTag" ) => connect(
    null,
    dispatch => ({ dispatch }),
    (_, { dispatch }, ownProps ) => {

        const doc = ownProps[docPropName];


        return {
            ...ownProps,
            [newPropName]: ( tag ) => {

                return dispatch({
                    type: TOGGLE_DOC_TAG,
                    data: {
                        tag,
                        doc
                    }
                });

            }

        };



    });
