// classRouter.js

const express = require("express");
const {
  createClass,
  getAllClasses,
  deleteClass,
} = require("../controllers/ClassController"); // Import register and getUser functions from the controller file

const classRouter = express.Router();

// Route for class  registration
classRouter.post("/createclass", createClass);

//get all class
classRouter.get("/getallclass", getAllClasses);

//delewte class
classRouter.delete("/:classId", deleteClass);

module.exports = classRouter;
