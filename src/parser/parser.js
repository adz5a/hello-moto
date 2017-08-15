export var item = mp(function (cs) { return cs.length ? [[cs[0], cs.slice(1)]] : []; });
export function unit(a) {
    return mp(function (cs) { return [[a, cs]]; });
}
export function bind(p) {
    return function (f) {
        return function (cs) {
            return concat(p(cs).map(function (res) { return f(res[0])(res[1]); }));
        };
    };
}
;
export var concat = [].concat.apply.bind([].concat, []);
/**
 * Parser Monad constructor
 * Takes a parser of type IParser<A>
 * and returns a Parser<A> with a bind method
 */
export function mp(p) {
    p.bind = function (f) { return mp(bind(p)(f)); };
    return p;
}
export function seq(a, b) {
    return a.bind(function (x) { return b.bind(function (y) { return unit([x, y]); }); });
}
;
export function plus(a, b) {
    return mp(function (cs) { return a(cs).concat(b(cs)); });
}
;
export function pplus(a, b) {
    var parser = plus(a, b);
    return mp(function (cs) {
        var res = parser(cs);
        if (res.length === 0) {
            return [];
        }
        else {
            return [res[0]];
        }
    });
}
;
export function zero() {
    return mp(function (cs) { return []; });
}
;
export function sat(f) {
    return item.bind(function (e) {
        if (f(e)) {
            return unit(e);
        }
        else {
            return zero();
        }
    });
}
export function char(charString) {
    return sat(function (x) { return x === charString; });
}
;
//# sourceMappingURL=parser.js.map