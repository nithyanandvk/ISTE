const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const youtubeSchema = new Schema({
  link: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const YouTube = mongoose.model("YouTube", youtubeSchema);
module.exports = YouTube;
