import { Workout } from "../models/workoutModel.js";
import { asyncHandler, isValidObjectId } from "../utils/index.js";

const getAllWorks = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const workouts = await Workout.find({ user_id: _id }).sort("-updatedAt");

  res.status(200).json({ workouts });
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
  const { _id } = req.user;
  const workout = await Workout.create({ title, reps, load, user_id: _id });
  res.status(201).json({ workout });
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
  res.status(200).json({ workout });
});

export { getAllWorks, getWork, createWork, deleteWork, updateWork };
