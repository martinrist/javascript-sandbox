class Car {
    constructor(make, model) {
        this.make = make;
        this.model = model;
        this.userGears = ["P", "N", "R", "D"];
        this.userGear = this.userGears[0];
    }

    shift(gear) {
        if (this.userGears.indexOf(gear) < 0)
            throw new Error(`Invalid gear: ${gear}`);
        this.userGear = gear;
    }
}

const tesla = new Car("Tesla", "Model S");
console.log(tesla);

class Car2 {
    // Uses dynamic properties
    constructor(make, model) {
        this.make = make;
        this.model = model;
        this._userGears = ["P", "N", "R", "D"];
        this._userGear = this._userGears[0];
    }

    get userGear() { return this._userGear; }

    set userGear(value) {
        if (this._userGears.indexOf(value) < 0)
            throw new Error(`Invalid gear: ${value}`);
        this._userGear = value;
    }
}

const mondeo = new Car2("Ford", "Mondeo");
console.log(mondeo);