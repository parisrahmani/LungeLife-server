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
