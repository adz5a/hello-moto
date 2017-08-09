import React from "react";
import { connect } from "react-redux";
import { Map } from "immutable";


export function TagListView ({ tags = Map() }) {

    return (
        <section>
            <ul>
                {
                    tags
                        .map((ids, name) => {


                        return (
                            <li
                                key={name}
                            >
                                {name + " - " + ids.size}
                            </li>
                        );


                    })
                        .toArray()
                }
            </ul>
            </section>
    );

}


export const TagList = connect(
    state => ({
        tags: state.tags.byName
    })
)(TagListView);
