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
    console.log("Data being inserted:", data);

    // Manually stringify JSON fields if needed
    data.forEach((exercise) => {
      exercise.primary_muscles = JSON.stringify(exercise.primary_muscles);
      exercise.secondary_muscles = exercise.secondary_muscles
        ? JSON.stringify(exercise.secondary_muscles)
        : null;
      exercise.instructions = JSON.stringify(exercise.instructions);
      exercise.images = JSON.stringify(exercise.images);
    });

    // Deletes ALL existing entries
    await knex("exercises").del();

    // Insert data
    await knex("exercises").insert(data);
    console.log("Data inserted successfully!");
  } catch (error) {
    console.error("Error during seed insertion:", error);
  }
}
