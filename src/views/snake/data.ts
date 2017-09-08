import { Record } from "immutable";



export namespace Point {

    export const of = Record({ x: 0, y: 0 });
    export const vector = of;

    export const X = of({ x: 10, y: 0 });
    export const Y = of({ x: 0, y: 10 });

    export type Point = typeof X;
    export type Vector = Point;

    export const translate = ( t: Vector, p: Point ) => of({
        x: p.get("x") + t.get("x"),
        y: p.get("y") + t.get("y"),
    });

    export const scale = ( factor: number, p: Point ) => of({
        x: factor * p.get("x"),
        y: factor * p.get("y")
    });

    export const opp = ( X: Point ) => scale(-1, X);
}

export namespace Tile {

    export const of = Record({
        dim: 10,
        position: Point.of()
    });

    export const topLeft = of();

    export type Tile = typeof topLeft

    export const translate = ( v: Point.Vector, tile: Tile ) => of({
        dim: tile.get("dim"),
        position: Point.translate(tile.get("position"), v)
    });

    export namespace list {

        export const move = ( v: Point.Vector, tiles: Tile[] ): Tile[] => {
            if ( tiles.length === 0 ) {
                return [];
            } else if ( tiles.length === 1 ) {
                return  tiles.map(tile => Tile.translate(v, tile));
            } else {
                return  [ Tile.translate(v, tiles[0]), ...tiles.slice(0, -1) ];
            }
        };

    }
}
