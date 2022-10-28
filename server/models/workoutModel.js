import mongoose from "mongoose";

const workoutSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    reps: {
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
