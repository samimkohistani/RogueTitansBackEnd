// DEPENDENCIES
// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 4949
// pull MONGODB_URL from .env
const { PORT = 4949, MONGODB_URL } = process.env;
// import express
const express = require("express");
// create application object
const app = express();
// import mongoose
const mongoose = require("mongoose");
// import middlware
const cors = require("cors");
const morgan = require("morgan");


// DATABASE CONNECTION
////////////////////////////////
// Establish Connection
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  