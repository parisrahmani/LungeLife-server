/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export function up(knex) {
  return knex.schema.createTable("progress", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
    table.uuid("user_id").notNullable();
    table.string("exercise_id").notNullable();
    table.date("date").notNullable();
    table.float("weight").nullable();
    table.integer("reps").notNullable();
    table.integer("sets").notNullable();
    table.float("duration").nullable();
    table.string("prs").nullable(); // Personal Records

    // Foreign keys
    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .foreign("exercise_id")
      .references("id")
      .inTable("exercises")
      .onDelete("CASCADE");
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export function down(knex) {
  return knex.schema.dropTable("progress");
}
