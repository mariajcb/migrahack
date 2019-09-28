const knex = require('../knex')

const runQuery = async () => {
    const data = await knex.raw('SELECT * from raids')
    console.log(data)
    await knex.raw()
}

runQuery()
