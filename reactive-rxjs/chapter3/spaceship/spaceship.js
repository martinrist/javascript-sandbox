/*global Rx*/

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const SPEED = 40;
const STAR_NUMBER = 250;

function paintStars(stars) {
    // ctx.fillColor = "#000000";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    //ctx.fillColor("#ffff00");
    stars.forEach(s => ctx.fillRect(s.x, s.y, s.size, s.size));
}

const StarStream = Rx.Observable.range(1, STAR_NUMBER)
    .map(function () {
        return {
            x:    parseInt(Math.random() * canvas.width),
            y:    parseInt(Math.random() * canvas.height),
            size: Math.random() * 3 + 1
        };
    })
    .toArray()
    .flatMap(function(starArray) {
        return Rx.Observable.interval(SPEED).map(function() {
            starArray.forEach(function(star) {
                if (star.y >= canvas.height) {
                    star.y = 0; // Reset star to top of the screen
                }
                star.y += star.size;
            });
            return starArray;
        });
    });

StarStream.subscribe(starArray => paintStars(starArray));

