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