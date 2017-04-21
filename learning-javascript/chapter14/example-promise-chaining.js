function countdown(seconds) {
    return new Promise(function(resolve, reject) {
        for (let i=seconds; i>=0; i--) {
            setTimeout(function() {
                if (i>0) console.log(i + '...');
                else resolve(console.log("GO!"));
            }, (seconds-i) * 1000);
        }
    });
}

function launch() {
    return new Promise(function(resolve, reject) {
        console.log("Lift off!");
        setTimeout(function() {
            resolve("In orbit!");
        }, 2 * 1000);
    });
}

countdown(5)
    .then(launch)
    .then(function(msg) {
        console.log(msg);
    })
    .catch(function(err) {
        console.error("Houston, we have a problem...");
    })