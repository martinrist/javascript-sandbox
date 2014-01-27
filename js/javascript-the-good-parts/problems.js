(function () {
    "use strict";

    // Problem 1
    // Write a function that takes an argument and returns that argument:
    //   identity(3)             // returns 3
    function identity(x) {
        return x;
    }


    // Problem 2
    // Write two binary functions, add and mul, that take two numbers and return their sum and product:
    //   add(3, 4)               // returns 7
    //   mul(3, 4)               // returns 12
    function add(x, y) {
        return x + y;
    }

    function mul(x, y) {
        return x * y;
    }


    // Problem 3
    // Write a function that takes an argument and returns a function that returns that argument:
    //   idf = identityf(3);
    //   idf()                   // returns 3
    function identityf(x) {
        return function () {
            return x;
        };
    }


    // Problem 4
    // Write a function that adds from two invocations:
    //   addf(3)(4)              // returns 7
    function addf(x) {
        return function (y) {
            return x + y;
        };
    }


    // Problem 5
    // Write a function that takes a binary function, and makes it callable with two invocations:
    //   addf = applyf(add);
    //   addf(3)(4)              // returns 7
    //   applyf(mul)(5)(6)       // returns 30
    function applyf(binaryFunc) {
        return function (x) {
            return function (y) {
                return binaryFunc(x, y);
            };
        };
    }


    // Problem 6
    // Write a function that takes a function and an argument, and returns a function that can supply a second argument:
    //   add3 = curry(add, 3);
    //   add3(4)                 // returns 7
    //   curry(mul, 5)(6)        // returns 30
    function curry(func, x) {
        return function (y) {
            return func(x, y);
        };
    }

    // Variant that uses applyf()
    //noinspection JSUnusedGlobalSymbols
    function curry2(func, x) {
        return applyf(func)(x);
    }


    // Problem 7
    // Without writing any new functions, show three ways to create the inc function:
    //   inc(5)                  // returns 6
    //   inc(inc(5))             // returns 7
    var inc_v1 = addf(1);
    var inc_v2 = applyf(add)(1);
    var inc_v3 = curry(add, 1);


    // Problem 8
    // Write methodize, a function that converts a binary function to a method:
    //   Number.prototype.add = methodize(add);
    //   (3).add(4)              // returns 7
    function methodize(func) {
        return function (y) {
            return func(this, y);
        };
    }


    // Problem 9
    // Write demethodize, a function that converts a method to a binary function:
    //   demethodize(Number.prototype.add)(5, 6)
    //                           // returns 11

    function demethodize(func) {
        return function (x, y) {
            return func.call(x, y);
        };
    }


    // Problem 10
    // Write a function twice that takes a binary function and returns a unary function that passes its argument to the
    // binary function twice:
    //   var double = twice(add);
    //   double(11)              // returns 22
    //   var square = twice(mul);
    //   square(11)              // returns 121
    function twice(func) {
        return function (x) {
            return func(x, x);
        };
    }


    // Problem 11
    // Write a function composeu that takes two unary functions and returns a unary function that calls them both:
    //   composeu(double, square)(3)
    //                           // returns 36
    function composeu(f, g) {
        return function (x) {
            return g(f(x));
        };
    }


    // Problem 12
    // Write a function composeb that takes two binary functions and returns a function that calls them both:
    //   composeb(add, mul)(2, 3, 5)
    //                           // returns 25
    function composeb(f, g) {
        return function (x, y, z) {
            return g(f(x, y), z);
        };
    }
}());