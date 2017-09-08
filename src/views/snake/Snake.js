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
    onMove = noop
}) {
    return (
        <section className={viewStyle}
        >
            <h1>Awesome snake game</h1>
            <GameBoardView 
                width={300}
                height={300}
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


// console.log(Tile);
const { topLeft, translate } = Tile;
const { X, Y } = Point;

const s = Repeat(X, 5)
    .toSeq()
    .map((X, f) => {
        return Point.scale(f, X)
    })
    .map(X => translate(X, topLeft))
    .toArray();


const tiles = s;
// console.log("tiles", s);

// console.log("tiles", tiles);
export const enhance = mapPropsStream( props => {

    const { stream: stop$, handler: onStop } = createEventHandler();
    const { stream: start$, handler: onStart } = createEventHandler();
    const { stream: move$, handler: onMove } = createEventHandler();

    const update$ = move$
        .map(move => {
        switch ( move ) {
            case "up":
                return Point.opp(Y);
            case "down":
                return Y;
            case "left":
                return Point.opp(X);
            case "right":
            default:
                return X
        }
    })
        .startWith(X)
        .debug("up")
        .map( direction => tiles => Tile.list.move(direction, tiles) );




    const start = () => {


        const tick$ = xs.periodic(500).endWhen(stop$);

        return xs.combine(
            tick$,
            update$
        )
            .compose(dropRepeats((first, second) => first[0] === second[0]))
            .debug()
            .fold((tiles, [_, update]) => update(tiles), tiles);

    };

    return xs.combine(
        start$
        .debug()
        .map(start)
        .startWith(start())
        .flatten(),
        props
    )
        .map(([ tiles, props ]) => ({
            ...props,
            tiles,
            onStop,
            onStart,
            onMove
        }))
        .replaceError(e => {
            console.error( e);
        });
} );
export const Snake = enhance(SnakeView);;
