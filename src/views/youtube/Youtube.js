import React from 'react';
import { Page } from "components/Page";
import { Switch, Route, Link } from "react-router-dom";
import { Home } from "./Home";
import  { Search } from "./Search";



export function Youtube ({ match }) {

    return (
        <Page title={"Youtube"}>
            <Switch>
                <Route
                    path={match.url}
                    exact
                    component={Home}
                />
                <Route
                    path={match.url + "/search"}
                    exact
                    component={Search}
                />
            </Switch>
        </Page>
    )

}
