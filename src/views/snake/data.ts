import xs, { Stream } from "xstream";
import { Record, Set } from "immutable";


const sqrt = Math.sqrt;
const div = ( n1: number, n2: number ) => n1 / n2;
const mul = ( n1: number, n2: number ) => n1 * n2;
const square = ( x: number ): number => x * x;

const first = <T> ( arr: T[] ): T | null => {
    return arr.length > 0 ?
        arr[0] :
        null;
};

const last = <T> ( arr: T[] ): T | null => {
    return arr.length > 0 ?
        arr[arr.length - 1] :
        null;
};

export interface Test <T> {
    (a: T): boolean;
}

const takeUntil = <T>( test: Test<T>, arr: T[] ): T[] => {
    const res: T[] = [];
    const l = arr.length;
    let i: number = 0;
    do {
        if ( test(arr[i]) ) {
            res.push(arr[i]);
        } else {
            return res;
        }
    } while( ++i < l );
    return res;
};

export namespace Point {

    export const of = Record({ x: 0, y: 0 }, "Point");

    export const X = of({ x: 10, y: 0 });
    export const Y = of({ x: 0, y: 10 });

    export type Point = typeof X;

    export const translate = ( t: Point, p: Point ) => of({
        x: p.get("x") + t.get("x"),
        y: p.get("y") + t.get("y"),
    });

    export const move = ( t: Point, p: Point, maxX: number, maxY: number ) => {
        let newPoint: Point = of({
            x: p.get("x") + t.get("x"),
            y: p.get("y") + t.get("y"),
        });
        if ( newPoint.get("x") >= maxX ) {
            newPoint = newPoint.set("x", 0);
        }
        if ( newPoint.get("x") < 0 ) {
            newPoint = newPoint.set("x", maxX);
        }
        if ( newPoint.get("y") >= maxY ) {
            newPoint = newPoint.set("y", 0);
        }
        if ( newPoint.get("y") < 0 ) {
            newPoint = newPoint.set("y", maxY);
        }
        return newPoint;
    };

    export const scale = ( factor: number, p: Point ) => of({
        x: factor * p.get("x"),
        y: factor * p.get("y")
    });

    export const opp = ( X: Point ) => scale(-1, X);
    export const inv = opp;

    export const norm = ( p: Point ): number => sqrt.apply(null, [p.get("x"), p.get("y")].map(square));

    export const dot = ( p1: Point, p2: Point ) => {
        return p2.get("x") * p2.get("x") + p1.get("y") * p2.get("y");
    };

    export const normalizedDot = ( p1: Point, p2: Point ): number => {
        return div(dot(p1, p2), mul(norm(p1), norm(p2)));
    };

}


export namespace Tile {

    export const of = Record({
        dim: 10,
        position: Point.of()
    }, "Tile");

    export const topLeft = of();

    export type Tile = typeof topLeft

    export const translate = ( v: Point.Point, tile: Tile ) => of({
        dim: tile.get("dim"),
        position: Point.translate(tile.get("position"), v)
    });

    export const move = (
            v: Point.Point,
            tile: Tile,
            maxX: number = 100,
            maxY: number = 100
    ): Tile => tile.update("position", pos => Point.move(v, pos, maxX, maxY));

    export namespace list {

        export const move = (
            v: Point.Point,
            tiles: Tile[],
            maxX: number = 50,
            maxY: number= 50
        ): Tile[] => {
            if ( tiles.length === 0 ) {
                return [];
            } else if ( tiles.length === 1 ) {
                return  tiles.map(tile => Tile.move(v, tile, maxX, maxY));
            } else {
                return  [ Tile.move(v, tiles[0], maxX, maxY), ...tiles.slice(0, -1) ];
            }
        };

        export const isValid = ( list: Tile[] ) => Set(list).size === list.length;

        export const make = ( 
            size: number = 2,
            direction: Point.Point = Point.X,
            start: Tile = topLeft
        ): Tile[] => {
            return Array
                .from(Array(size), ( _, index ) => {
                    return translate(Point.scale(index + 1, direction), start);  
                })
                .reverse();
        };
    }

}


export interface SnakeState {
    tiles: Tile.Tile[];
    direction: Point.Point;
    width: number;
    height: number;
    isPaused: boolean;
    isLost: boolean;
}

export interface SnakeProps extends SnakeState {
    onStop: () => void;
    onStart: () => void;
    onMove: () => void;
}


export interface SnakeAction {
    type: string;
    data: any;
}

export const reducer = ( state: SnakeState, action: SnakeAction ): SnakeState => {
    const { type } = action;
    switch ( type ) {
        case "changeDirection":
            return {
                ...state,
                direction: <Point.Point>action.data
            };
        case "start":
            return {
                ...state,
                isPaused: false
            };
        case "stop":
            return {
                ...state,
                isPaused: true
            };
        case "move":
            if ( !state.isPaused && !state.isLost ) {
                const tiles = Tile.list.move(
                    state.direction,
                    state.tiles,
                    state.width,
                    state.height
                );
                const isLost = Set(tiles).size !== tiles.length;

                return {
                    ...state,
                    tiles,
                    isLost
                };
            } else return state;
        case "grow":
            if ( !state.isPaused && !state.isLost ) {
                const last = state.tiles[state.tiles.length - 1];
                const tiles = Tile.list
                    .move(
                        state.direction,
                        state.tiles,
                        state.width,
                        state.height
                    )
                    .concat(last);
                const isLost = Set(tiles).size !== tiles.length;

                return {
                    ...state,
                    tiles,
                    isLost
                };
            } else return state;
        default:
            return state;
    }
};


export interface StartArgs {
    width: number;
    height: number;
    stop$: Stream<void>;
    move$: Stream<string>;
	start$: Stream<void>;
}

export const directions = <{[s: string]: Point.Point}>{
    up: Point.inv(Point.Y),
    down: Point.Y,
    left: Point.inv(Point.X),
    right: Point.X
};

export type directions = "up" | "down" | "left" | "right";

export const start = ( args: StartArgs ): Stream<SnakeState> => {

    const action$ = <Stream<SnakeAction>>xs
        .merge(
            args.stop$.mapTo({ type: "stop" }),
            args.start$.mapTo({ type: "start" }),
            args.move$.map( dir => ({
                type: "changeDirection",
                data: (directions[dir] || Point.X)
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
            tiles: Tile.list.make(),
            isPaused: true,
            isLost: false,
            direction: Point.X,
            width: args.width,
            height: args.height
        });

};
