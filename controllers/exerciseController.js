import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

export const getExercises = async (req, res) => {
  try {
    const exercises = await knex("exercises").select("*");
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ message: "Error fetching exercises", error });
  }
};

// Fetch an exercise by ID
export const getExerciseById = async (req, res) => {
  try {
    const { id } = req.params;
    const exercise = await knex("exercises").where({ id }).first();

    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    res.json(exercise);
  } catch (error) {
    res.status(500).json({ message: "Error fetching exercise", error });
  }
};
