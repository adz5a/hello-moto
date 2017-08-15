import { unit, pplus, char } from "./parser";
export function string(s) {
    if (s.length === 0) {
        return unit("");
    }
    else {
        var charParsers = s.split("").map(char);
        return charParsers.slice(1)
            .reduce(function (parser, charParser) {
            return parser.bind(function (c) { return charParser.bind(function (d) { return unit(c + d); }); });
        }, charParsers[0]);
    }
}
;
export function many1(parser) {
    return parser.bind(function (x) { return many(parser).bind(function (xs) { return unit([x].concat(xs)); }); });
}
export function many(parser) {
    return pplus(many1(parser), unit([]));
}
// Parse repeated applications of a parser p, separated by applications
// of a parser *sep* whose result values are thrown away
export function sepby(p, sep) {
    return pplus(sepby1(p, sep), unit([]));
}
export function sepby1(p, sep) {
    return p.bind(function (cs) { return many(sep.bind(function (_) { return p; })).bind(function (xs) { return unit([cs].concat(xs)); }); });
}
// Parser repeated applications of a parser p, separated by applications 
// of a parser op whose result value is an operator that is assumed to associate
// to the left, and which is used to combine the results 
// 
// Differences between chainl and chainl1 :
// - fail case : if the input cannot be parsed then chainl will return its third argument
// whereas chainl1 will just fail and return empty array.
export function chainl(p, op, a) {
    return pplus(chainl1(p, op), unit(a));
}
export function chainl1(p, op) {
    var rest = function (x) {
        return pplus(op.bind(function (f) { return p.bind(function (y) { return rest(f(x, y)); }); }), unit(x));
    };
    return p.bind(function (x) { return rest(x); });
}
//# sourceMappingURL=recursive.js.map