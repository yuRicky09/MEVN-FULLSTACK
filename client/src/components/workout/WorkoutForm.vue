<script setup lang="ts">
import { createWorkout } from "@/api/workout";
import { useWorkoutStore } from "@/stores/workout";

const error = ref("");
const title = ref("");
const load = ref(0);
const reps = ref(0);
const workoutStore = useWorkoutStore();

async function handleSubmit() {
  try {
    const workout = await createWorkout({
      title: title.value,
      load: load.value,
      reps: reps.value,
    });

    resetForm();
    workoutStore.workouts = [workout, ...workoutStore.workouts];
  } catch (err) {
    if (err instanceof Error) {
      error.value = err.message;
    }

    error.value = "Create Workout Failed";
  }
}

function resetForm() {
  title.value = "";
  load.value = 0;
  reps.value = 0;
  error.value = "";
}
</script>

<template>
  <form class="create" @submit.prevent="handleSubmit">
    <h3>Add a New Workout</h3>

    <label>Exercise Title:</label>
    <input v-model="title" type="text" />

    <label>Load (in kg):</label>
    <input v-model="load" type="number" />

    <label>Number of Reps:</label>
    <input v-model="reps" type="number" />

    <button>Add Workout</button>
    <div v-if="error" class="error">{{ error }}</div>
  </form>
</template>

<style scoped>
label,
input {
  display: block;
}
input {
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}
form button {
  background: var(--primary);
  border: 0;
  color: #fff;
  padding: 10px;
  font-family: "Poppins";
  border-radius: 4px;
  cursor: pointer;
}
div.error {
  padding: 10px;
  background: #ffefef;
  border: 1px solid var(--error);
  color: var(--error);
  border-radius: 4px;
  margin: 20px 0;
}
</style>
