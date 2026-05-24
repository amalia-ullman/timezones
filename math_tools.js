const LONG_CONVERSION = 69.17
const LAT_CONVERSION = 69;

export class Coordinate {
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

async function get_timezone_data() {
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

    const LONG_CONVERSION = 69.17
    const LAT_CONVERSION = 69;
}

// north-south distance
function latitude_dist_in_miles(point1, point2) {
    // distance per degree changes slightly, but is pretty evenly spaces for latitude
    return Math.abs(point1.latitude - point2.latitude) * LAT_CONVERSION;
}

// east-west distance
function longitude_dist_in_miles(point1, point2) {
    // distance per degree changes at each longitude
    // this finds the degree to mile conversion for each longitude
    const point1_dist_per_degree = Math.cos(point1.latitude * Math.PI / 180) * LONG_CONVERSION;
    const point2_dist_per_degree = Math.cos(point2.latitude * Math.PI / 180) * LONG_CONVERSION;

    // averages the degree to mile conversion
    const avg_dist_per_degree = (point1_dist_per_degree + point2_dist_per_degree) / 2;

    // cos(83) deg mode -> 0.2495
    // cos(83 * pi /180) -> 0.999

    // finds the distance in miles
    return Math.abs(point1.longitude - point2.longitude) * avg_dist_per_degree;
}


// find degree to mile conversion for each timezone for one step
// used to compile our data, but no longer needs to be called
// async function minutes_per_mile_conversion(timezone) {
//     const data = await get_timezone_data();
//     let points = [];
//     data.locations.forEach((element) => {
//         if (element.timezone.includes(timezone[0])) {
//             if (element["cardinal-extremity"] == "east" || element["cardinal-extremity"] == "west") {
//                 points.push(new Coordinate(element.coordinates.latitude, element.coordinates.longitude));
//             }
//         }
//     });

//     const point1_dist_per_degree = Math.cos(points[0].latitude * Math.PI / 180) * LONG_CONVERSION;
//     const point2_dist_per_degree = Math.cos(points[1].latitude * Math.PI / 180) * LONG_CONVERSION;

//     const avg_dist_per_degree = (point1_dist_per_degree + point2_dist_per_degree) / 2;

//     // find distance between extremities in miles
//     let distance = (Math.abs(points[0].longitude - points[1].longitude) * avg_dist_per_degree);
//     console.log(60 / distance);
//     // divide distance by 60
//     return 60 / distance;
// }



// find true time
export async function true_time(point, timezone) {
    /**
     * @params
     * POINT - coordinate(lat, long) after clicking map
     * TIMEZONE - array e.g. ['America/New York']
     * using east extremity so that the product of the distance between the point and extremity and the minute-per-mile conversion can be added instead of subtracted from the timezone time
     */

    const data = await get_timezone_data();

    const minutes_per_mile = [
        {
            "timezone": [
                "America/Los_Angeles"
            ],
            "conversion": 0.11438259941581887
        },
        {
            "timezone": [
                "America/Denver",
                "America/Boise",
                "America/Phoenix"
            ],
            "conversion": 0.07561638495566304
        },
        {
            "timezone": [
                "America/Chicago"
            ],
            "conversion": 0.04705401159362138
        },
        {
            "timezone": [
                "America/New_York",
                "America/Detroit",
                "America/Indiana/Indianapolis",
                "America/Indiana/Vincennes"
            ],
            "conversion": 0.05473295498928153
        }
    ];
    let conversion;
    let point2;

    minutes_per_mile.forEach((element) => {
        if (element.timezone.includes(timezone[0])) {
            conversion = element.conversion;
        }
    })

    data.locations.forEach((element) => {
        if (element.timezone.includes(timezone[0])) {
            if (element["cardinal-extremity"] == "east") {
                point2 = new Coordinate(element.coordinates.latitude, element.coordinates.longitude);
            }
        }
    });

    console.log(conversion * longitude_dist_in_miles(point, point2));
}


// must add columbus coordinates
// console.log(true_time(new Coordinate()), "Eastern Time");
