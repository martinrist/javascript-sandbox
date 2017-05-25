# Chapter 20 - Node

## Modules

- _Modules_ are a mechanism for packaging and namespacing code:
    - Helps prevent name collisions.

- Say we have two files that define the same function in different ways:

    ```javascript

    // Say we have a file amanda.js...

    function calculate(a, x, n) {
        if (x === 1) return a * n;
        return a * (1 - Math.pow(x, n)) / (1 - x);
    }

    module.exports = calculate;


    /// ... and a file tyler.js

    function calculate(r) {
        return 4/3 * Math.PI * Math.pow(r, 3);
    }

    module.exports = calculate;
    ```

- `module.exports = ...` states that each module exports a single function, so they can be used thus:

    ```javascript
    const geometricSum = require('./amanda.js');
    const sphereVolume = require('./tyler.js');

    console.log(geometricSum(1, 2, 5));         // logs 31
    console.log(sphereVolume(2));               // logs 33.510321638291124
    ```

- To allow a module to export multiple functions, export an object with function properties (e.g. in a file `calcs.js`):

    ```javascript
    module.exports = {
        geometricSum(a, x, n) {
            if (x === 1) return a * n;
            return a * (1 - Math.pow(x, n)) / (1 - x);
        },
        arithmeticSum(n) {
            return (n + 1) * n / 2;
        },
        quadraticFormula(a, b, c) {
            const D = Math.sqrt(b * b - 4 * a * c);
            return [(-b + D)/(2 * a), (-b - D) / (2 * a)];
        },
    };
    ```

- This can then be used as follows:

    ```javascript
    const calcs = require('./calcs.js');

    console.log(calcs.arithmeticSum(5));            // logs 15
    console.log(calcs.quadraticFormula(1, 2, -15)); // logs [3, -5]
    ```

- Alternatively, we can use the `exports` shorthand:

    ```javascript
    exports.geometricSum = function(a, x, n) {
        // function definition
    };

    exports.arithmeticSum = function(n) {
        // function definition
    };
    ```


## Core Modules, File Modules, and `npm` Modules

- Modules fall into three categories:
    - _Core modules_ - reserved module names provided by Node itself, such as `fs` and `os`.
    - _File modules_ - files that assign to `module.exports` and are then 'imported' using `require()`.
    - _npm modules_ - file modules that are located in the `node_modules` subdirectory.

- Node determines the type of module from the argument to `require`:
    - Doesn't start with `/`, `./` or `../` => core module
    - Starts with `/`, `./` or `../` => file module
    - Not a core module and doesn't start with `/`, `./` or `../` => npm module

- The following _core modules_ are global - i.e. always available without an explicit `require`:
    - `buffer` - For input/output (I/O) operations (primarily file and network).
    - `stream` - Stream-based data transfer.
    - `url` - URL prasing utilities.

- The following _core modules_ do need to be `require`d:
    - `assert` - Used for testing purposes.
    - `child_process` - Functions for running external programs (Node and otherwise).
    - `cluster` - Allows you to take advantage of multiple processes for performance.
    - `crypto` - Built-in cryptography libraries.
    - `dns` - Domain name system (DNS) functions for network name resolution.
    - `domain` - Allows grouping of I/O and other asynchronous operations to isolate errors.
    - `events` - Utilities to support asynchronous events.
    - `fs` - Filesystem operations.
    - `http` - HTTP server and related utilities.
    - `https` - HTTPS server and related utilities.
    - `net` - Asynchronous socket-based network API.
    - `os` - Operating system utilities.
    - `path` - Filesystem pathname utilities.
    - `punycode` - Encoding of Unicode using a limited ASCII subset.
    - `querystring` - Utilities for parsing and constructing URL querystrings.
    - `readline` - Interactive I/O utilities; primarily used for command-line programs.
    - `smalloc` - Allows for explicit allocation of memory for buffers.
    - `string_decoder` - Converts buffers to strings.
    - `tls` - Transport Layer Security (TLS) communication utilities.
    - `tty` - Low-level TeleTYpewriter (TTY) functions.
    - `dgram` - User Datagram Protocol (UDP) networking utilities.
    - `util` - Internal Node utilities.
    - `vm` - Virtual (JavaScript) Machine: allows for metaprogramming and context creation.
    - `zlib` - Compression utilities.HTTdPS server and related utilities.
    - `net` - Asynchronous socket-based network API.
    - `os` - Operating system utilities.

- _npm modules_ are file modules with a specific naming convention:
    - Node will look for the module in a `node_modules` subdirectory of the current directory.
    - If not found there, it will go up to the parent directory and repeat.
    - It will continue to repeat until it finds the module or reaches the filesystem root.
