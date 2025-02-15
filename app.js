require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/error.middleware");
const cors = require("cors");

const app = express();

app.use(
  cors({
    // credentials: true,
    // origin: process.env.CLIENT_URL,
    // credentials: true,
    // origin: "*",
  })
);
app.use(express.json());
app.use(cookieParser({}));
app.use(express.static("static"));
app.use(fileUpload({}));

// Routes
app.use("/api/post", require("./routes/post.route"));
app.use("/api/auth", require("./routes/auth.route"));

app.use(errorMiddleware);

const PORT = process.env.PORT || 8080;

const bootstrap = async () => {
  try {
    await mongoose
      .connect(
        "mongodb+srv://info:EBeNQjKK3MXAGYvH@advanced-backend.sx12e.mongodb.net/?retryWrites=true&w=majority&appName=Advanced-Backend"
      )
      .then(() => console.log("Connected DB"));

    // app.listen(PORT, () =>
    //   console.log(`Listening on - http://localhost:${PORT}`)
    // );
  } catch (error) {
    console.log(`Error connecting with DB: ${error}`);
  }
};

bootstrap();
