const tableName = 'comments'
exports.up = function(knex) {
    return knex.schema.createTable(tableName, table => {
        table.uuid('id').unique()
        table.string('comment').notNullable()
        table.float('latitude')
        table.float('longitude')
        table.timestamp('createdAt').defaultTo(knex.fn.now())
        table.uuid('reportId')
            .references('reports.id')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable(tableName)
};

