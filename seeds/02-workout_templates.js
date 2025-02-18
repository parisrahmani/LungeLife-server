/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

import fs from "fs";

export async function seed(knex) {
  const data = JSON.parse(
    fs.readFileSync("seeds/data/workout_templates.json", "utf8")
  );

  console.log("Seeding workout templates:", data);

  data.forEach((template) => {
    template.exercises = JSON.stringify(template.exercises);
  });

  await knex("workout_templates").del();
  await knex("workout_templates").insert(data);
}
