# Chapter 11 - Exceptions & Error Handling

## The `Error` Object

- JavaScript's `Error` object contains details of errors raised by systems:

    ```javascript
    function validateEmail(email) {
        return email.match(/@/) ?
            email :
            new Error(`invalid email: ${email}`);
    }

    const email = "jane@doe.com";

    const validatedEmail = validateEmail(email);
    if (validatedEmail instanceof Error) {
        console.error(`Error: ${validatedEmail.message}`);
    } else {
        console.log(`Valid email: ${validatedEmail}`);
    }
    ```


## Exception Handling - `try` and `catch`

- Better than the approach above is to use `try` to run some code, then `catch` to catch any exceptions arising whilst running that code.

- Use `throw` to raise errors in your own code.

    ```javascript
    function validateEmail(email) {
        if (email.match(/@/)) {
            return email;
        } else {
            throw new Error(`invalid email: ${email}`);
        }
    }

    const email = null;

    try {
        const validatedEmail = validateEmail(email);
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
    ```

- Instances of `Error` contain a property `stack`, which is a string representation of the call stack at the point where the exception was thrown.


## `finally`

- Use `finally` to include code that must always be run (e.g. to close connections).
