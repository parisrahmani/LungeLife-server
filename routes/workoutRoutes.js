import express from "express";
import {
  getWorkoutTemplates,
  addWorkoutTemplate,
  getWorkoutExercises,
  deleteTemplate,
  updateNote,
  getWorkoutTemplatesById,
} from "../controllers/workoutController.js";

const router = express.Router();

router.get("/", getWorkoutTemplates);

router.route("/each/:id").get(getWorkoutTemplatesById).put(updateNote);

router
  .route("/:id")
  //.get(getWorkoutTemplatesById)
  .get(getWorkoutExercises)
  //.put(updateNote)
  .delete(deleteTemplate);

router.post("/add", addWorkoutTemplate);

export default router;
