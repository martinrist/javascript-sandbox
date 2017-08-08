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
    quakes
        .pluck("properties")
        .map(makeRow)
        .bufferWithTime(500)
        .filter(rows => rows.length > 0)
        .map(rows => {
            const fragment = document.createDocumentFragment();
            rows.forEach(row => {
                const circle = quakeLayer.getLayer(codeLayers[row.id]);
                isHovering(row).subscribe(hovering => circle.setStyle( { color: hovering ? "#ff0000" : "#0000ff"}));
                Rx.DOM.click(row).subscribe(() => theMap.panTo(circle.getLatLng()));
                fragment.appendChild(row)
            });
            return fragment;
        })
        .subscribe(fragment => {
            console.log("Adding fragment of size " + fragment.children.length + " to table");
            table.appendChild(fragment);
        });

    const codeLayers = {};
    const quakeLayer = L.layerGroup([]).addTo(theMap);

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

function isHovering(element) {
    const over = Rx.DOM.mouseover(element).map(identity(true));
    const out = Rx.DOM.mouseout(element).map(identity(false));

    return over.merge(out);
}