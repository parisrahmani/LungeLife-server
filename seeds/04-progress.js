import fs from "fs";

export async function seed(knex) {
  const data = JSON.parse(fs.readFileSync("seeds/data/progress.json", "utf8"));

  await knex("progress").del();
  await knex("progress").insert(data);
}
