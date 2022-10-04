const { default: mongoose } = require("mongoose");

const characterSchema = new mongoose.Schema({
    name: String,
    image: String
});

const character = mongoose.model("character", characterSchema);

module.exports = Content;