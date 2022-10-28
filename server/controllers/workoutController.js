import { Workout } from "../models/workoutModel.js";
import { asyncHandler, isValidObjectId } from "../utils/index.js";

const getAllWorks = asyncHandler(async (req, res, next) => {
  const workouts = await Workout.find({}).sort("-updatedAt");

  res.status(200).json({ data: workouts });
});

const getWork = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ msg: "Not Such Work!" });
  }
  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(400).json({ msg: "Not Such Work!" });
  }

  res.status(200).json({ data: workout });
});

const createWork = asyncHandler(async (req, res, next) => {
  const { title, reps, load } = req.body;
  const workout = await Workout.create({ title, reps, load });
  res.status(201).json({ data: workout });
});

const deleteWork = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ msg: "Not Such Work!" });
  }

  await Workout.findByIdAndDelete(id);
  res.status(204).json({
    data: null,
    status: "success",
  });
});

const updateWork = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { title, reps, load } = req.body;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ msg: "Not Such Work!" });
  }

  const workout = await Workout.findByIdAndUpdate(
    id,
    { title, reps, load },
    { returnDocument: "after" }
  );
  res.status(200).json({ data: workout, status: "success" });
});

export { getAllWorks, getWork, createWork, deleteWork, updateWork };
