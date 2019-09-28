const geolib = require('geolib')
const moment = require('moment')
const knex = require('../knex')
const { convertMilesToMeters } = require('../util/geocoding')

const createRaid = async (raid) => {
    const { latitude, longitude } = raid
    return knex('raids')
        .returning('id')
        .insert({
        latitude,
        longitude
    })[0]
}

const recalculateRaidCenter = async (raidId) => {
    const reportLatsAndLongs = await
        knex.select('latitude', 'longitude')
            .from('reports')
            .where({ raidId })
    const { latitude, longitude } = geolib.getCenter(reportLatsAndLongs)
    await knex('raids')
        .where({ id: raidId })
        .update({
            latitude: latitude,
            longitude: longitude,
            updatedAt: knex.fn.now()
        })
}

const getRaids = async (request) => {
    const {
        latitude,
        longitude,
        startTime,
        radius,
    } = request
}

const newReport = async (request) => {
    const {
        latitude,
        longitude,
        datetime,
        isSighting,
    } = request
    // Find a raid within the day of the current report and where the lat and long is within a 1 mile radius of the current lat long
    // TODO: This most likely should be within the same day, not 24 hrs
    const oneDayBeforeCurrentReport = moment(datetime).subtract(1, 'days')

    const oneMileInMeters = convertMilesToMeters(1)
    const { minLat, maxLat, minLng, maxLng } = geolib.getBoundsOfDistance({
        latitude,
        longitude,
    }, oneMileInMeters)

    let raidId = ''
    let shouldRecalculateRaidCenter = false
    const existingRaid = await
        knex('raids')
            .where('createdAt', '>=', oneDayBeforeCurrentReport)
            .andWhereBetween('latitude', [minLat, maxLat])
            .andWhereBetween('longitude', [minLng, maxLng])
            .first()

    if (!existingRaid) {
        raidId = await createRaid(request)
    } else {
        raidId = existingRaid.id
        shouldRecalculateRaidCenter = true
    }

    await knex('reports').insert(Object.assign({
        latitude,
        longitude,
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
