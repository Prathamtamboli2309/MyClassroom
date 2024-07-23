const express = require("express");
const Announcementrouter = express.Router();
const announcementController = require("../controllers/AnnouncementController");

// Add a new announcement
Announcementrouter.post("/add", announcementController.addAnnouncement);

// Remove an announcement by ID
Announcementrouter.delete(
  "/:announcementId",
  announcementController.removeAnnouncement
);

// Get announcements by class ID
Announcementrouter.get(
  "/class/:classId",
  announcementController.getAnnouncementsByClassId
);

// Get all announcements
Announcementrouter.get("/", announcementController.getAllAnnouncements);

module.exports = Announcementrouter;
