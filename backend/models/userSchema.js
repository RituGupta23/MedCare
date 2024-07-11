import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required!"],
    minLength: [3, "First name must be at least 3 characters long!"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required!"],
    minLength: [3, "Last name must be at least 3 characters long!"],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    validate: [validator.isEmail, "Please provide a valid email address!"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required!"],
    minLength: [10, "Phone number must be exactly 11 digits long!"],
    maxLength: [10, "Phone number must be exactly 11 digits long!"],
  },
  nic: {
    type: String,
    required: [true, "NIC is required!"],
    minLength: [12, "NIC must contain 12 digits!"],
    maxLength: [12, "NIC must contain 12 digits!"],
  },
  dob: {
    type: Date,
    required: [true, "DOB is required!"],
  },
  gender: {
    type: String,
    required: [true, "Gender is required!"],
    enum: ["Male", "Female", "Others", "TransGender"],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    minLength: [8, "Password Must Contain At Least 8 Characters!"],
    select: false,
  },
  role: {
    type: String,
    required: [true, "Role required!"],
    enum: ["Patient", "Doctor", "Admin"],
  },
  doctorDepartment:{
    type: String,
  },
  docAvatar: {
    public_id: String,
    url: String,
  },
});

// Save password when user modify it
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare password during login
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate token during login
userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const User = mongoose.model("User", userSchema);
