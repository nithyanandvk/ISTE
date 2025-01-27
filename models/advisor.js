const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdvisorSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String },
  role: { type: String, required: true },
  linkedin: { type: String },
  createdAt: { type: Date, default: Date.now }

});

const MainSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String },
  role: { type: String, required: true },
  linkedin: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const CoordinatorSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String },
  role: { type: String, required: true },
  linkedin: { type: String },
  createdAt: { type: Date, default: Date.now }

});

module.exports = {
  Advisor: mongoose.model("Advisor", AdvisorSchema),
  Main: mongoose.model("Main", MainSchema),
  Coordinator: mongoose.model("Coordinator", CoordinatorSchema),
};
