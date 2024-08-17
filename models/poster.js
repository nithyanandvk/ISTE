const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const posterSchema=new Schema({
    image: {
        url: String,
        filename: String,
    },
    createdAt: { type: Date, default: Date.now }
});

const Poster=mongoose.model("Poster",posterSchema);
module.exports=Poster;