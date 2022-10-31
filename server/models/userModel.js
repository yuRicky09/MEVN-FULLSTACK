import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// static method
userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw new Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Email not valid!");
  }

  if (!validator.isLength(password, { min: 4, max: undefined })) {
    throw new Error("Password must have 4 character!");
  }

  const isExist = await this.findOne({ email });

  if (isExist) {
    throw new Error("Email already in use!");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hashPassword });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("Email or Password not correct!");
  }

  const match = bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Email or Password not correct!");
  }

  return user;
};

export const User = mongoose.model("User", userSchema);
