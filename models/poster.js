const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const posterSchema=new Schema({
    image: {
        url: String,
        filename: String,
    },
});

const Poster=mongoose.model("Poster",posterSchema);
module.exports=Poster;