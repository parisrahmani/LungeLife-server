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

export async function getWorkoutTemplatesById(req, res) {
  try {
    const { id } = req.params;
    const templates = await knex("workout_templates").where({ id });
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

export async function getWorkoutExercises(req, res) {
  try {
    const { id } = req.params;
    console.log("Received ID:", id);

    if (!id) {
      return res.status(400).json({ message: "Template ID is required" });
    }

    const template = await knex("workout_templates").where({ id: id }).first();
    console.log(template.exercises);
    const exercises = await knex("exercises").whereIn("id", template.exercises);

    res.json(exercises);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching workout exercises", error });
  }
}

export async function deleteTemplate(req, res) {
  const { id } = req.params;
  try {
    const rowDeleted = await knex("workout_templates").where({ id }).delete();

    if (rowDeleted === 0) {
      return res
        .status(404)
        .json({ message: `Template with ID ${id} not found` });
    }

    res.sendStatus(204);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Unable to delete the template; ${error}` });
  }
}
export async function updateNote(req, res) {
  const { id } = req.params;
  const { notes } = req.body;

  console.log("Updating template with ID:", id); // Log the ID
  console.log("New notes:", notes); // Log the new notes value

  try {
    const updatedNotes = await knex("workout_templates")
      .where({ id })
      .update({ notes });

    if (!updatedNotes.length === 0) {
      return res.status(404).json({ error: "Template not found" });
    }

    const updatedRow = await knex("workout_templates").where({ id }).first();

    res.json(updatedRow);
  } catch (error) {
    console.error("Error updating notes:", error); // Log the error
    res.status(500).json({ error: "Internal server error" });
  }
}

// export async function updateTemplate(req, res) {
//   const { id } = req.params;
//   const { user_id, template_name, exercises, notes, date } = req.body;

//   try {
//     if (!user_id || !template_name || !exercises || !date) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     const existingTemplate = await knex("workout_templates")
//       .where({ id })
//       .first();
//     if (!existingTemplate) {
//       return res
//         .status(404)
//         .json(`Could not find a template with id:${req.params.id} to update`);
//     }

//     await knex("workout_templates")
//       .where({ id })
//       .update({
//         user_id,
//         template_name,
//         exercises: JSON.stringify(exercises),
//         notes,
//         date,
//       });

//     const updatedTemplate = await knex("workout_templates")
//       .where({ id })
//       .first();
//     res.status(200).json(updatedTemplate);
//   } catch (err) {
//     console.log(`Error updating template with id: ${id}`);
//     res.status(500).send(`Error updating template with id: ${id}`);
//   }
// }
