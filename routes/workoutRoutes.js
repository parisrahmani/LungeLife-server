import express from "express";
import {
  getWorkoutTemplates,
  addWorkoutTemplate,
  getWorkoutExercises,
} from "../controllers/workoutController.js";

const router = express.Router();

router.get("/", getWorkoutTemplates);
router.get("/:id", getWorkoutExercises);
router.post("/add", addWorkoutTemplate);

export default router;
