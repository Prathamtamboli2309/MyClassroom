// controllers/ClassController.js

const Class = require("../model/Class");
const User = require("../model/user");
const Material = require("../model/Material");
const Like = require("../model/Like");
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

exports.createClass = async (req, res) => {
  try {
    // Data retrieval
    const { className, semester, year, classDesc, creator } = req.body;

    // Image file retrieval
    const imageFile = req.files?.imagefile;

    // Validate image type (if applicable)
    if (imageFile) {
      const supportedTypes = ["jpg", "png", "jpeg"];
      const fileType = imageFile.name.split(".").pop().toLowerCase();
      if (!supportedTypes.includes(fileType)) {
        return res.status(400).json({
          success: false,
          message: "Not Supported File Type",
        });
      }
    }

    // Image upload logic
    let imageUrl = "";
    if (imageFile) {
      const cloudinaryResponse = await uploadFileToCloudinary(
        imageFile,
        "MyClassroom/ClassImages"
      );
      imageUrl = cloudinaryResponse.secure_url;
    }

    // Create new class
    const newClass = new Class({
      className,
      semester,
      year,
      classDesc,
      imageUrl,
      creator,
    });

    // Save the new class
    await newClass.save();

    // Update the user who created the class
    const user = await User.findById(creator);
    if (user) {
      user.ClassCreated.push(newClass._id);
      await user.save();
    } else {
      console.error("User not found");
    }

    res.json({
      success: true,
      message: "Class created successfully",
      class: newClass,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Fetch all classes
exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.json({
      success: true,
      message: "Classes retrieved successfully",
      classes: classes,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Delete a class by ID
exports.deleteClass = async (req, res) => {
  try {
    const { classId } = req.params;

    // Check if the class exists
    const existingClass = await Class.findById(classId);
    if (!existingClass) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    // Delete related materials
    await Material.deleteMany({ classId });

    // Delete related likes
    await Like.deleteMany({ classId });

    // Remove class reference from users
    await User.updateMany(
      { classes: classId },
      { $pull: { classes: classId } }
    );

    // Delete the class
    await Class.deleteOne({ _id: classId });

    res.json({
      success: true,
      message: "Class and its related data deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
