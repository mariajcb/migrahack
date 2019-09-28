exports.seed = function(knex) {
  return knex('report_sources').del()
    .then(function () {
      return knex('report_sources').insert([
        {id: 1, name: 'Personal Account'},
        {id: 2, name: 'TRAC (Transactional Records Access Clearinghouse)'},
      ]);
    });
};
