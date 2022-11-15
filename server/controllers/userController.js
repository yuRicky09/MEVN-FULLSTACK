import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";

const cookieConfig = {
  httpOnly: true,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

function createToken(_id) {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
}

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.login(email, password);

  const token = createToken(user._id);

  res.cookie("jwtToken", token, cookieConfig);
  res.status(200).json({ user, token });
});

const signupUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.signup(email, password);

  const token = createToken(user._id);

  res.cookie("jwtToken", token, cookieConfig);
  res.status(201).json({ user, token });
});

const logoutUser = asyncHandler(async (req, res, next) => {
  const { jwtToken } = req.cookies;

  if (!jwtToken) {
    return res.status(204);
  }

  res.clearCookie("jwtToken", cookieConfig);
  res.status(200).json({ msg: "Cookie cleared" });
});

export { loginUser, signupUser, logoutUser };
