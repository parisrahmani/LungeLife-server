import express from "express";
import {
  getWorkoutTemplates,
  addWorkoutTemplate,
} from "../controllers/workoutController.js";

const router = express.Router();

router.get("/", getWorkoutTemplates);
router.post("/add", addWorkoutTemplate);

export default router;
