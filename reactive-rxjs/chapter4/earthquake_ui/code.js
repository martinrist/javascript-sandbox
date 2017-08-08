/*global Rx, QUAKE_URL, L, theMap*/

const identity = Rx.helpers.identity;

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
        const circle = L.circle([coords[1], coords[0]], size).addTo(theMap);
        quakeLayer.addLayer(circle);
        codeLayers[quake.id] = quakeLayer.getLayerId((circle));
    });

    const table = document.getElementById("quakes_info");
    const codeLayers = {};
    const quakeLayer = L.layerGroup([]).addTo(theMap);

    getRowFromEvent(table, "mouseover")
        .pairwise()
        .subscribe(rows => {
            const prevCircle = quakeLayer.getLayer(codeLayers[rows[0].id]);
            const currCircle = quakeLayer.getLayer(codeLayers[rows[1].id]);
            prevCircle.setStyle({color: "#0000ff"});
            currCircle.setStyle({color: "#ff0000"});
        });

    getRowFromEvent(table, "click")
        .subscribe(row => {
            const circle = quakeLayer.getLayer(codeLayers[row.id]);
            theMap.panTo(circle.getLatLng());
        });

    quakes
        .pluck("properties")
        .map(makeRow)
        .subscribe(row => table.appendChild(row));
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

function getRowFromEvent(table, event) {
    return Rx.Observable.fromEvent(table, event)
        .filter(event => {
            const el = event.target;
            return el.tagName === "TD" && el.parentNode.id.length;
        })
        .pluck("target", "parentNode")
        .distinctUntilChanged();
}