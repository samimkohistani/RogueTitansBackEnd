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


  // Connection Events
mongoose.connection
.on("open", () => console.log("You are connected to mongoose"))
.on("close", () => console.log("You are disconnected from mongoose"))
.on("error", (error) => console.log(error));


// MODELS
////////////////////////////////
const characterSchema = new mongoose.Schema({
  index: String,
  name: String,
  url: String,
});

const character = mongoose.model("character", characterSchema);


// MiddleWare
////////////////////////////////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies

// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
    res.send("Tavern");
  });


  
// Character INDEX ROUTE
app.get("/character", async (req, res) => {
    try {
      // send all characters
      res.json(await character.find({}));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });


// CREATE ROUTE
app.post("/character", async (req, res) => {
    try {
      // send all characters
      res.json(await character.create(req.body));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });

  //DELETE ROUTE
app.delete("/character/:id", async (req, res) => {
    try {
      res.json(await character.findByIdAndRemove(req.params.id));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });

  //UPDATE ROUTE
app.put("/character/:id", async (req, res) => {
    try {
      res.json(
        await character.findByIdAndUpdate(req.params.id, req.body, { new: true })
      );
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });


  // LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));