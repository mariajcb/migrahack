const tableName = 'report_sources'
exports.up = function(knex) {
    return knex.schema.createTable(tableName, table => {
        table.integer('id').unique()
        table.string('name')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable(tableName)
};
