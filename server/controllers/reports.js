const geolib = require('geolib')
const moment = require('moment')
const knex = require('../knex')
const { getBoundsOfDistance } = require('../util/geocoding')

const createRaid = async (raid) => {
    const { latitude, longitude } = raid
    const newRaid = await knex
        .insert({
        latitude,
        longitude
    }, ['id']).into('raids')

    return newRaid[0]
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

const newComment = async (request) => {
    const { comment, raidId, reportId } = request
    await knex.insert({
        comment,
        raidId,
        reportId,
    }).into('comments')
}

const getRaids = async (request) => {
    const {
        latitude,
        longitude,
        daysBeforeToday,
        radiusInMiles,
    } = request

    const startTime =
        moment(knex.fn.now()).subtract(daysBeforeToday, 'days').toISOString() ||
        moment(knex.fn.now()).subtract(1, 'months').toISOString() // default to one month

    const { minLat, maxLat, minLng, maxLng } = getBoundsOfDistance({
        latitude,
        longitude,
    }, radiusInMiles || 5) // Default to 5 miles

    const raids = await
        knex('raids')
            .where('createdAt', '>=', startTime)
            .andWhereBetween('latitude', [minLat, maxLat])
            .andWhereBetween('longitude', [minLng, maxLng])

    const formattedRaids = await Promise.all(raids.map(async raid => {
        const raidId = raid.id
        const reports = await
            knex('reports')
                .where({ raidId })
        const comments = await
            knex('comments')
                .where({ raidId })
        raid.reports = reports
        raid.comments = comments
        return raid
    }))

    return formattedRaids
}

const newReport = async (request) => {
    const {
        latitude,
        longitude,
        datetime,
        isSighting,
        comment
    } = request
    // Find a raid within the day of the current report and where the lat and long is within a 1 mile radius of the current lat long
    const timeOfReport = datetime || knex.fn.now()
    // TODO: This most likely should be within the same day, not 24 hrs
    const oneDayBeforeCurrentReport = moment(timeOfReport).subtract(1, 'days').toISOString()

    const { minLat, maxLat, minLng, maxLng } = getBoundsOfDistance({
        latitude,
        longitude,
    }, 1)

    let raidId = ''
    let shouldRecalculateRaidCenter = false
    const existingRaid = await
        knex('raids')
            .where('createdAt', '>=', oneDayBeforeCurrentReport)
            .andWhereBetween('latitude', [minLat, maxLat])
            .andWhereBetween('longitude', [minLng, maxLng])
            .first()

    if (!existingRaid) {
        const newRaid = await createRaid(request)
        raidId = newRaid.id
    } else {
        raidId = existingRaid.id
        shouldRecalculateRaidCenter = true
    }

    const newReport = await knex('reports').insert({
        latitude,
        longitude,
        isSighting,
        raidId,
        startTime: timeOfReport
    }, [ 'id' ])

    if (comment) {
        await newComment({
            comment,
            reportId: newReport[0].id,
            raidId,
        })
    }

    if (shouldRecalculateRaidCenter) {
        await recalculateRaidCenter(raidId)
    }
}

module.exports =  {
    getRaids,
    newReport,
    newComment,
}
