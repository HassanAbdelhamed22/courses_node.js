const express = require("express");
const coursesRouter = require("./routes/courses.route");

const app = express();

app.use(express.json());

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/courses")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const port = 3000;

app.use("/api/courses", coursesRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
