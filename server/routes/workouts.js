import express from "express";
import { Workout } from "../models/workoutModel.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send({ msg: "get all works" });
});

router.get("/:id", (req, res) => {
  res.send({ msg: "get single work" });
});

router.post("/", async (req, res) => {
  try {
    const { title, reqs, load } = req.body;
    const workout = await Workout.create({
      title,
      reqs,
      load,
    });

    res.status(201).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", (req, res) => {
  res.send({ msg: "delete work" });
});

router.patch("/:id", (req, res) => {
  res.send({ msg: "update work" });
});

export { router };
