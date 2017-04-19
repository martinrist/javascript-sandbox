const fs = require('fs');

// Read in the first file
fs.readFile('a.txt', function(err, dataA) {
    if (err) return console.error(err);

    // Read in the second file
    fs.readFile('b.txt', function(err, dataB) {
        if (err) return console.error(err);

        // Read in the second file
        fs.readFile('c.txt', function(err, dataC) {
            if (err) return console.error(err);

            // Wait for 5 seconds
            setTimeout(function() {
                // Write combined file
                fs.writeFile('d.txt', dataA + dataB + dataC, function(err) {
                    if (err) return console.error(err);
                });
            }, 5 * 1000);
        });
    });
});