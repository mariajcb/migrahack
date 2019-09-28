const knex = require('../knex')

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
    
}

module.exports =  {
    getRaids,
    newReport
}
