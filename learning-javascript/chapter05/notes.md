# Chapter 5 - Expressions and Operators

## Comparison Operators

- _Strict equality_ (`===` and `!==`) tests whether two references point to the same object.

- _Abstract equality_ (`==` and `!=`) tests whether references can be coerced into having the same value:

    ```javascript
    > 1 === 1
    true

    > 1 == 1
    true

    > 1 === "1"
    false

    > 1 == "1"
    true
    ```


## Comparing Numbers

- Note that `NaN` is never equal to anything, including itself.  Instead, we should test using `isNaN()`:

    ```javascript
    > NaN === NaN
    false

    > NaN == NaN
    false

    > isNaN(NaN)
    true
    ```


## Truthy and Falsy Values

- The following values (and only these) are considered 'falsy':
    - `undefined`
    - `null`
    - `false`
    - `0`
    - `NaN`
    - '' (an empty string)

- All other values are considered 'truthy'.  In particular:
    - Any object (including any whose `valueOf()` method returns `false`).
    - Any array, including an empty array.
    - Strings containing only whitespace (e.g. `"  "`).
    - The string `"false"`.