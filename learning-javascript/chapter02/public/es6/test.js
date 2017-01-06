'use strict';

// es6 feature: block-scoped "let" declaration
const sentences = [
    { subject: 'JavaScript', verb: 'runs', object: 'everywhere' },
    { subject: 'Elephants', verb: 'are scared of', object: 'mice' },
];

// es6 feature: object destructuring
function say({ subject, verb, object }) {
    // es6 feature: template strings
    console.log(`${subject} ${verb} ${object}`);
}

// es6 feature: for..of
for (let s of sentences) {
    say(s);
}