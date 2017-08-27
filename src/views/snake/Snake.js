import React from "react";
import { viewStyle } from "components/styles";
import noop from "lodash/noop";
import PropTypes from "prop-types";


export function Controls ({ onMove = noop }) {

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
        </aside>
    );

}
Controls.propTypes = {
    onMove: PropTypes.func
};


export function SnakeView () {
    return (
        <section
            className={viewStyle}
        >
            <h1>Awesome snake game</h1>
            <GameBoardView 
                width={300}
                height={300}
            >
                <SnakeTile
                    size={40}
                    x={10}
                    y={30}
                />
            </GameBoardView>
            <Controls 
                onMove={console.log}
            />
        </section>
    );
}


export function SnakeTile ({ size , x, y }) {

    return (
        <rect
            width={size}
            height={size}
            x={x}
            y={y}
        />
    );

}
SnakeTile.propTypes = {
    size: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
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

export const Snake = SnakeView;
