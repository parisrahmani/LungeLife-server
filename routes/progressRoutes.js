import express from "express";
import {
  addProgress,
  getProgressByUser,
  getProgressDataChart,
  getLastFiveRecord,
} from "../controllers/progressController.js";

const router = express.Router();

router.post("/", addProgress);
router.get("/:user_id", getProgressByUser);
router.get("/exercise/:exercise_id", getProgressDataChart);
router.get("/history/:exercise_id", getLastFiveRecord);

export default router;
