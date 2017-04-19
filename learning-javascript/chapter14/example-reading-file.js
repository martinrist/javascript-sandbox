const fs = require('fs');

const fname = 'example-reading-file.js';
fs.readFile(fname, function(err, data) {
    if (err) return console.error(`error reading file ${fname}: ${err.message}`);
    console.log(`${fname} contents:\n${data}`);
});