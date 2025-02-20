import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

export async function addProgress(req, res) {
  try {
    const { user_id, exercise_id, date, exerciseRecords } = req.body;

    if (!user_id || !exercise_id || !exerciseRecords || !date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const formattedRecords = exerciseRecords.map((exercise) => ({
      id: knex.raw("UUID()"),
      user_id,
      exercise_id,
      date,
      weight: exercise.weight,
      reps: exercise.reps,
      sets: exercise.sets,
      duration: exercise.duration,
      prs: exercise.prs,
    }));
    await knex("progress").insert(formattedRecords);

    res.status(201).json({ message: "Exercise records added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding Exercise records", error });
  }
}

export const getProgressByUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const progress = await knex("progress").where({ user_id }).select("*");
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
