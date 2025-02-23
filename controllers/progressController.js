import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

export async function addProgress(req, res) {
  console.log("Request received:", req.body);

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
    console.log("Formatted Records:", formattedRecords);
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

  console.log("Received exercise_id:", exercise_id); // Log received param

  try {
    const progressData = await knex("progress")
      .select("date")
      .select(
        knex.raw("SUM(weight * reps) / (COUNT(*) * 10) AS Normalized_Weight")
      )
      .select(knex.raw("SUM(duration * reps) / (COUNT(*)) AS Normalized_Time"))
      .whereRaw("LOWER(exercise_id) = LOWER(?)", [exercise_id.trim()])
      .groupBy("date");

    console.log("Query Result:", progressData); // Log the result
    res.json(progressData);
  } catch (error) {
    console.error("Error fetching progress:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getLastFiveRecord = async (req, res) => {
  const { exercise_id } = req.params;

  console.log("Received exercise_id:", exercise_id); // Log received param

  try {
    const LastFiveRecord = await knex("progress")
      .select("date", "weight", "reps", "duration")
      .whereRaw("LOWER(exercise_id) = LOWER(?)", [exercise_id.trim()])
      .limit(5);

    console.log("Query Result:", LastFiveRecord); // Log the result
    res.json(LastFiveRecord);
  } catch (error) {
    console.error("Error fetching progress:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// try {
//   const progressData = await knex("progress")
//     .select("exercise_id", "date")
//     .sum("weight as total_weight")
//     .sum("reps as total_reps")
//     .sum("duration as total_duration")
//     .count("* as sets")
//     .groupBy("exercise_id", "date")
//     .orderBy("date", "asc");

//   res.json(progressData);
// } catch (error) {
//   console.error("Error fetching progress data:", error);
//   res.status(500).json({ error: "Internal Server Error" });
// }
//};

// export async function addProgress(req, res) {
//   try {
//     //const { user_id, exercise_id, date, eachExerciseRecords } = req.body;
//     const { exercises } = req.body;

//     if (!Array.isArray(exercises) || exercises.length === 0) {
//       return res.status(400).json({ error: "Invalid request data" });
//     }

//     let allRecords = [];

//     exercises.forEach(({ user_id, exercise_id, date, eachExerciseRecords }) => {
//       if (
//         !user_id ||
//         !exercise_id ||
//         !eachExerciseRecords ||
//         !date ||
//         !Array.isArray(eachExerciseRecords) ||
//         eachExerciseRecords.length === 0
//       ) {
//         return res.status(400).json({ error: "Missing required fields" });
//       }

//       const formattedRecords = eachExerciseRecords.map((exercise) => ({
//         id: knex.raw("UUID()"),
//         user_id,
//         exercise_id,
//         date,
//         weight: exercise.weight,
//         reps: exercise.reps,
//         duration: exercise.duration,
//         prs: exercise.prs,
//       }));

//       allRecords = [...allRecords, ...formattedRecords];
//     });
//     await knex("progress").insert(allRecords);

//     res.status(201).json({ message: "Exercise records added successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error adding Exercise records", error });
//   }
// }
