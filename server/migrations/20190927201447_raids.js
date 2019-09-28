const tableName = 'raids'
exports.up = function(knex) {
    return knex.schema.createTable(tableName, table => {
        table.uuid('id').unique()
        table.float('latitude')
        table.float('longitude')
        table.boolean('isVerified').defaultTo(false)
        table.timestamp('createdAt').defaultTo(knex.fn.now())
        table.timestamp('updatedAt').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable(tableName)
};
