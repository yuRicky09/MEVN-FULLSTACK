import mongoose from "mongoose";

const workoutSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    reqs: {
      type: Number,
    },
    load: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Workout = mongoose.model("Workout", workoutSchema);

export { Workout };
