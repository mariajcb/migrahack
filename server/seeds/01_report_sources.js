exports.seed = function(knex) {
  return knex('report_sources').del()
    .then(function () {
      return knex('report_sources').insert([
        {name: 'Personal Account'},
        {name: 'TRAC (Transactional Records Access Clearinghouse)'},
      ]);
    });
};
