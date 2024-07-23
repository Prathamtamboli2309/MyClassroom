// likeRouter.js

const express = require("express");
const {
  addLike,
  removeLike,
  getLikedClasses,
} = require("../controllers/LikeController");

const likeRouter = express.Router();

// Route to add a like
likeRouter.post("/:classId/like", addLike);

// Route to remove a like
likeRouter.post("/:classId/unlike", removeLike);

// Route to get all liked classes
likeRouter.get("/getlikeclass/:userId", getLikedClasses);

module.exports = likeRouter;
