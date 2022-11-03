<script setup lang="ts">
import { getAllWorkouts } from "@/api/workout";
import { useWorkoutStore } from "@/stores/workout";

const workoutStore = useWorkoutStore();
try {
  workoutStore.workouts = await getAllWorkouts();
} catch (err) {
  console.log(err);
}

async function refresh() {
  const workouts = await getAllWorkouts();
  console.log("🚀 ~ file: Home.vue ~ line 14 ~ refresh ~ workouts", workouts);
}
</script>

<template>
  <div>
    <div>
      <button class="flex gap-2" @click="refresh">
        <i-bx-refresh /> refresh
      </button>
    </div>
    <div class="home">
      <div v-if="workoutStore.workoutTotal > 0" class="workouts">
        <WorkoutDetail
          v-for="workout in workoutStore.workouts"
          :key="workout.title"
          :workout="workout"
        />
      </div>
      <WorkoutForm />
    </div>
  </div>
</template>

<style scoped>
.home {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 100px;
}
</style>
