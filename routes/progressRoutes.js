import express from "express";
import {
  addProgress,
  getProgressByUser,
} from "../controllers/progressController.js";

const router = express.Router();

router.post("/", addProgress);
router.get("/:user_id", getProgressByUser);

export default router;
