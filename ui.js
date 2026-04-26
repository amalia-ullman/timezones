import { true_time } from "./math_tools.js";
import { Coordinate } from "./math_tools.js";

var map = L.map('map').setView([39.833333, -98.583333], 4)
map.setMaxBounds(L.latLngBounds(L.latLng(23, -125.42), L.latLng(49, -62.03)));

map.on('click', async function (e) {
    let latlng = e.latlng;
    let popup = L.popup().setLatLng(latlng).setContent("Content copied: " + latlng).openOn(map);
    navigator.clipboard.writeText(e.latlng);
    let targetTZ = await GeoTZ.find(latlng['lat'], latlng['lng']);

    console.log(true_time(new Coordinate(latlng['lat'], latlng['lng']), targetTZ))
})

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);