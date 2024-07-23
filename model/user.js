// user.js

const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  admissionYear: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    required: true,
  },
  ClassCreated: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
  ],
  likedClasses: [{ type: mongoose.Schema.Types.ObjectId, ref: "LikedClass" }],
});

// Create the user model
const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
