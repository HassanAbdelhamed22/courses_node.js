require("dotenv").config();

const express = require("express");
const coursesRouter = require("./routes/courses.route");
const { errorHandler } = require("./middleware/errorMiddleware");

const app = express();

app.use(express.json());

const mongoose = require("mongoose");
const { ERROR } = require("./utils/httpStatusText");
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const port = process.env.PORT || 3000;
app.use("/api/courses", coursesRouter);

// 404 handler
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.statusCode = 404;
  next(error);
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
