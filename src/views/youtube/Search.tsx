declare function require( a: string ): any;
import * as React from 'react';
import xs, { Stream } from 'xstream';
import { inputStyle } from "components/styles";
import { search } from "data/youtube";


const { awaitPromises } = require( "components/stream");
const { AddBox } = require("components/icons");
const { mapPropsStream, createEventHandler } = require("components/recompose");
console.log(mapPropsStream);
const noop = () => {};

export interface Noop {
    (a: any): any
}

export type EventHandler = ( e: React.SyntheticEvent<any> ) => void;

export interface FormProps extends React.Attributes {
    onSearch: EventHandler;
}
export function Form ( { onSearch = noop}: FormProps ) {

    return (
        <form className="flex justify-center"
            onSubmit={( e: any ) => {

                e.preventDefault();
                onSearch(e.target.elements.query.value);

            }}
        >
            <input 
                className={inputStyle}
                placeholder="your search here"
                name="query"
                type="text"
            />
            <input 
                className={inputStyle}
                type="submit"
                value="search"
            />
        </form>
    );

}

export interface ItemViewProps extends React.Attributes {
    item: any;
}
function ItemView ( { item }: ItemViewProps ) {

    return (
        <li className="pa2 flex justify-between items-center">
            <AddBox /> 
            <span>{ item.snippet.title }</span>
        </li>
    );

}

export interface ListProps extends React.Attributes {
    items: any[]
}
export function List ( { items = [] }: ListProps ) {
    return (
        <ul className="list">{
            items.map(item => <ItemView 
                item={item}
                key={item.id.videoId}/>)
        }</ul>
    );
}

export interface SearchViewProps extends FormProps, ListProps {
}
export function SearchView ({ onSearch = noop, items = [] }: SearchViewProps) {

    return (
        <section className="pt4">
            <Form onSearch={onSearch}/>
            <List items={items}/>
        </section>
    );

}

export interface SearchProps extends React.Attributes {
}
type Video = search.Video;
type Response = search.Response<Video>;
console.log("yolo");
const mapProps = ( prop$: Stream<SearchProps> ): Stream<SearchViewProps> => {

    console.log("yolo");
    const { handler: onSearch, stream: query$ } = createEventHandler();

    const item$: Stream<Video[]> = query$
        .map(search.video)
        .compose(awaitPromises())
        .map((response: Response) => response.items)
        .startWith([])
        .debug("items");
    
    // debug 
    setTimeout(() => query$.shamefullySendNext("yolo"), 100);
    
    return xs
        .combine(
            prop$,
            item$,
        )
        .map(([ props, items ]) => ({

            ...props,
            items,
            onSearch

        }));


};

export const Search = mapPropsStream(mapProps)(SearchView) as React.Component<{}, {}>;
