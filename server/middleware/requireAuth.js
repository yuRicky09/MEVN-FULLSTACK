import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const requireAuth = asyncHandler(async (req, res, next) => {
  const { jwtToken } = req.cookies;

  const { _id } = jwt.verify(jwtToken, process.env.JWT_SECRET);
  const user = await User.findById(_id).select("_id");
  req.user = user;

  next();
});
