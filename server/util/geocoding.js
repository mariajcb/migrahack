const geolib = require('geolib')
const convertMilesToMeters = (miles) => {
    return miles/0.00062137
}

const getBoundsOfDistance = (coords, miles) => {
    const meters = convertMilesToMeters(miles)
    const bounds = geolib.getBoundsOfDistance(coords, meters)
    const southWestern = bounds[0]
    const northEastern = bounds[1]
    return {
        minLat: southWestern.latitude,
        maxLat: northEastern.latitude,
        minLng: southWestern.longitude,
        maxLng: northEastern.longitude
    }
}

module.exports = {
    convertMilesToMeters,
    getBoundsOfDistance,
}
