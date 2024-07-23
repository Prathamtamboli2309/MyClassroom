// LikeController.js

const LikedClass = require("../model/Like");
const User = require("../model/user");
const Class = require("../model/Class");

// Controller function to handle adding a like
const addLike = async (req, res) => {
  const { userId } = req.body;
  const { classId } = req.params;

  try {
    // Create a new entry in LikedClass model
    const likedClass = new LikedClass({ userId, classId });
    await likedClass.save();

    // Update User model to include the liked class reference
    await User.findByIdAndUpdate(userId, {
      $push: { likedClasses: likedClass._id },
    });

    // Update Class model to include the user reference
    await Class.findByIdAndUpdate(classId, {
      $push: { likedByUsers: likedClass._id },
    });

    res.status(200).json({ isLiked: true, likedClass });
  } catch (error) {
    res.status(500).json({ message: "Error adding like: " + error.message });
  }
};
const removeLike = async (req, res) => {
  const { userId } = req.body;
  const { classId } = req.params;

  try {
    console.log("Removing like for userId:", userId, "and classId:", classId);

    // Find and remove the liked class entry
    const likedClass = await LikedClass.findOneAndDelete({ userId, classId });

    if (!likedClass) {
      console.log("Liked class not found");
      return res.status(404).json({ message: "Liked class not found" });
    }

    // Update User model to remove the reference to the unliked class
    await User.findByIdAndUpdate(userId, {
      $pull: { likedClasses: likedClass._id },
    });

    // Update Class model to remove the reference to the unliking user
    await Class.findByIdAndUpdate(classId, {
      $pull: { likedByUsers: likedClass._id },
    });

    console.log("Like removed successfully");
    res.status(200).json({ isLiked: false, likedClass });
  } catch (error) {
    console.error("Error removing like:", error.message);
    res.status(500).json({ message: "Error removing like: " + error.message });
  }
};

// Controller function to retrieve liked classes for a user
const getLikedClasses = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find all liked class entries for the user
    const likedClasses = await LikedClass.find({ userId }).populate("classId");
    // Check if likedClasses are retrieved
    res.status(200).json({ data: likedClasses });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving liked classes: " + error.message });
  }
};

module.exports = { addLike, removeLike, getLikedClasses };
