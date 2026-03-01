async function get_timezone_data() {
    const base_url = "/timezones";
    const request_url =
        `${base_url}/timezones/data.json`;
    const request = new Request(request_url);

    const response = await fetch(request);
    const location_data = await response.json();
    const preEl = document.querySelector('#pre');
    preEl.textContent = JSON.stringify(location_data);

    console.log(location_data);
}

get_timezone_data();