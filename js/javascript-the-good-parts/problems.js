function identity(x) {
    return x;
}

function add(x, y) {
    return x + y;
}

function mul(x, y) {
    return x * y;
}

function identityf(x) {
    return function () {
        return x;
    }
}

function addf(x) {
    return function (y) {
        return x + y;
    }
}

function applyf(binaryFunc) {
    return function (x) {
        return function (y) {
            return binaryFunc(x, y);
        }
    }
}

