/*global Rx, QUAKE_URL, L, theMap*/

function initialise() {
    const quakes = Rx.Observable
        .interval(5000)
        .flatMap(() => {
            console.log("Making call to " + QUAKE_URL);
            return Rx.DOM.jsonpRequest({
                url: QUAKE_URL,
                jsonpCallback: "eqfeed_callback"
            }).retry(3);
        })
        .flatMap(result => Rx.Observable.from(result.response.features))
        .distinct(quake => quake.properties.code)
        .share();

    quakes.subscribe(quake => {
        const coords = quake.geometry.coordinates;
        const size = quake.properties.mag * 10000;
        L.circle([coords[1], coords[0]], size).addTo(theMap);
    });

    const table = document.getElementById("quakes_info");
    quakes
        .pluck("properties")
        .map(makeRow)
        .bufferWithTime(500)
        .filter(rows => rows.length > 0)
        .map(rows => {
            const fragment = document.createDocumentFragment();
            rows.forEach(row => fragment.appendChild(row));
            return fragment;
        })
        .subscribe(fragment => {
            console.log("Adding fragment of size " + fragment.children.length + " to table");
            table.appendChild(fragment);
        });
}

Rx.DOM.ready().subscribe(initialise());

function makeRow(props) {

    const row = document.createElement("tr");
    row.id = props.net + props.code;

    const date = new Date(props.time);
    const time = date.toString();
    [props.place, props.mag, time].forEach(text => {
        const cell = document.createElement("td");
        cell.textContent = text;
        row.appendChild(cell);
    });

    return row;
}