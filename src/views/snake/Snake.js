import React from "react";
import { viewStyle } from "components/styles";
import { mapPropsStream, createEventHandler } from "components/recompose";
import { Repeat, } from "immutable";
import noop from "lodash/noop";
import dropRepeats from "xstream/extra/dropRepeats";
import xs from "xstream";
import PropTypes from "prop-types";
import { Point, Tile, reducer, start } from "./data";


export function Controls ({ 
    onStop = noop,
    onStart = noop,
}) {

    return (
        <aside>
            <input
                type="button"
                value="stop"
                onClick={() => onStop()}
            />
            <input
                type="button"
                value="start"
                onClick={() => onStart()}
            />
        </aside>
    );

}
Controls.propTypes = {
    onMove: PropTypes.func
};


export function SnakeView ({ 
    tiles = [],
    onStop = noop,
    onStart = noop,
    onMove = noop,
    width = 300,
    height = 300,
    isLost = false
}) {
    return (
        <section 
            className={viewStyle}
            onKeyPress={e => {
                console.log(e.key);
            }}
            onFocus={e => console.log("focus")}
            onBlur={e => console.log("blur")}
        >
            <h1>Awesome snake game</h1>
            <GameBoardView 
                width={width}
                height={height}
            >
                {tiles.map(( tile, index ) => <SnakeTile 
                   key={index}
                   tile={tile}
                />)}
            </GameBoardView>
            <Controls 
                onStop={onStop}
                onStart={onStart}
            />
            {
                isLost ?
                    <h3>You lost</h3>:
                    null
            }
        </section>
    );
}


export function SnakeTile ({ tile }) {
    return (
        <rect
            width={tile.get("dim")}
            height={tile.get("dim")}
            x={tile.get("position").get("x")}
            y={tile.get("position").get("y")}
        />
    );

}
SnakeTile.propTypes = {
    tile: PropTypes.any.isRequired
};

export function GameBoardView ({ children, width, height }) {

    return (
        <svg
            className={"ba"}
            viewBox={`0 0 ${width} ${height}`}
            width={width}
            height={height}
        >
            {children}
        </svg>
    );

}
GameBoardView.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
};


const { topLeft, translate } = Tile;
const { X, Y, inv } = Point;





export const enhance = mapPropsStream( props$ => {



    const { stream: stop$, handler: onStop } = createEventHandler();
    const { stream: start$, handler: onStart } = createEventHandler();
    const { stream: move$, handler: onMove } = createEventHandler();


    return props$
        .map( props => {

            const { width, height } = props;
            const game$ = start({ width, height, start$, stop$, move$ });

            return game$
                .map(game => ({
                    ...game,
                    ...props,
                    onStop,
                    onStart,
                    onMove
                }));
        } )
        .flatten()
        .replaceError(e => {

            console.error(e);
            throw e;

        });


} );

export const Snake = enhance(SnakeView);;
