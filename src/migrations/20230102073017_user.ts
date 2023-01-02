import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', table => {
    table.increments('id');
    table.string('username', 255).notNullable();
    table.string('password', 255).notNullable();
    table.string('email', 255).notNullable();
    table.string('phone_number', 255).notNullable();
    table.string('first_name', 255).notNullable();
    table.string('last_name', 255).notNullable();
    table.boolean('verification_status').notNullable();
    table.dateTime('date_created').notNullable();
    table.dateTime('date_updated').notNullable();
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}