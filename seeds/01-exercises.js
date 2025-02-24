/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

import fs from "fs";

export async function seed(knex) {
  try {
    const data = JSON.parse(
      fs.readFileSync("seeds/data/exercises.json", "utf8")
    );

    data.forEach((exercise) => {
      exercise.primary_muscles = JSON.stringify(exercise.primary_muscles);
      exercise.secondary_muscles = exercise.secondary_muscles
        ? JSON.stringify(exercise.secondary_muscles)
        : null;
      exercise.instructions = JSON.stringify(exercise.instructions);
      exercise.images = JSON.stringify(exercise.images);
    });

    await knex("exercises").del();

    await knex("exercises").insert(data);
  } catch (error) {
    console.error("Error during seed insertion:", error);
  }
}
