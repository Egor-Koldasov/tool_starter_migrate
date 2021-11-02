import { Knex } from "knex";
import createTimestampTrigger from "../util/createTimestampTrigger";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('auth', (table) => {
    table.text('token').primary();
    table.integer('user_id').index();
    table.foreign('user_id').references('id').inTable('app_user');
    table.timestamps(false, true);
  })
  await createTimestampTrigger('auth', knex)
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('auth');
}

