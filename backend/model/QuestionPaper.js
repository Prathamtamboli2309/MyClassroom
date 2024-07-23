const mongoose = require("mongoose");

// Define the schema for a question paper
const questionPaperSchema = new mongoose.Schema({
  subjectName: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  examType: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  examName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  sem: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
});

// Create the model from the schema
const QuestionPaper = mongoose.model("QuestionPaper", questionPaperSchema);

// Export the model for use in other parts of the application
module.exports = QuestionPaper;
