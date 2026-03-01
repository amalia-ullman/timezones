async function get_timezone_data() {
    const base_url = "/timezones";
    //const base_url = "";
    const request_url =
        `${base_url}/data.json`;
    const request = new Request(request_url);

    const response = await fetch(request);
    const location_data = await response.json();
    const preEl = document.querySelector('#pre');
    preEl.textContent = JSON.stringify(location_data);

    console.log(location_data);
}

var map = L.map('map').setView([39.833333, -98.583333], 4);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

get_timezone_data();