import { get_timezone_data } from './app.js';

export class Coordinate {
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

const LONG_CONVERSION = 69.17
const LAT_CONVERSION = 69;

// north-south distance
function latitude_dist_in_miles(point1, point2) {
    // distance per degree changes slightly, but is pretty evenly spaces for latitude
    return Math.abs(point1.latitude - point2.latitude) * LAT_CONVERSION;
}

// east-west distance
function longitude_dist_in_miles(point1, point2) {
    // distance per degree changes at each longitude
    // this finds the degree to mile conversion for each longitude
    point1_dist_per_degree = Math.cos(point1.latitude * Math.PI / 180) * LONG_CONVERSION;
    point2_dist_per_degree = Math.cos(point2.latitude * Math.PI / 180) * LONG_CONVERSION;

    // averages the degree to mile conversion
    avg_dist_per_degree = (point1_dist_per_degree + point2_dist_per_degree) / 2;

    // cos(83) deg mode -> 0.2495
    // cos(83 * pi /180) -> 0.999

    // finds the distance in miles
    return Math.abs(point1.longitude - point2.longitude) * avg_dist_per_degree;
}


// find degree to mile conversion for each timezone for one step
function minutes_per_mile_conversion(timezone) {
    const data = get_timezone_data();
    const points = [];
    data.array.forEach(element => {
        if (element.timezone.includes(timezone)) {
            if (element["cardinal-extremity"] == "east" || element["cardinal-extremity"] == "west") {
                points.push(new Coordinate(element.coordinates.latitude, element.coordinates.longitude));
            }
        }
    });

    point1_dist_per_degree = Math.cos(points[0].latitude * Math.PI / 180) * LONG_CONVERSION;
    point2_dist_per_degree = Math.cos(points[1].latitude * Math.PI / 180) * LONG_CONVERSION;

    avg_dist_per_degree = (point1_dist_per_degree + point2_dist_per_degree) / 2;

    // find distance between extremities in miles
    distance = Math.abs(points[0].longitude - points[1].longitude) * avg_dist_per_degree;

    // divide distance by 60
    return distance / 60;
}

// find true time
export function true_time(point, timezone) {
    const data = get_timezone_data();
    data.array.forEach(element => {
        if (element.timezone.includes(timezone)) {
            if (element["cardinal-extremity"] == "east") {
                return longitude_dist_in_miles(new Coordinate(element.coordinates.latitude, element.coordinates.longitude), point) * minutes_per_mile_conversion(timezone);
            }
        }
    });
}

// must add columbus coordinates
// console.log(true_time(new Coordinate()), "Eastern Time");
