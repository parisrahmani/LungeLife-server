import express from "express";
import {
  createProgress,
  getProgressByUser,
} from "../controllers/progressController.js";

const router = express.Router();

router.post("/progress", createProgress);
router.get("/progress/:user_id", getProgressByUser);

export default router;
