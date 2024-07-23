const QuestionPaper = require("../model/QuestionPaper");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDE_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Helper function to upload file to Cloudinary
async function uploadFileToCloudinary(file, folder) {
  const options = { folder };
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// Helper function to delete file from Cloudinary
async function deleteFileFromCloudinary(publicId) {
  return await cloudinary.uploader.destroy(publicId);
}

// Create a new question paper
exports.createQuestionPaper = async (req, res) => {
  try {
    const { subjectName, creator, examType, year, examName, sem } = req.body;
    const file = req.files?.file;

    console.log(file);
    // Upload file to Cloudinary
    const cloudinaryResponse = await uploadFileToCloudinary(
      file,
      `MyClassroom/QuestionPapers/${sem}` // Store in a folder within MyClassroom/QuestionPapers with sem
    );

    // Save question paper details to database
    const questionPaper = new QuestionPaper({
      subjectName,
      creator,
      examType,
      year,
      examName,
      sem,
      file: cloudinaryResponse.secure_url,
    });

    await questionPaper.save();

    res.status(201).json(questionPaper);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all question papers
exports.getAllQuestionPapers = async (req, res) => {
  try {
    // Retrieve all question papers from the database
    const questionPapers = await QuestionPaper.find();

    res.status(200).json(questionPapers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get question papers by semester
exports.getQuestionPapersBySem = async (req, res) => {
  try {
    const { sem } = req.params;
    // Find question papers that belong to the specified semester
    const questionPapers = await QuestionPaper.find({ sem });
    res.status(200).json(questionPapers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a question paper
exports.deleteQuestionPaper = async (req, res) => {
  try {
    const { questionPaperId } = req.params;

    // Find the question paper by its ID
    const questionPaper = await QuestionPaper.findById(questionPaperId);

    if (!questionPaper) {
      return res.status(404).json({ error: "Question paper not found" });
    }

    // Extract the public ID from the Cloudinary URL
    const publicId = questionPaper.file.split("/").pop().split(".")[0];

    // Delete the file from Cloudinary
    await deleteFileFromCloudinary(publicId);

    // Remove the question paper record from the database
    await questionPaper.deleteOne();

    res.status(200).json({ message: "Question paper deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
