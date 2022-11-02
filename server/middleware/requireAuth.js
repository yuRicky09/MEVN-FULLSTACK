import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const requireAuth = asyncHandler(async (req, res, next) => {
  // const { authorization } = req.headers;

  // if (!authorization) {
  //   return res.status(401).send({
  //     msg: "Authorization token required",
  //   });
  // }

  // const token = authorization.split(" ")[1];
  const { jwtToken } = req.cookies;
  console.log(
    "🚀 ~ file: requireAuth.js ~ line 16 ~ requireAuth ~ req.cookies",
    req.cookies
  );
  const { _id } = jwt.verify(jwtToken, process.env.JWT_SECRET);
  const user = await User.findById(_id).select("_id");
  req.user = user;

  next();
});
