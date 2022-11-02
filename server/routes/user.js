import express from "express";
import {
  loginUser,
  signupUser,
  refreshToken,
  logoutUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/login", loginUser);

router.post("/signup", signupUser);

router.post("/logout", logoutUser);

router.get("/refresh", refreshToken);

export { router };
