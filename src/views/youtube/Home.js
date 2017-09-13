import React from 'react';
import { Link } from "react-router-dom";

export function Home ({ match }) {

    return (
        <section>
            <Link to={match.url + "/search"}>Search</Link>
        </section>
    );

}
