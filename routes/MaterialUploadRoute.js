// classRouter.js

const express = require("express");
const {
  createMaterial,
  getAllMaterial,
  getMaterialsByClassId,
  deleteMaterial,
} = require("../controllers/MaterialUploadController"); // Import register and getUser functions from the controller file

const materialUploadRouter = express.Router();

// Route for class  registration
materialUploadRouter.post("/upload", createMaterial);

//get all class
materialUploadRouter.get("/getallmaterial", getAllMaterial);

//for class
materialUploadRouter.get("/:classId", getMaterialsByClassId);

//delete material
materialUploadRouter.delete("/:materialId", deleteMaterial);

module.exports = materialUploadRouter;
