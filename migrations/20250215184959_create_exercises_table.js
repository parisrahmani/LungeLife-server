/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export function up(knex) {
  return knex.schema.createTable("exercises", (table) => {
    table.string("id").primary();
    table.string("name").notNullable();
    table.enu("force", ["push", "pull", "static"]).nullable();
    table.enu("level", ["beginner", "intermediate", "expert"]).notNullable();
    table.string("mechanic").nullable();
    table.string("equipment").nullable();
    table.json("primary_muscles").nullable();
    table.json("secondary_muscles").nullable();
    table.json("instructions").nullable();
    table
      .enu("category", [
        "strength",
        "stretching",
        "cardio",
        "plyometrics",
        "strongman",
        "powerlifting",
        "olympic weightlifting",
      ])
      .nullable();

    table.json("images").nullable();
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export function down(knex) {
  return knex.schema.dropTable("exercises");
}
