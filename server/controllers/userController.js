import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";

const cookieConfig = {
  httpOnly: true,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  // sameSite: "None",
  // secure: true,
};

function createToken(_id) {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
}

function createRefreshToken(_id) {
  return jwt.sign({ _id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
}

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.login(email, password);

  const token = createToken(user._id);

  const refreshToken = createRefreshToken(user._id);

  res.cookie("jwtToken", token, cookieConfig);
  res.cookie("jwtRefreshToken", refreshToken, cookieConfig);
  res.status(200).json({ user, token });
});

const signupUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.signup(email, password);

  const token = createToken(user._id);

  const refreshToken = createRefreshToken(user._id);

  res.cookie("jwtToken", token, cookieConfig);
  res.cookie("jwtRefreshToken", refreshToken, cookieConfig);
  res.status(201).json({ user, token });
});

const refreshToken = asyncHandler(async (req, res, next) => {
  const { jwtRefreshToken } = req.cookies;

  if (!jwtRefreshToken) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  const { _id } = jwt.verify(jwtRefreshToken, process.env.JWT_REFRESH_SECRET);

  const user = await User.findOne({ _id });

  if (!user) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  const token = createToken(user._id);

  res.status(200).json({ token });
});

const logoutUser = asyncHandler(async (req, res, next) => {
  const { jwtToken, jwtRefreshToken } = req.cookies;

  if (!jwtToken && !jwtRefreshToken) {
    return res.status(204);
  }

  res.clearCookie("jwtToken", cookieConfig);
  res.clearCookie("jwtRefreshToken", cookieConfig);
  res.status(200).json({ msg: "Cookie cleared" });
});

export { loginUser, signupUser, refreshToken, logoutUser };
