const tableName = 'raids'
exports.up = async function(knex) {
    await knex.raw('create extension if not exists "uuid-ossp"')
    return knex.schema.createTable(tableName, table => {
        table.uuid('id').unique().defaultTo(knex.raw('uuid_generate_v4()'))
        table.float('latitude')
        table.float('longitude')
        table.boolean('hasAccumulatedReport').defaultTo(false)
        table.boolean('isVerified').defaultTo(false)
        table.integer('sourceId')
            .references('report_sources.id')
        table.timestamp('createdAt').defaultTo(knex.fn.now())
        table.timestamp('updatedAt').defaultTo(knex.fn.now())
    })
};

exports.down = async function(knex) {
    return knex.schema.dropTable(tableName)
};
