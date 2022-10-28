import { defineStore } from "pinia";

import type { CreatedWorkout } from "@/types";

interface WorkoutState {
  workouts: CreatedWorkout[];
}

export const useWorkout = defineStore("workout", {
  state: (): WorkoutState => {
    return {
      workouts: [],
    };
  },
});
