import { defineStore } from "pinia";

import type { CreatedWorkout } from "@/types";

interface WorkoutState {
  workouts: CreatedWorkout[];
}

export const useWorkoutStore = defineStore("workout", {
  state: (): WorkoutState => {
    return {
      workouts: [],
    };
  },
  getters: {
    workoutTotal(state) {
      return state.workouts.length;
    },
  },
});
