const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gallerySchema = new Schema({
  url: { type: String, required: true },
});

const Gallery = mongoose.model("Gallery", gallerySchema);
module.exports = Gallery;