import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";

function createToken(_id) {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
}

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.login(email, password);

  const token = createToken(user._id);

  res.status(200).json({ user, token });
});

const signupUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.signup(email, password);

  const token = createToken(user._id);

  res.status(201).json({ user, token });
});

export { loginUser, signupUser };
