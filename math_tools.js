class Coordinate {
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
    point1_dist_per_degree = Math.cos(point1.longitude * Math.PI / 180) * LONG_CONVERSION;
    point2_dist_per_degree = Math.cos(point2.longitude * Math.PI / 180) * LONG_CONVERSION;

    // averages the degree to mile conversion
    avg_dist_per_degree = (point1_dist_per_degree + point2_dist_per_degree) / 2;

    // finds the distance in miles
    return Math.abs(point1.longitude - point2.longitude) * avg_dist_per_degree;
}