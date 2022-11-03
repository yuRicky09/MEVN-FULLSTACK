import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";

const cookieConfig = {
  httpOnly: true,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};
const accessTokenExpireIn = 60000;

function createToken(_id) {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: accessTokenExpireIn,
  });
}

function createRefreshToken(_id) {
  return jwt.sign({ _id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "1d" });
}

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.login(email, password);

  const token = createToken(user._id);
  const refreshToken = createRefreshToken(user._id);

  res.cookie("jwtRefreshToken", refreshToken, cookieConfig);
  res.status(200).json({ user, token, accessTokenExpireIn });
});

const signupUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.signup(email, password);

  const token = createToken(user._id);
  const refreshToken = createRefreshToken(user._id);

  res.cookie("jwtRefreshToken", refreshToken, cookieConfig);
  res.status(201).json({ user, token, accessTokenExpireIn });
});

const logoutUser = asyncHandler(async (req, res, next) => {
  res.clearCookie("jwtRefreshToken", cookieConfig);

  res.status(204).json({ msg: "Cookie Cleared" });
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

  const token = createToken(_id);

  res.status(200).json({ user, token, accessTokenExpireIn });
});

export { loginUser, signupUser, logoutUser, refreshToken };
