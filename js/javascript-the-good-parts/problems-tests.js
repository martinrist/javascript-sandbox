/*global identity, add, mul, identityf, addf, applyf, curry, methodize, demethodize, inc_v1, inc_v2, inc_v3, twice, composeu, composeb*/
/*global module, test, equal*/

'use strict';

//noinspection JSUnusedGlobalSymbols
module("Default", {
    teardown: function () {
        delete Number.prototype.add;
        delete Number.prototype.mul;
    }
});

test("Problem 1 - identity(x)", function () {
    equal(identity(3), 3, "identity(x) returns argument");
});

test("Problem 2 - add(x, y) and mul(x, y)", function () {
    equal(add(3, 4), 7, "add(x, y) returns x + y");
    equal(mul(3, 4), 12, "mul(x, y) returns x * y");
});

test("Problem 3 - identityf(x)", function () {
    equal(typeof identityf(3), "function", "identityf() returns a function");
    equal(identityf(3)(), 3, "identityf() result is an identity function");
});

test("Problem 4 - addf(x)(y)", function () {
    equal(typeof addf(3), "function", "addf(x) returns a function");
    equal(addf(3)(4), 7, "addf(x)(y) returns x + y");
});

test("Problem 5 - applyf(f)", function () {
    equal(typeof applyf(add), "function", "applyf(f) returns a function");
    equal(typeof applyf(add)(3), "function", "applyf(f)(x) returns a function");
    equal(applyf(add)(3)(4), 7, "applyf(add)(x)(y) returns add(x, y)");
    equal(applyf(mul)(5)(6), 30, "applyf(mul)(x)(y) returns mul(x, y)");
});

test("Problem 6 - curry(f, x)", function () {
    equal(typeof curry(add, 3), "function", "curry(f, x) returns a function");
    equal(curry(add, 3)(4), 7, "curry(add, x)(y) returns x + y");
    equal(curry(mul, 3)(4), 12, "curry(mul, x)(y) returns x * y");
});

test("Problem 7 - inc(x)", function () {
    equal(typeof inc_v1, "function", "inc_v1 is a function");
    equal(inc_v1(5), 6, "inc_v1(x) returns x + 1");
    equal(inc_v1(inc_v1(5)), 7, "inc_v1(inc_v1(x)) returns x + 2");
    equal(typeof inc_v2, "function", "inc_v2 is a function");
    equal(inc_v2(5), 6, "inc_v2(x) returns x + 1");
    equal(inc_v2(inc_v2(5)), 7, "inc_v2(inc_v2(x)) returns x + 2");
    equal(typeof inc_v3, "function", "inc_v3 is a function");
    equal(inc_v3(5), 6, "inc_v3(x) returns x + 1");
    equal(inc_v3(inc_v3(5)), 7, "inc_v3(inc_v3(x)) returns x + 2");
});

test("Problem 8 - methodize(f)", function () {
    equal(typeof methodize(add), "function", "methodize(f) returns a function");
    Number.prototype.add = methodize(add);
    equal((3).add(4), 7, "methodize(add) can be added to Number prototype");
});

test("Problem 9 - demethodize(f)", function () {
    Number.prototype.add = methodize(add);
    Number.prototype.mul = methodize(mul);
    equal(typeof demethodize(Number.prototype.add), "function", "demethodize(method) returns a function");
    equal(demethodize(Number.prototype.add)(5, 6), 11, "demethodize(Number.prototype.add)(x, y) returns x + y");
    equal(demethodize(Number.prototype.mul)(5, 6), 30, "demethodize(Number.prototype.mul)(x, y) returns x * y");
});

test("Problem 10 - twice(f)", function () {
    equal(typeof twice(add), "function", "twice(f) returns a function");
    equal(twice(add)(11), 22, "twice(add)(x) returns x + x");
    equal(twice(mul)(11), 121, "twice(mul)(x) returns x * x");
});

test("Problem 11 - composeu(f, g)(x)", function () {
    var double = twice(add);
    var square = twice(mul);
    equal(typeof composeu(double, square), "function", "composeu(f, g) returns a function");
    equal(composeu(double, square)(3), 36, "composeu(f, g)(x) returns g(f(x))");
});

test("Problem 12 - composeb(f, g)(x, y, z)", function () {
    equal(typeof composeb(add, mul), "function", "composeb(f, g) returns a function");
    equal(composeb(add, mul)(2, 3, 5), 25, "composeb(f, g)(x, y, z) returns g(f(x, y), z)");
});