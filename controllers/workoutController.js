import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

export async function getWorkoutTemplates(req, res) {
  try {
    const templates = await knex("workout_templates").select("*");
    res.json(templates);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching workout templates", error });
  }
}

export async function addWorkoutTemplate(req, res) {
  try {
    const { user_id, template_name, date, exercises, notes } = req.body;

    if (!user_id || !template_name || !date || !exercises) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const exercisesString = JSON.stringify(exercises);

    const [newTemplate] = await knex("workout_templates").insert(
      { user_id, template_name, date, exercises: exercisesString, notes },
      ["*"]
    );

    res.status(201).json(newTemplate);
  } catch (error) {
    res.status(500).json({ message: "Error adding workout template", error });
  }
}
