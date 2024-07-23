// userRouter.js

const express = require("express");
const { register, getUser, login } = require("../controllers/UserController"); // Import register and getUser functions from the controller file

const userRouter = express.Router();

// Route for user registration
userRouter.post("/register", register);

//Route for login
userRouter.post("/login", login);

module.exports = userRouter;
