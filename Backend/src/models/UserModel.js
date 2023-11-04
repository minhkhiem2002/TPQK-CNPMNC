const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    role: {
      type: String,
      enum: ["manager", "user", "finance"],
      default: "user",
    },
    department: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
