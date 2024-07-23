// index.js

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database"); // Import the connectDB function
const UserRouter = require("./routes/UserRoute");
const classRouter = require("./routes/ClassRoute");
const fileUpload = require("express-fileupload");
const materialUploadRouter = require("./routes/MaterialUploadRoute");
const likeRouter = require("./routes/LikeRoute");
const Announcementrouter = require("./routes/AnnouncementRoute");
const QuestionPaperrouter = require("./routes/QuestionPaperRoute");

const app = express();
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

const port = 3001; // Port number where your server will run

// Set middleware
app.use(express.json());
app.use(cors()); // Correctly initialize the cors middleware

// Connect with database
connectDB();

// Set router
app.use("/api/user", UserRouter);
app.use("/api/class", classRouter);
app.use("/api/material", materialUploadRouter);
app.use("/api/like", likeRouter);
app.use("/api/announcement", Announcementrouter);
app.use("/api/questionpapers", QuestionPaperrouter);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
