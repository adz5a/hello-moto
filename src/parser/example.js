import { pplus, char, sat, unit } from "./parser";
import { chainl1 } from "./recursive";
import { symbol, apply, space } from "./lexical";
var digitChar = sat(function (c) { return c <= "9" && c >= "0"; });
export var digit = apply(digitChar.bind(function (d) { return space.bind(function (_) { return unit(parseInt(d)); }); }));
export var _mulop = chainl1(digit, char("*").bind(function (_) { return unit(function (x, y) { return x * y; }); }));
var _mulop_ = unit(function (x, y) { return x * y; });
export var mulop = char("*").bind(function (_) { return _mulop_; });
var _adop_ = unit(function (x, y) { return x + y; });
export var addop = char("+").bind(function (_) { return _adop_; });
var term;
var expr;
var factor;
var leftPar = symbol("(");
var rightPar = symbol(")");
// a factor is either a digit or an expression surrounded with parenthesis
factor = pplus(digit, leftPar.bind(function (_) { return expr.bind(function (n) { return rightPar.bind(function (_) { return unit(n); }); }); }));
term = chainl1(factor, mulop);
expr = chainl1(term, addop);
export { factor, expr, term };
//# sourceMappingURL=example.js.map