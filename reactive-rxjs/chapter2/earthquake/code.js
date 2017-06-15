/*global Rx, QUAKE_URL, L, map*/

const quakes = Rx.Observable
    .interval(1000)
    .flatMap(() => Rx.DOM.jsonpRequest({
        url: QUAKE_URL,
        jsonpCallback: "eqfeed_callback"})
        .retry(3))
    .flatMap(result => Rx.Observable.from(result.response.features))
    .distinct(quake => quake.properties.code);

quakes.subscribe(quake => {
    const coords = quake.geometry.coordinates;
    const size = quake.properties.mag * 10000;
    const circle = L.circle([coords[1], coords[0]], size, { color: "#0000ff" }).addTo(map);
    quakeLayer.addLayer(circle);
    codeLayers[quake.id] = quakeLayer.getLayerId(circle);
});

function makeRow(props) {
    console.log(props);
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

const table = document.getElementById("quakes_info");
quakes
    .pluck("properties")
    .map(makeRow)
    .bufferWithTime(500)
    .filter(function(rows) { return rows.length > 0; })
    .map(rows => {
        const fragment = document.createDocumentFragment();
        rows.forEach(row => {
            const circle = quakeLayer.getLayer(codeLayers[row.id]);

            isHovering(row).subscribe(hovering =>
                circle.setStyle({ color: hovering ? "#ff0000" : "#0000ff"}));

            Rx.DOM.click(row).subscribe(() => map.panTo(circle.getLatLng()));

            fragment.appendChild(row);
        });
        return fragment;
    })
    .subscribe(fragment => table.appendChild(fragment));

const codeLayers = {};
const quakeLayer = L.layerGroup([]).addTo(map);

const identity = Rx.helpers.identity;

function isHovering(element) {
    const over = Rx.DOM.mouseover(element).map(identity(true));
    const out = Rx.DOM.mouseout(element).map(identity(false));
    return over.merge(out);
}