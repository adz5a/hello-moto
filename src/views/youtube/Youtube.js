import React from 'react';
import { Page } from "components/Page";
import { inputStyle } from "components/styles";
import noop from "lodash/noop";
import { search } from "data/youtube";


export const Form = ( { onSearch = noop } ) => (
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

export const List = ({ items = [] }) => (
    <ul>{
        items.map(item => <li>{item.snippet.title}</li>)
    }</ul>
);

export function YoutubeView ({ onSearch = noop, items = [] }) {

    return (
        <Page title="Youtube">
            <section className="pt4">
                <Form onSearch={onSearch}/>
                <List items={items}/>
            </section>
        </Page>
    );

}

export class Youtube extends React.Component {

    state = {
        searching: false,
        results: [],
        query: null
    };


    render () {

        return <YoutubeView
            onSearch={q => search.video(q)
                    .then(res => {

                        console.log(res);
                        this.setState({
                            results: res.items
                        });

                    }, console.log)}
                    items={this.state.results}
        />
    }


}
