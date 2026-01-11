/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name', 255).notNullable();
    table.string('email', 255).notNullable().unique();
    table.string('password', 255).notNullable();
    table.integer('age').unsigned().notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    
    table.index('email');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};

// exports.up = function (knex) {
//   return knex.schema.table("users", (table) => {
//     table.string("password", 255).notNullable();
//   });
// };

// exports.down = function (knex) {
//   return knex.schema.table("users", (table) => {
//     table.dropColumn("password");
//   });
// };
