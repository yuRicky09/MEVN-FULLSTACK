import express from "express";
import {
  loginUser,
  signupUser,
  logoutUser,
  refreshToken,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/login", loginUser);

router.post("/signup", signupUser);

router.post("/refresh", refreshToken);

router.post("/logout", logoutUser);

export { router };
