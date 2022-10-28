export interface Workout {
  title: string;
  reps: number;
  load: number;
}

export interface CreatedWorkout extends Workout {
  createdAt: Date;
  _id: string;
}
