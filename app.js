require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/error.middleware");
const cors = require("cors");

const app = express();

// CORS sozlamalari
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL, // Vercel yoki lokal frontend URL
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.static("static"));
app.use(fileUpload());

// Routes
app.use("/api/post", require("./routes/post.route"));
app.use("/api/auth", require("./routes/auth.route"));

// Error Middleware
app.use(errorMiddleware);

const bootstrap = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI) // .env dan o‘qiydi
      .then(() => console.log("Connected to DB"));
  } catch (error) {
    console.log(`Error connecting with DB: ${error}`);
  }
};

bootstrap();

module.exports = app; // Vercel uchun export qilish
