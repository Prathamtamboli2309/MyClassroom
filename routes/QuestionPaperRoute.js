const express = require("express");
const QuestionPaperrouter = express.Router();
const {
  createQuestionPaper,
  getAllQuestionPapers,
  getQuestionPapersBySem,
  deleteQuestionPaper,
} = require("../controllers/QuestionPaperController");

// Create a new question paper
QuestionPaperrouter.post("/create", createQuestionPaper);

// Get all question papers
QuestionPaperrouter.get("/", getAllQuestionPapers);

// Get question papers by semester
QuestionPaperrouter.get("/sem/:sem", getQuestionPapersBySem);

// Delete a question paper
QuestionPaperrouter.delete("/:questionPaperId", deleteQuestionPaper);

module.exports = QuestionPaperrouter;
