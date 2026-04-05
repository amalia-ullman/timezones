export async function get_timezone_data() {
    const environment = "development";
    const base_url = (environment === "production") ? "/timezones" : "";

    const request_url =
        `${base_url}/data.json`;
    const request = new Request(request_url);

    const response = await fetch(request);
    const location_data = await response.json();
    const preEl = document.querySelector('#pre');
    preEl.textContent = JSON.stringify(location_data);

    console.log(location_data);
    return location_data;
}

get_timezone_data();