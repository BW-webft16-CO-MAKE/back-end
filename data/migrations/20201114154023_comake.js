exports.up = function(knex) {
    return knex.schema
    .createTable('users', tbl => {
        tbl.increments();
        tbl.string('first_name')
            .notNullable()
        tbl.string('last_name')
            .notNullable()
        tbl.string('email')
            .notNullable()
            .unique()
        tbl.string('username')
            .notNullable()
            .unique()
        tbl.string('password')
            .notNullable()
    })
    .createTable('posts', tbl => {
        tbl.increments();
        tbl.string('post_name')
            .notNullable();
        tbl.string('post_description')
            .notNullable();
        tbl.string('post_location')
            .notNullable();
        tbl.integer('upvotes')
        tbl.integer('user_id')
            .unsigned()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
    });
    
  };

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('posts')
    .dropTableIfExists('users')
};