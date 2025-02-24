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
      date: new Date(date).toISOString().split("T")[0],
      weight: exercise.weight ? parseFloat(exercise.weight) : null,
      reps: exercise.reps ? parseInt(exercise.reps, 10) : 10,
      duration: exercise.duration ? parseFloat(exercise.duration) : null,
      prs: exercise.prs || null,
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

export const getProgressDataChart = async (req, res) => {
  const { exercise_id } = req.params;

  try {
    const progressData = await knex("progress")
      .select("date")
      .select(
        knex.raw("SUM(weight * reps) / (COUNT(*) * 10) AS Normalized_Weight")
      )
      .select(knex.raw("SUM(duration * reps) / (COUNT(*)) AS Normalized_Time"))
      .whereRaw("LOWER(exercise_id) = LOWER(?)", [exercise_id.trim()])
      .groupBy("date");

    res.json(progressData);
  } catch (error) {
    console.error("Error fetching progress:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getLastFiveRecord = async (req, res) => {
  const { exercise_id } = req.params;

  try {
    const LastFiveRecord = await knex("progress")
      .select("date", "weight", "reps", "duration")
      .whereRaw("LOWER(exercise_id) = LOWER(?)", [exercise_id.trim()])
      .orderBy("date", "desc")
      .limit(5);

    res.json(LastFiveRecord);
  } catch (error) {
    console.error("Error fetching progress:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
