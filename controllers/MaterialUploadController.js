// controllers/MaterialController.js

const Material = require("../model/Material");
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

// Create a new material
exports.createMaterial = async (req, res) => {
  try {
    const { fileName, creator, classId } = req.body;
    const file = req.files?.file;

    console.log(file);
    // Upload file to Cloudinary
    const cloudinaryResponse = await uploadFileToCloudinary(
      file,
      `MyClassroom/ClassMaterial/${classId}` // Store in a folder within MyClassroom/ClassMaterial with classId
    );

    // Save material details to database
    const material = new Material({
      fileName,
      cloudinaryLink: cloudinaryResponse.secure_url,
      creator,
      class: classId,
    });

    await material.save();

    res.status(201).json(material);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all materials
exports.getAllMaterial = async (req, res) => {
  try {
    // Retrieve all materials from the database
    const materials = await Material.find();

    res.status(200).json(materials);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getMaterialsByClassId = async (req, res) => {
  try {
    const { classId } = req.params;
    // Find materials that belong to the specified class
    const materials = await Material.find({ class: classId });
    res.status(200).json(materials);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a material
exports.deleteMaterial = async (req, res) => {
  try {
    const { materialId } = req.params;

    // Find the material by its ID
    const material = await Material.findById(materialId);

    if (!material) {
      return res.status(404).json({ error: "Material not found" });
    }

    // Extract the public ID from the Cloudinary URL
    const publicId = material.cloudinaryLink.split("/").pop().split(".")[0];

    // Delete the file from Cloudinary
    await deleteFileFromCloudinary(publicId);

    // Remove the material record from the database
    await material.deleteOne();

    res.status(200).json({ message: "Material deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
