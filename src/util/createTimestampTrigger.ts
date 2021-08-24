import { Knex } from "knex"

export default (tableName: string, knex: Knex) => {
  return knex.raw(
    `
      CREATE TRIGGER set_timestamp
      BEFORE UPDATE ON ??
      FOR EACH ROW
      EXECUTE PROCEDURE trigger_set_timestamp();
    `,
    [tableName]
  )
}