import dotenv from "dotenv";
import express from "express";
import { router as workoutRouter } from "./routes/workouts.js";
import { router as userRouter } from "./routes/user.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);

  next();
});

app.use("/api/workouts", workoutRouter);
app.use("/api/users", userRouter);

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => [
      console.log("listening on prot", process.env.PORT),
    ]);
  })
  .catch((err) => {
    console.log(err);
  });
