const express = require("express");
require("dotenv").config();
const app = express();
const userRoute = require("./routes/routes");

const { PORT, MONGODB_URI, SESSION_SECRET } = process.env;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// initialize mongoose connection
const mongoose = require("mongoose");
module.exports.connection = mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// using connect-mongo and express-session to store user sessions which is used by passport for authentication
const MongoStore = require("connect-mongo");
const session = require("express-session");
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: MONGODB_URI,
    }),
  })
);

// initializing passport
const passport = require("passport");
require("./config/passport-config");
app.use(passport.initialize());
app.use(passport.session());

app.use("/", userRoute);

module.exports = app;
