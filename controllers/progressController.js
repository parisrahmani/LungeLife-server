import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

export const createProgress = async (req, res) => {
  try {
    const { user_id, exercise_id, date, weight, reps, sets, prs } = req.body;
    const [progress] = await knex("progress").insert(
      {
        id: knex.raw("UUID()"),
        user_id,
        exercise_id,
        date,
        weight,
        reps,
        sets,
        prs,
      },
      ["id", "user_id", "exercise_id", "date"]
    );
    res.status(201).json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProgressByUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const progress = await knex("progress").where({ user_id }).select("*");
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
