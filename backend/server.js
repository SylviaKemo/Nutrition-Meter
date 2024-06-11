require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const trackerRoutes = require("./routes/trackerRoutes");

const app = express(); // starts the express app

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend URL
  })
);

// app.use((req, res, next) => {
//   console.log(req.path, req.method);
//   next();
// });

app.use("/api/calorie-tracker", trackerRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    //  listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Connected to the db $ listening to port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
