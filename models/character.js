const { default: mongoose } = require("mongoose");


const characterSchema = new mongoose.Schema({
    index: String,
    name: String,
    url: String
});


const character = mongoose.model("character", characterSchema);
module.exports = Content;

