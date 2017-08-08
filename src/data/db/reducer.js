import {
    // FETCH_DOC_BY_ID,
    // FIND_DOC,
    INSERT_DOC,
    INSERTED_DOC,
    FOUND_DOC,
    // DELETE_DOC,
    DELETED_DOC,
    DOC_UPDATED
} from "./actions";
import {
    // PROCESSING
} from "data/middlewareFactory";
import {
    combineReducers
} from "redux";
import {
    Map,
    Set,
    List
} from "immutable";
import { unwrapMap } from "components/immutable";

const emptyMap = Map();
const emptySet = Set();
export const defaultState = () => emptyMap;




const defaultTasks = emptyMap;


function tasks ( tasks = defaultTasks, action ) {


    const {
        type,
        data
    } = action;


    switch ( type ) {

        case INSERT_DOC:

            return tasks.update(
                INSERT_DOC,
                emptySet,
                set => set.add(data)
            );


        case INSERTED_DOC:
            return tasks.update(
                INSERT_DOC,
                emptySet,
                set => set.remove(data)
            );

        default:
            return tasks;

    }

}


function byType ( state = Map(), action ) {



    const { type, data } = action;


    switch ( type ) {

        case INSERTED_DOC:{

            const doc = data;
            const docType = doc.get("type");
            const docId = doc.get("_id");

            return state.update(docType, Map(), type => type.set(docId, doc));

        }


        case FOUND_DOC:{

            const { response = List() } = data;

            return response.reduce(
                ( state, doc ) => {

                    const docType = doc.get("type");
                    const docId = doc.get("_id");

                    return state.update(docType, Map(), type => type.set(docId, doc));

                },
                state
            );

        }


        case DOC_UPDATED:{

            const { doc, response, error = false } = data;

            const docType = doc.get("type");

            if ( !error && response.ok ) {

                // erase previous doc
                // set new one with new rev
                return state.setIn(
                    [ docType, doc.get("_id") ],
                    doc.set("_rev", response.rev)
                );

            } else {

                return state;

            }


        }

        default:
            return state;

    }

}

function store ( store = emptyMap, action ) {


    const { type, data } = action;


    switch ( type ) {

        case INSERTED_DOC:{

            const doc = data;
            return store.set(doc.get("_id"), doc);

        }


        case FOUND_DOC:{

            const { response = List() } = data;

            return response.reduce(
                ( store, doc ) => store.set(doc.get("_id"), doc),
                store
            );

        }


        case DELETED_DOC:{

            const _data = unwrapMap(data);
            const { _id } = _data;

            return store.delete(_id);

        }


        case DOC_UPDATED:{

            const { doc, response, error = false } = data;

            if ( !error && response.ok ) {

                // erase previous doc
                // set new one with new rev
                return store.set(
                    doc.get("_id"),
                    doc.set("_rev", response.rev)
                );

            } else {

                return store;

            }


        }

        default:
            return store;

    }

}


export const reducer = combineReducers({
    tasks,
    store,
    byType
});
