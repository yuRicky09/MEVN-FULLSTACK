import express from "express";
import { loginUser, signupUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/login", loginUser);

router.post("/signup", signupUser);

export { router };
