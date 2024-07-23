const mongoose = require("mongoose");

// Define schema for liked class object
const likedClassSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
  createdAt: { type: Date, default: Date.now },
});

// Create model based on schema
const LikedClass = mongoose.model("LikedClass", likedClassSchema);

module.exports = LikedClass;
