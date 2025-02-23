import express from "express";
import {
  getWorkoutTemplates,
  addWorkoutTemplate,
  getWorkoutExercises,
  deleteTemplate,
  updateTemplate,
} from "../controllers/workoutController.js";

const router = express.Router();

router.get("/", getWorkoutTemplates);

router
  .route("/:id")
  .get(getWorkoutExercises)
  .put(updateTemplate)
  .delete(deleteTemplate);

router.post("/add", addWorkoutTemplate);

export default router;
