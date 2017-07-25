import {
    FETCH_DOC_BY_ID,
    FIND_DOC,
    INSERT_DOC
} from "./actions";
import {
    PROCESSING
} from "data/middlewareFactory";
import {
    combineReducers
} from "redux";
import { Map, Set } from "immutable";


const emptyMap = Map();
const emptySet = Set();
export const defaultState = () => emptyMap;




const defaultTasks = emptyMap;
const operations = Set([
    FETCH_DOC_BY_ID,
    FIND_DOC,
    INSERT_DOC
]);

const addTask = ( tasks, action ) => {

    const { type, data } = action;

    if ( operations.has(type) ) {

        return tasks.update(type, emptySet, taskSet => taskSet.add(data));

    } else {

        return tasks;

    }

};

const removeTask = ( tasks, action ) => {

    const { type, data } = action;

    if ( operations.has(type) ) {

        return tasks.update(type, emptySet, taskSet => taskSet.delete(data));

    } else {

        return tasks;

    }

};

function tasks ( tasks = defaultTasks, action ) {


    const { type, data } = action;


    switch ( type ) {

        case PROCESSING:
            return addTask(tasks, action);

        default:
            return removeTask(tasks, action);


    }

}


function store ( store = emptyMap, action ) {

    const { type, data } = action;


    switch ( type ) {

        case INSERT_DOC:
            return store.set(data.get("_id"), data);

        default:
            return store;

    }

}

export const reducer = combineReducers({
    tasks,
    store
});
