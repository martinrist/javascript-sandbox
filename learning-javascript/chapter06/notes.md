# Chapter 6 - Functions

## Destructuring Arguments

- New feature in ES6 allows _destructuring_ of argument values:

```javascript
function getSentence({ subject, verb, object }) {
    return `${subject} ${verb} ${object}`;
}

> getSentence({subject: "I", verb: "love", object: "JavaScript"});
"I love JavaScript"
```

- Also new, the _spread operator_ (`...`) can be used to collect additional arguments at the end of functions:

```javascript
function addPrefix(prefix, ...words) {
    // words is an array
}
```


## Default Arguments

- In ES6, functions can specify _default values_ for arguments.  If an argument isn't provided, it takes the default value rather than `undefined`:

```javascript
function f(a, b = "default", c = 3) {
    return `${a} - ${b} - ${c}`;
}

> f(5, 6, 7)
"5 - 6 - 7"

> f(5, 6)
"5 - 6 - 3"

> f(5)
"5 - default - 3"

> f()
"undefined - default - 3"
```


## Object Methods

- Functions specified as properties of objects are called _methods_ and can be called from a reference to the object:

```javascript
const o = { name: "Wallace",
            bark: function() { return "Woof!"; }
          }

> o.bark()
"Woof!"
```

- ES6 has a special shorthand syntax for declaring methods, that misses out the `function` keyword:

```javascript
const o = { name: "Wallace",
            bark() { return "Woof!"; }
          }

> o.bark()
"Woof!"
```


## The `this` Keyword

- Inside a function body, can use `this` to reference the object on which the method is called:
    - `this` is bound according to how the function is called, not where the function is declared.
    - In examples below, `this` is bound to `o` because it's called via `o.speak`, not because `speak` is a property of `o`:

    ```javascript
    const o = { name: "Wallace",
                speak() { return `My name is ${this.name}!`; {
                }

    > o.speak()
    "My name is Wallace!"
    ```

- Beware using `this` inside nested functions - it will get bound to the global object (in strict mode) or `undefined` (if not).


## Arrow Notation

- _Arrow notation_ is introduced in ES6, which allows:
    - Omitting `function`.
    - If the function takes a single argument, can omit parentheses.
    - If the function body is a single expression, can omit braces and `return` statement.

    ```javascript
    const f1 = () => "Hello!";             // no arguments
    const f2 = name => `Hello, ${name}!`;  // single argument
    const f3 = (a, b) => a + b;            // two arguments
    ```

* `this` is bound lexically inside inner functions declared using arrow notation.