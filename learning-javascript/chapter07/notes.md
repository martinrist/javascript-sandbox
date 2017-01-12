# Chapter 7 - Scope

## Lexical Scoping

- JavaScript uses _lexical scoping_, which means we can determine which variables are in scope by looking at the source code:
    - Whatever variables are in scope where you _define_ a function from (as opposed to when you _call_ it) are in scope in the function.


## Global Scope

- _Global scope_ is the scope you're implicitly in at the start of a program, before entering any blocks or functions.

    ```javascript
    const global = 2;

    {
        ... declarations here are not global
    }
    ```

- Anything declared in global scope is called a _global_:
    - Globals themselves are not bad, but having too many things that depend on them is.


## Block Scope

- `let` and `const` declare identifiers in _block scope_ (inside `{ ... }` braces.  Block scope refers to the identifiers that are only in scope within the block:

    ```javascript
    {
        const x = 3;
        console.log(x);     // x is in scope here
    }
    console.log(x);         // outside block, x is not defined => ReferenceError
    ```

- Example above is a _standalone_ block, but the same applies for blocks that are part of control flow statements.

- When the same name variable is declared in a _nested_ scope, the inner declaration _masks_, or shadows the outer definition:
    - Both variables are in scope, but the one declared in the outer block is not accessible.


## Functions, Closures and Lexical Scope

- _Closures_ are functions defined in a specific scope so that they explicitly have access to that scope.

    ```javascript
    let globalFunc;
    {
        let blockVar = 'a';
        globalFunc = function() {
            console.log(blockVar);
        }
    }
    globalFunc();                       // logs 'a'
    ```


## Immediately Invoked Function Expressions

- _Immediately Invoked Function Expressions (IIFEs)_ are function declarations that are then run immediately:

    ```javascript
    (function() {
        // this is the IIFE body
    })();
    ```

- IIFEs have their own scope, and can pass things out:

    ```javascript
    const message = (function() {
        const secret = "I'm a secret!";
        return `The secret is ${secret.length} characters long.`;
    })();
    console.log(message);
    ```


## Function Scope and Hoisting

- Before introduction of `let` in ES6, variables were declared with `var` and had _function scope_:
    - Means that the variable exists _everywhere in the current scope_, including _before its declaration_.

- Variables declared with `var` are _hoisted_ - JavaScript scans the entire scope in which the `var` is declared, and _hoists_ the declaration to the top of the scope.

    ```javascript
    {
        console.log(x);         // Logs 'undefined'
        var x = "foo";
        console.log(x);         // Logs 'foo'
    }
    ```

- With `let`, a `ReferenceError` occurs if an attempt is made to access a variable before it's declared.

- Function declarations are also hoisted to the top of their scope, which means you can call functions before they're declared:

    ```javascript
    f();                        // Logs 'f'
    function f() {
        console.log('f');
    }
    ```


## Strict Mode

- In ES5, if you forgot to declare a variable with `var`, it became an _implicit global_ and would be created in global scope if it didn't already exist.

- _Strict mode_ is enabled by adding the string `"use strict"` on a line by itself before any other code in the scope.  It prevents the use of implicit globals.

- Beware declaring strict mode in global scope, because other scripts will inherit the global setting, and may not work.