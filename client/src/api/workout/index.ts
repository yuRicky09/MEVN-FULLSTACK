import { request } from "../request";

import type { Workout, CreatedWorkout } from "@/types";

interface AxiosResponse<T> {
  data: T;
}

const getAllWorkouts = async () => {
  try {
    const {
      data: { data: workouts },
    } = await request.get<AxiosResponse<CreatedWorkout[]>>("/workouts");
    return workouts;
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      if (typeof err.message === "string") throw new Error(err.message);
    }

    throw new Error("Cannot get workouts");
  }
};

const createWorkout = async (workout: Workout) => {
  try {
    const {
      data: { data: newWorkout },
    } = await request.post<AxiosResponse<CreatedWorkout>>("/workouts", workout);
    return newWorkout;
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      if (typeof err.message === "string") throw new Error(err.message);
    }

    throw new Error("Create workout failed");
  }
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
