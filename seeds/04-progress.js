import fs from "fs";

export async function seed(knex) {
  const data = JSON.parse(fs.readFileSync("seeds/data/progress.json", "utf8"));

  console.log("Seeding progress:", data);

  await knex("progress").del();
  await knex("progress").insert(data);
}
