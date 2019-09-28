const tableName = 'comments'
exports.up = async function(knex) {
    await knex.raw('create extension if not exists "uuid-ossp"')
    return knex.schema.createTable(tableName, table => {
        table.uuid('id').unique().defaultTo(knex.raw('uuid_generate_v4()'))
        table.string('comment').notNullable()
        table.float('latitude')
        table.float('longitude')
        table.timestamp('createdAt').defaultTo(knex.fn.now())
        table.uuid('reportId')
            .references('reports.id')
        table.uuid('raidId')
            .references('raids.id')
            .notNullable()
    })
};

exports.down = async function(knex) {
    return knex.schema.dropTable(tableName)
};

