import express from "express";
import {
  getAllWorks,
  getWork,
  createWork,
  deleteWork,
  updateWork,
} from "../controllers/workoutController.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();

router.use(requireAuth);

router.get("/", getAllWorks);

router.get("/:id", getWork);

router.post("/", createWork);

router.delete("/:id", deleteWork);

router.patch("/:id", updateWork);

export { router };
