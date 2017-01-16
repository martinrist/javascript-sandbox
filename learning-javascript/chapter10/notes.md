# Chapter 10 - Maps and Sets

## Maps

- Pre-ES6, you would use objects where you would typically expect to use maps.  This has drawbacks:
    - Prototypes could result in unintended mappings.
    - No easy way to know how many mappings are in an object.
    - Keys must be strings or symbols - can't map objects to values.
    - No guarantees on property ordering.

- In ES6, we can use a new `Map` object:

    ```javascript
    > const numberWords = new Map();
    > numberWords.set(1, "one").set(2, "two");
    Map { 1 => 'one', 2 => 'two' }

    > numberWords.get(1)
    'one'

    > numberWords.get(4)
    // undefined

    > numberWords.size
    2
    ```

- Methods `keys()`, `values()` and `entries()` return `MapIterator` instances, which can be enumerated over using a `for..of` loop:

    ```javascript
    > numberWords.keys()
    MapIterator {1, 2}

    > for (let k of numberWords.keys())
    >   console.log(k);
    1
    2

    > for (let [k, v] of numberWords.entries())
    >   console.log(`${k} => ${v}`);
    1 => one
    2 => two
    ```

- To delete a single entry from the map, use `delete()`:

    ```javascript
    > numberWords.delete(2);
    true

    > numberWords
    Map { 1 => 'one' }
    ```

- All entries from a map can be cleared using `clear()`.


## Weak Maps

- A `WeakMap` is identical to a `Map` except:
    - Keys must be objects.
    - Keys can be garbage-collected - with a normal `Map` - the map will have a reference to the key, which will prevent it being GC'd.
    - A `WeakMap` cannot be iterated - there would be too much risk of the iteration exposing an object that's in the process of being GC'd.
    - A `WeakMap` cannot be cleared.


## Sets and Weak Sets

- Also new in ES6, `Set` classes do not allow duplicates.

    ```javascript
    > const roles = new Set();
    > roles.add("User");
    Set { 'User' }

    > roles.add("Admin").add("Guest");
    Set { 'User', 'Admin', 'Guest')

    > roles.size
    3

    > roles.delete("Admin");
    Set { 'User', 'Guest' }
    ```

- Test set containment using 'has':

    ```javascript
    > roles.has("User");
    true

    > role.has("Unknown");
    false
    ```

- `WeakSet`s are like `Set`s, but, like `WeakMap`s the entries can be GC'd.
