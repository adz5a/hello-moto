import React from "react";
import { connect } from "react-redux";
import { Map, Repeat } from "immutable";
import { smallPillStyle } from "components/styles";
import times from "lodash/times";



const Span = ({ name, size }) => {

    return (
        <span className={smallPillStyle}>{

            [ name, size ].join(" - ")

        }</span>
    );

};


export function TagListView ({ tags = Map() }) {


    const slicesN = ((tags.size / 4) | 0) + 1;

    const lists = times(slicesN, [])
        .map(( list, n ) => tags
            .slice(4 * n, 4 * ( n + 1 ))
            .map((ids, name) => {

                return (
                    <li
                        key={name}
                    >
                        <Span name={name} size={ids.size}/>
                    </li>
                );

            })
            .toArray()
        )
        .map( (list, index) => <ul key={index} className="dib">{list}</ul> )



    return (
        <section className="flex">
            {lists}
        </section>
    );

}


export const TagList = connect(
    state => ({
        tags: state.tags.byName
    })
)(TagListView);
