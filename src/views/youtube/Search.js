import React from 'react';
import { inputStyle } from "components/styles";
import noop from "lodash/noop";
import { search } from "data/youtube";


export function Form ( { onSearch = noop } ) {

    return (
        <form className="flex justify-center"
            onSubmit={e => {

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


export const List = ({ items = [] }) => (
    <ul>{
        items.map(item => <li>{item.snippet.title}</li>)
    }</ul>
);


export function Search ({ onSearch = noop, items = [] }) {

    return (
        <section className="pt4">
            <Form onSearch={onSearch}/>
            <List items={items}/>
        </section>
    );

}
