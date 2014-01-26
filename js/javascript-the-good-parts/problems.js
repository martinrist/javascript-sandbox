// Problem 1
function identity(x) {
    return x;
}

// Problem 2 - add
function add(x, y) {
    return x + y;
}

// Problem 2 - mul
function mul(x, y) {
    return x * y;
}

// Problem 3
function identityf(x) {
    return function () {
        return x;
    }
}

// Problem 4
function addf(x) {
    return function (y) {
        return x + y;
    }
}

// Problem 5
function applyf(binaryFunc) {
    return function (x) {
        return function (y) {
            return binaryFunc(x, y);
        }
    }
}

// Problem 6
function curry(func, x) {
    return function (y) {
        return func(x, y);
    }
}

// Problem 6 - Variant
function curry2(func, x) {
    return applyf(func)(x);
}

// Problem 7
inc_v1 = addf(1);
inc_v2 = applyf(add)(1);
inc_v3 = curry(add, 1);

// Problem 8
function methodize(func) {
    return function (y) {
        return func(this, y);
    }
}

// Problem 9
Number.prototype.add = methodize(add);
Number.prototype.mul = methodize(mul);

function demethodize(func) {
    return function (x, y) {
        return func.call(x, y);
    }
}

// Problem 10
function twice(func) {
    return function (x) {
        return func(x, x);
    }
}

// Problem 11
var double = twice(add);
var square = twice(mul);

function composeu(f, g) {
    return function (x) {
        return g(f(x));
    }
}

// Problem 12
function composeb(f, g) {
    return function (x, y, z) {
        return g(f(x, y), z);
    }
}

// Problem 13
function once1(func) {
    var alreadyCalled = false;
    return function () {
        if (!alreadyCalled) {
            alreadyCalled = true;
            return func.apply(this, arguments);
        } else {
            throw Error("Function already called");
        }
    }
}

// Problem 13 - Alternative approach without 'alreadyCalled'
function once2(func) {
    return function () {
        var f = func;
        func = null;
        return f.apply(this, arguments);
    }
}

// Problem 14
function counterf(value) {
    return {
        inc: function () {
            value += 1;
            return value;
        },
        dec: function () {
            value -= 1;
            return value;
        }
    };
}

// Problem 15
function revocable(nice) {
    return {
        invoke: function () {
            return nice.apply(this, arguments);
        },
        revoke: function () {
            nice = null;
        }
    };
}