# Chapter 9 - Objects & Object-Oriented Programming

## Property Enumeration

- Order of property enumeration is not guaranteed, unlike array enumeration.

- Use `for .. in` to enumerate properties:

    ```javascript
    > const o = { a: 1, b: 2, c: "foo", d: undefined, e: null}

    > for (let prop in o) {
        console.log(`${prop}: ${o[prop]}`);
      }

    a: 1
    b: 2
    c: foo
    d: undefined
    e: null
    ```

- `Object.keys(o)` returns an array of the keys of an object, and can be used for enumeration:

    ```javascript
    > Object.keys(o).forEach(prop => console.log(`${prop}: ${o[prop]}`))
    ```


## Class and Instance Creation

- In ES6, create a new class using the `class` keyword:

    ```javascript
    class Car {
        constructor() {
            // Logic here is invoked when a new instance of the class is created
        }
    }
    ```

- To give a class data and behaviour:

    ```javascript
    class Car {
        constructor(make, model) {
            this.make = make;
            this.model = model;
            this.userGears = ['P', 'N', 'R', 'D'];
            this.userGear = this.userGears[0];
        }
        shift(gear) {
            if (this.userGears.indexOf(gear) < 0)
                throw new Error(`Invalid gear: ${gear}`);
            this.userGear = gear;
        }
    }
    ```


## Dynamic Properties

- In the above example, although `shift` seems to protect from selecting an invalid gear, it's always possible to set it directly:

    ```javascript
    > const tesla = new Car("Tesla", "Model S")
    > tesla.userGear = "X";
    > tesla.userGear
    'X'
    ```

- Not possible to make `userGear` here completely 'private', but _dynamic properties_ (a.k.a. _accessor properties_) can help:

    ```javascript
    class Car {
        constructor(make, model) {
            this.make = make;
            this.model = model;
            this._userGears = ['P', 'N', 'R', 'D'];
            this._userGear = this._userGears[0];
        }

        get userGear() { return this._userGear; }
        set userGear(value) {
            if (this._userGears.indexOf(value) < 0)
                throw new Error(`Invalid gear: ${value}`);
                this._userGear = value;
        }

        shift(gear) { this.userGear = gear; }
    }
    ```

- Here, we're prefixing 'private' properties with an underscore - convention dictates these shouldn't be accessed directly.


## Classes Are Functions

- Before ES6, classes were created using functions that served as the class constructor:

    ```javascript
    function Car(make, model) {
        this.make = make;
        this.model = model;
        this._userGears = ["P", "N", "R", "D"];
        this._userGear = this._userGears[0];
    }
    ```

- The `class` keyword just adds syntactic sugar, os classes are really still functions:

    ```javascript
    > typeof Car
    function
    ```


## The Prototype

- Every funciton has a special property `prototype`:
    - For regular functions, the prototype isn't used.
    - When a function that acts as a constructor is called using the `new` keyword, a new instance is created which stores the function's protopype in its `__proto__` property.

- When you attempt to access a property or method on an object, if it doesn't exist, JavaScript _checks the object's prototype_ to see if it exists there.

- All instances of a given class share the same prototype (added when the instance was created), so all instances of a class have access to a property or method.

- Defining a method or property on an instance will override the version in the prototype.

    ```javascript
    > const car1 = new Car();
    > const car2 = new Car();

    > car1.shift === Car.prototype.shift
    true

    > car1.shift('D');
    > car1.userGear

    > car1.shift = function(gear) { this.userGear = gear.toUpperCase(); }
    [Function]

    // Now car1 has its own version of `shift`
    > car1.shift === Car.prototype.shift
    false

    > car1.shift("r");
    > car1.userGear
    "R"
    ```


## Static Methods

- Static methods (as opposed to instance methods) are declared using the `static` keyword:

    ```javascript
    class Car {
        static getNextVIN() {
            return Car.nextVIN++;
        }
    }

    Car.nextVin = 0;
    ```


## Inheritance

- An instance of a class _inherits_ whatever functionality is in the class's prototype.

- When attempting method dispatch, if a method doesn't exist in a prototype, JavaScript then checks the prototype's prototype - thereby establishing a _prototype chain_.

- This can be used to create an inheritance hierarchy:

    ```javascript
    class Vehicle {
        constructor() {
            this.passengers = [];
            console.log("Vehicle created");
        }
        addPassenger(p) {
            this.passengers.push(p);
        }
    }

    class Car extends Vehicle {
        constructor() {
            super();                    // Call Vehicle's constructor
            console.log("Car created");
        }
        deployAirbags() {
            console.log("BWOOSH!);
        }
    }
    ```

- On an object, the `hasOwnProperty(p)` method will return:
    - `true` if the object declares the property `p` itself.
    - `false` if the property isn't defined, or is defined in the prototype chain.
