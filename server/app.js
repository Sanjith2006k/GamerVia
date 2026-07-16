require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/games", require("./routes/gamesRoutes"));
app.get("/api/health", (req, res) => res.status(200).json({ status: "ok" }));

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

// Database Connection
const connectDB = async () => {
  try {
    if (process.env.MONGO_URI && !process.env.MONGO_URI.includes("<username>")) {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("MongoDB Connected");
    } else {
      console.log("MongoDB URI missing or using placeholder, skipping DB connection for now.");
    }
  } catch (error) {
    console.error("MongoDB Connection Error: ", error);
  }
};

connectDB();

module.exports = app;
