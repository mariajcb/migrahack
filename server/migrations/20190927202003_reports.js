const tableName = 'reports'
exports.up = function(knex) {
    return knex.schema.createTable(tableName, table => {
        table.uuid('id').unique()
        table.string('latitude').notNullable()
        table.string('longitude').notNullable()
        table.string('locationName')
        table.boolean('isSighting').notNullable()
        table.boolean('isVerified').defaultTo(false)
        table.timestamp('startTime').defaultTo(knex.fn.now()).notNullable()
        table.timestamp('endTime')
        table.integer('numberOfReports')
        table.uuid('sourceId')
            .references('report_sources.id')
            .notNullable()
        table.uuid('raidId')
            .references('raids.id')
            .notNullable()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable(tableName)
};
