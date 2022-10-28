<script setup lang="ts">
import { deleteWorkout } from "@/api/workout";
import { useWorkout } from "@/stores/workout";
import { formatDistanceToNow } from "date-fns";
import { zhTW } from "date-fns/locale";

defineProps<{
  workout: {
    title: string;
    load: number;
    reps: number;
    createdAt: Date;
    _id: string;
  };
}>();

const workoutStore = useWorkout();

async function handleDelete(id: string) {
  try {
    await deleteWorkout(id);
    workoutStore.workouts = workoutStore.workouts.filter(
      (workout) => workout._id !== id
    );
  } catch (err) {
    console.log(err);
  }
}
</script>

<template>
  <div className="workout-details">
    <h4>{{ workout.title }}</h4>
    <p><strong>Load (kg): </strong>{{ workout.load }}</p>
    <p><strong>Number of reps: </strong>{{ workout.reps }}</p>
    <p>
      {{
        formatDistanceToNow(new Date(workout.createdAt), {
          addSuffix: true,
          locale: zhTW,
        })
      }}
    </p>
    <span @click="handleDelete(workout._id)"
      ><i-bx-trash class="text-2xl"
    /></span>
  </div>
</template>

<style scoped>
.workout-details {
  background: #fff;
  border-radius: 4px;
  margin: 20px auto;
  padding: 20px;
  position: relative;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.05);
}
.workout-details h4 {
  margin: 0 0 10px 0;
  font-size: 1.2em;
  color: var(--primary);
}
.workout-details p {
  margin: 0;
  font-size: 0.9em;
  color: #555;
}
.workout-details span {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  background: #f1f1f1;
  padding: 6px;
  border-radius: 50%;
  color: #333;
}
</style>
