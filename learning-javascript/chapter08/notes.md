# Chapter 8 - Arrays & Array Processing

## Array Basics

- Arrays in JavaSCript can be _nonhomogeneous_.

- Literal arrays are constructed with square brackets, which are also used to access elements by index:

    ```javascript
    > const arr1 = [1, 2, 3];

    > arr1[0]
    1

    > arr1[1]
    2
    ```

- Arrays have a `length` property, which returns the number of elements.

- Assigning to an index larger than the array makes the array larger, with unused indices getting `undefined`:

    ```javascript
    > const arr2 = [1, 2, 3];

    > arr2[10] = 10
    10

    > arr2[10]
    10
    ```



## Array Manipulation Methods

- Different array manipulation methods either mutate the array in place or return a new array.

- `push` / `pop` adds / removes elements at the end of an array (in place);

    ```javascript
    > const arr = ["b", "c", "d"];

    > arr.push("e");
    4                       // push returns the new array length

    > arr
    [ 'b', 'c', 'd', 'e' ]

    > arr.pop()
    'e'

    > arr
    [ 'b', 'c', 'd' ]
    ```

- `shift` / `unshift` removes / adds elements at the beginning of the array (in place):

    ```javascript
    > const arr = ["b", "c", "d"]

    > arr.unshift("a");
    4                       // unshift returns the new array length

    > arr
    [ 'a', 'b', 'c', 'd' ]

    > arr.shift()
    'a'

    > arr
    [ 'b', 'c', 'd' ]
    ```

- `concat` adds multiple elements to the end of an array and returns a copy:

    ```javascript
    > const arr = [1, 2, 3];

    > arr.concat(4, 5, 6)
    [1, 2, 3, 4, 5, 6]

    > arr
    [1, 2, 3]                   // arr is unchanged

    > arr.concat([4, 5, 6])
    [1, 2, 3, 4, 5, 6]

    > arr.concat([4, 5], 6)
    [1, 2, 3, 4, 5, 6]          // arrays passed to concat are flattened (one level only)
    ```

- `slice` gets a subarray from an array, returning a new array and leaving the existing array unchanged:

    ```javascript
    const arr = [1, 2, 3, 4, 5];

    > arr.slice(3)
    [4, 5]                      // Omitting 2nd argument slices to end

    > arr.slice(2, 4)
    [3, 4]                      // 2nd index is exclusive

    > arr.slice(-2)
    [4, 5]                      // -ve arguments slice from end

    > arr.slice(1, -2)
    [2, 3]

    > arr.slice(-2, -1)
    [4]
    ```

- `splice` adds or removes elements at any position (in place):
    - 1st argument is the index at which to start modifying
    - 2nd argument is the number of elements to remove
    - Remaining arguments are the elements to be added

        ```javascript
        const arr = [1, 5, 7]
        arr.splice(1, 0, 2, 3, 4)     // returns []; arr is now [1, 2, 3, 4, 5, 7]
        arr.splice(5, 0, 6)           // returns []; arr is now [1, 2, 3, 4, 5, 6, 7]
        arr.splice(1, 2)              // returns [2, 3]; arr is now [1, 4, 5, 6, 7]
        arr.splice(2, 1, 'a', 'b')    // returns [5]; arr is now [1, 4, 'a', 'b', 6, 7]
        ```

- `copyWithin` (new in ES6) copies elements in-place to a different part of an array:
    - 1st argument is target index to copy to
    - 2nd argument is where to start copying from
    - Final (optional) argument is where to stop copying from

        ```javascript
        const arr = [1, 2, 3, 4];
        arr.copyWithin(1, 2);         // arr is now [1, 3, 4, 4]
        arr.copyWithin(2, 0, 2);      // arr is now [1, 3, 1, 3]
        arr.copyWithin(0, -3, -1);    // arr is now [3, 1, 1, 3]
        ```

- `fill` (new in ES6) sets any number of elements with a fixed value (in-place):

    ```javascript
    > const arr = new Array(5)
    > arr.fill("a");
    [ 'a', 'a', 'a', 'a', 'a' ]

    > arr
    [ 'a', 'a', 'a', 'a', 'a' ]

    arr.fill("b", 0, 2)
    [ 'b', 'b', 'a', 'a', 'a' ]
    ```

- `reverse` and `sort` do array reversal / sorting in-place.  `sort` also allows specification of a sort function:

    ```javascript
    const arr = [{ name: "Suzanne" }, { name: "Jim" },
                 { name: "Trevor" }, { name: "Amanda" }];

    arr.sort();                                // arr unchanged
    arr.sort((a, b) => a.name > b.name);       // arr sorted alphabetically
                                               // by name property
    arr.sort((a, b) => a.name[1] < b.name[1]); // arr sorted reverse alphabetically
                                               // by second letter of name property
    ```


## Searching in Arrays

- `indexOf` / `lastIndexOf` returns index of first / last  matching (`===`) item, or `-1` if no match:

    ```javascript
    > [1, 2, 3].indexOf(2)
    1

    > [1, 2, 3].indexOf(4)
    -1

    > [1, 2, 3].indexOf("2")
    -1
    ```

- `findIndex` takes a matching predicate, returning index of first match, or `-1` if no match:

    ```javascript
    > [1, 2, 3].findIndex(x => x === 2)
    1

    > [1, 2, 3].findIndex(x => x > 2)
    2

    > [1, 2, 3].findIndex(x => x == "2")
    1
    ```

- `find` is like `findIndex`, but returns the matched object, not the index, or `null` if not found.

- The predicate passed to `find` and `findIndex` has up to three arguments:
    - `element` - the current element being tested
    - `index` - the index of the current element being tested
    - `array` - the whole array

- `some` returns `true` if it finds at least one element matching the predicate.

    ```javascript
    > [1, 2, 3].some(x => x % 2 === 0)
    true

    > [1, 2, 3].some(x => x > 3)
    false
    ```

- `every` returns `true` if _every_ element matches the predicate:

    ```javascript
    > [1, 2, 3].every(x => x % 2 ===)
    false

    > [1, 2, 3].every(x => x < 4)
    true
    ```


## Fundamental Operations - `map` and `filter`

- `map` takes a function that transforms elements in the array:

    ```javascript
    > [1, 2, 3].map(x => -x)
    [-1, -2, -3]

    > function double(x) { return x * 2; }
    > [1, 2, 3].map(double)
    [2, 4, 6]
    ```

- `map` gets called with three arguments - `element`, `index` and `array`, just like `find` / `findIndex`.
