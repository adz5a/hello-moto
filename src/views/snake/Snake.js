import React from "react";
import { viewStyle } from "components/styles";
import { mapPropsStream, createEventHandler } from "components/recompose";
import noop from "lodash/noop";
import PropTypes from "prop-types";
import { start } from "./data";


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
	isLost = false,
	isPaused = false
}) {
	return (
		<section 
			className={viewStyle}
			onKeyDown={e => {
				console.log(e.key);
				switch ( e.key ) {
					case "ArrowDown":
						return onMove("down");
					case "ArrowUp":
						return onMove("up");
					case "ArrowLeft":
						return onMove("left");
					case "ArrowRight":
						return onMove("rigth");
				}
			}}
			onBlur={onStop}
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
			{
				isPaused ?
					<h3>Paused</h3>:
					<h3>Running</h3>
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
			// no error handling atm, should be the same kind 
			// of behaviour as the isLost prop.
			throw e;

		});


} );

export const Snake = enhance(SnakeView);;
