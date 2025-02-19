/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

import fs from "fs";

export async function seed(knex) {
  const data = JSON.parse(fs.readFileSync("seeds/data/users.json", "utf8"));

  console.log("Seeding users:", data);

  data.forEach((user) => {
    user.preferences = JSON.stringify(user.preferences);
  });

  await knex("users").del();
  await knex("users").insert(data);
}
