import React from "react";
import { viewStyle } from "components/styles";
import { mapPropsStream, createEventHandler } from "components/recompose";
import { Repeat, } from "immutable";
import noop from "lodash/noop";
import dropRepeats from "xstream/extra/dropRepeats";
import xs from "xstream";
import PropTypes from "prop-types";
import { Point, Tile } from "./data";


export function Controls ({ 
    onMove = noop,
    onStop = noop,
    onStart = noop
}) {

    return (
        <aside>
            <input
                type="button"
                value="up"
                onClick={() => onMove("up")}
            />
            <input
                type="button"
                value="down"
                onClick={() => onMove("down")}
            />
            <input
                type="button"
                value="left"
                onClick={() => onMove("left")}
            />
            <input
                type="button"
                value="right"
                onClick={() => onMove("right")}
            />
            <input
                type="button"
                value="stop"
                onClick={() => onStop("stop")}
            />
            <input
                type="button"
                value="restart"
                onClick={() => onStart("start")}
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
    height = 300
}) {
    return (
        <section className={viewStyle}
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
                onMove={onMove}
                onStop={onStop}
                onStart={onStart}
            />
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

const constrain = ( tile, constraint ) => {
    const score = Point.normalizedDot( tile.get("position"), constraint );

    if ( -1 <= score && score <= 1 ) {
        return tile;
    } else {
        if ( score < -1 ) {
            return tile.get("position").update( ( pos ) => translate(pos, constraint) );
        } else {
            return tile.get("position").update( ( pos ) => translate(pos, Point.inv(constraint)) );
        }
    }
};


const reducer = ( state, action ) => {
    const { type } = action;
    switch ( type ) {
        case "changeDirection":
            return {
                ...state,
                direction: action.data
            };
        case "pause":
            return {
                ...state,
                isPause: !state.isPaused
            };
        case "move":
            if ( !state.isPaused ) {
                return {
                    ...state,
                    tiles: Tile.list.move(
                        state.direction,
                        state.tiles,
                        state.maxX,
                        state.maxY
                    )
                };
            } else return state;
        case "grow":
            if ( !state.isPaused ) {
                const last = state.tiles[state.tiles.length - 1];
                return {
                    ...state,
                    tiles: Tile.list.move(state.direction, state.tiles, state.maxX, state.maxY).concat(last)
                };
            } else return state;
        default:
            return state;
    }
};


export const enhance = mapPropsStream( props$ => {

    const tiles = Tile.list.make();


    const { stream: stop$, handler: onStop } = createEventHandler();
    const { stream: start$, handler: onStart } = createEventHandler();
    const { stream: move$, handler: onMove } = createEventHandler();



    const start = ( { width, height } ) => {




        const directions = {
            up: inv(Y),
            down: Y,
            left: inv(X),
            right: X
        };

        const action$ = xs
            .merge(
                stop$.mapTo({ type: "stop" }),
                move$.map( dir => ({
                    type: "changeDirection",
                    data: directions[dir] || X
                })),
                xs.periodic(500).mapTo({
                    type: "move"
                }),
                xs.periodic(4000).mapTo({
                    type: "grow"
                })
            );

        return action$
            .fold(reducer, {
                tiles,
                isPaused: false,
                direction: X,
                maxX: width,
                maxY: height
            });

        
    };


    return props$
        .map( props => {

            const { width, height } = props;
            const game$ = start({ width, height });

            return game$
                .map(game => ({
                    ...game,
                    ...props,
                    onStop,
                    onStart,
                    onMove
                }));
        } )
        .flatten();


    return xs.combine(
        start$
        .map(start)
        .startWith(start())
        .flatten(),
        props$
    )
        .map(([ game, props ]) => ({
            ...props,
            onStop,
            onStart,
            onMove
        }))
        .replaceError(e => {
            console.error( e);
        });
} );
export const Snake = enhance(SnakeView);;
