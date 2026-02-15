async function getTimezoneData() {
    const requestURL =
        "/data.json";
    const request = new Request(requestURL);

    const response = await fetch(request);
    const location_data = await response.json();
    const preEl = document.querySelector('#pre');
    preEl.textContent = JSON.stringify(location_data);

    console.log(location_data);
}

getTimezoneData();