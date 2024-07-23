const Announcement = require("../model/Announcement");

// Add a new announcement
exports.addAnnouncement = async (req, res) => {
  try {
    const { classId, creator, message } = req.body;

    const newAnnouncement = new Announcement({
      classId,
      creator,
      message,
    });

    await newAnnouncement.save();

    res.status(201).json({
      success: true,
      announcement: newAnnouncement,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Remove an announcement by ID
exports.removeAnnouncement = async (req, res) => {
  try {
    const { announcementId } = req.params;

    const deletedAnnouncement = await Announcement.findByIdAndDelete(
      announcementId
    );

    if (!deletedAnnouncement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Announcement deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get announcements by class ID
exports.getAnnouncementsByClassId = async (req, res) => {
  try {
    const { classId } = req.params;

    const announcements = await Announcement.find({ classId }).populate(
      "creator",
      "name email"
    );

    res.status(200).json({
      success: true,
      announcements,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get all announcements
exports.getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().populate(
      "creator",
      "name email"
    );

    res.status(200).json({
      success: true,
      announcements,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
