require("dotenv").config();

const express = require("express");
const coursesRouter = require("./routes/courses.route");
const usersRouter = require("./routes/users.route");
const authRouter = require("./routes/auth.route");
const { errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");
const path = require("path");

const app = express();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors());

app.use(express.json());

const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const port = process.env.PORT || 3000;

app.use("/api/auth", authRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/users", usersRouter);

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
