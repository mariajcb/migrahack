const geolib = require('geolib')
const moment = require('moment')
const knex = require('../knex')
const { convertMilesToMeters } = require('../util/geocoding')

const createRaid = async (raid) => {

}

const recalculateRaidCenter = async (raidId) => {
    const reportLatsAndLongs = await
        knex.select('lat as latitude', 'long as longitude')
            .from('reports')
            .where({ raidId })
    const { latitude, longitude } = geolib.getCenter(reportLatsAndLongs)
    await knex('raids')
        .where({ id: raidId })
        .update({
            lat: latitude,
            long: longitude,
            updatedAt: knex.fn.now()
        })
}

const getRaids = async (request) => {
    const {
        lat,
        long,
        startTime,
        radius,
    } = request
}

const newReport = async (request) => {
    const {
        lat,
        long,
        datetime,
        isSighting,
    } = request
    // Find a raid within the day of the current report and where the lat and long is within a 1 mile radius of the current lat long
    // TODO: This most likely should be within the same day, not 24 hrs
    const oneDayBeforeCurrentReport = moment(datetime).subtract(1, 'days')

    const oneMileInMeters = convertMilesToMeters(1)
    const { minLat, maxLat, minLng, maxLng } = geolib.getBoundsOfDistance({
        latitude: lat,
        longitude: long,
    }, oneMileInMeters)

    let raidId = ''
    let shouldRecalculateRaidCenter = false
    const existingRaid = await
        knex('raids')
            .where('createdAt', '>=', oneDayBeforeCurrentReport)
            .andWhereBetween('lat', [minLat, maxLat])
            .andWhereBetween('long', [minLng, maxLng])
            .first()

    if (!existingRaid) {
        raidId = await createRaid(request)
    } else {
        raidId = existingRaid.id
        shouldRecalculateRaidCenter = true
    }

    await knex('reports').insert(Object.assign({
        lat,
        long,
        isSighting,
        raidId,
    }, datetime ? {
        startTime: datetime
    } : {}))

    if (shouldRecalculateRaidCenter) {
        await recalculateRaidCenter(raidId)
    }
}

module.exports =  {
    getRaids,
    newReport
}
