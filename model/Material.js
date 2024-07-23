// models/Material.js

const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  cloudinaryLink: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model for the creator
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class", // Reference to the Class model
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Add more fields as needed
});

const Material = mongoose.model("Material", materialSchema);

module.exports = Material;
