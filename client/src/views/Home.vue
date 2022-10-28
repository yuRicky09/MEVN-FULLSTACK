<script setup lang="ts">
import { getAllWorkouts } from "@/api/workout";
import { useWorkout } from "@/stores/workout";

const workoutStore = useWorkout();
try {
  workoutStore.workouts = await getAllWorkouts();
} catch (err) {
  console.log(err);
}
</script>

<template>
  <div class="home">
    <div class="workouts">
      <WorkoutDetail
        v-for="workout in workoutStore.workouts"
        :key="workout.title"
        :workout="workout"
      />
    </div>
    <WorkoutForm />
  </div>
</template>

<style scoped>
.home {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 100px;
}
</style>
