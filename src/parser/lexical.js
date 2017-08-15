import { pplus, char, unit, sat } from "./parser";
import { chainl1, many, string } from "./recursive";
var plus = char("+");
var minus = char("-");
export var digit = sat(function (c) { return c >= "0" && c <= "9"; });
var addopParser = pplus(plus.bind(function (_) {
    return unit(function (x, y) { return x + y; });
}), minus.bind(function (_) {
    return unit(function (x, y) { return x - y; });
}));
export var addop = chainl1(digit.bind(function (d) { return unit(parseInt(d, 10)); }), addopParser);
export var space = many(char(" "));
// takes a parser as input
// applies the parser once, then applies the space parser
// , throw out the result and returns the original token
export function token(p) {
    return p.bind(function (token) { return space.bind(function (_) { return unit(token); }); });
}
export function symbol(cs) {
    return token(string(cs));
}
// apply the given parser, throwing away any leading whitespace
export function apply(p) {
    return space.bind(function (_) { return p.bind(function (res) { return unit(res); }); });
}
//# sourceMappingURL=lexical.js.map