/*global Rx, QUAKE_URL, L*/

function initialise() {
    const quakes = Rx.Observable
        .interval(5000)
        .flatMap(function () {
            return Rx.DOM.jsonpRequest({
                url: QUAKE_URL,
                jsonpCallback: "eqfeed_callback"
            }).retry(3);
        })
        .flatMap(function (result) {
            return Rx.Observable.from(result.response.features);
        })
        .distinct(function (quake) {
            return quake.properties.code;
        });

    quakes.subscribe(function (quake) {
        const coords = quake.geometry.coordinates;
        const size = quake.properties.mag * 10000;
        L.circle([coords[1], coords[0]], size).addTo(map);
    });

    const table = document.getElementById("quakes_info");
    quakes
        .pluck("properties")
        .map(makeRow)
        .subscribe(function(row) {
            table.appendChild(row);
        });
}

Rx.DOM.ready().subscribe(initialise());

function makeRow(props) {

    const row = document.createElement("tr");
    row.id = props.net + props.code;

    const date = new Date(props.time);
    const time = date.toString();
    [props.place, props.mag, time].forEach(function(text) {
        const cell = document.createElement("td");
        cell.textContent = text;
        row.appendChild(cell);
    });

    return row;
}

