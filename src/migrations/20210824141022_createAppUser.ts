import { Knex } from "knex";
import createTimestampTrigger from "../util/createTimestampTrigger";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('app_user', (table) => {
    table.increments();
    table.text('email').notNullable();
    table.text('password').notNullable();
    table.timestamps(false, true);
  });
  await createTimestampTrigger('app_user', knex);
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('app_user');
}

