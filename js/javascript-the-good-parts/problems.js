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

