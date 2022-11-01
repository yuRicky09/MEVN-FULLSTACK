import { request } from "../request";

import type { Workout, CreatedWorkout } from "@/types";

const getAllWorkouts = async () => {
  try {
    const { data } = await request.get<{ workouts: CreatedWorkout[] }>(
      "/workouts"
    );
    return data.workouts;
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      if (typeof err.message === "string") throw new Error(err.message);
    }

    throw new Error("Cannot get workouts");
  }
};

const createWorkout = async (workout: Workout) => {
  const { data } = await request.post<{ workout: CreatedWorkout }>(
    "/workouts",
    workout
  );

  return data.workout;
};

const deleteWorkout = async (id: string) => {
  try {
    await request.delete(`/workouts/${id}`);
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      if (typeof err.message === "string") throw new Error(err.message);
    }

    throw new Error("Delete workout failed");
  }
};

export { getAllWorkouts, createWorkout, deleteWorkout };
