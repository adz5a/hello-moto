import React from "react";
import { connect } from "react-redux";
import {
    compose,
    mapProps,
} from "components/recompose";
import filter from "lodash/fp/filter";
import map from "lodash/map";
import {
    isImage,
    isVideo,
    isMusic
} from "data/link";


export function HomeView ( { 
    image = 0,
    music = 0,
    video = 0,
    total = 0
} ) {

    return (
        <ul>
            <li>{`image : ${image}`}</li>
            <li>{`music : ${music}`}</li>
            <li>{`video : ${video}`}</li>
            <li>{`total : ${total}`}</li>
        </ul>
    );

}


const images = filter(isImage);
const videos = filter(isVideo);
const music = filter(isMusic);

const enhanceHomeView = compose(
    connect( state => ({ links: state.links })),
    mapProps( props => {


        const links = map(props.links);
        const contentTypes = new Set(map(props.links, link => link.contentType));
        console.log(contentTypes);

        console.log(music(links));
        return {
            image: images(links).length,
            video: videos(links).length,
            music: music(links).length,
            total: links.length,
            contentTypes,
        };

    })
);


export const Home = enhanceHomeView(HomeView);
