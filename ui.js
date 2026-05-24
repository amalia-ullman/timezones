import { true_time } from "./math_tools.js";
import { Coordinate } from "./math_tools.js";

var map = L.map('map').setView([39.833333, -98.583333], 4)
map.setMaxBounds(L.latLngBounds(L.latLng(23, -125.42), L.latLng(49, -62.03)));

map.on('click', async function (e) {
    let latlng = e.latlng;
    let targetTZ = await GeoTZ.find(latlng['lat'], latlng['lng']);
    let true_time_result = await true_time(new Coordinate(latlng['lat'], latlng['lng']), targetTZ); // time offset but ill leave it as true_time_result

    const now = new Date();
    const zone_now = new Date(now.toLocaleString('en-US', { timeZone: targetTZ[0] }));
    const actual_true_time = new Date(zone_now.getTime() + true_time_result * 60000);

    const fmt = (d) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let popup = L.popup()
        .setLatLng(latlng)
        .setContent(`${fmt(actual_true_time)} (${fmt(zone_now)})`)
        .openOn(map);
})

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);