const tableName = 'reports'
exports.up = async function(knex) {
    await knex.raw('create extension if not exists "uuid-ossp"')
    return knex.schema.createTable(tableName, table => {
        table.uuid('id').unique().defaultTo(knex.raw('uuid_generate_v4()'))
        table.float('latitude').notNullable()
        table.float('longitude').notNullable()
        table.string('locationName')
        table.boolean('isSighting').notNullable()
        table.timestamp('startTime').defaultTo(knex.fn.now()).notNullable()
        table.timestamp('endTime')
        table.integer('numberOfReports')
        table.integer('sourceId')
            .references('report_sources.id')
            .notNullable().defaultTo(1)
        table.uuid('raidId')
            .references('raids.id')
            .notNullable()
    })
};

exports.down = async function(knex) {
    return knex.schema.dropTable(tableName)
};
