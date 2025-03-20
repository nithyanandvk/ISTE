const mongoose = require("mongoose");
const galleryImages = require("./gallery.js");
const { advisors, mainMembers, coordinators } = require("./team.js");
const Gallery = require("../models/gallery.js");
const { Advisor } = require("../models/advisor.js");
const { Main } = require("../models/advisor.js");
const { Coordinator } = require("../models/advisor.js");

document.addEventListener("contextmenu", (event) => event.preventDefault());
document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && (event.key === "u" || event.key === "s" || event.key === "i")) {
    event.preventDefault();
  }
});



// const MONGO_URL = "mongodb://127.0.0.1:27017/iste";
const MONGO_URL = "mongodb+srv://istesvecchamps:istechampsMbuSvec@cluster0.1zz4sd4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initGallery = async () => {
  await Gallery.deleteMany({});
  await Gallery.insertMany(galleryImages);
  console.log("gallery was initialized");
};

initGallery();

const initAdvisors = async () => {
  await Advisor.deleteMany({});
  await Advisor.insertMany(advisors);
  console.log("advisory was initialized");
};

initAdvisors();

const initMain = async () => {
  await Main.deleteMany({});
  await Main.insertMany(mainMembers);
  console.log("main was initialized");
};

initMain();

const initCoordinators = async () => {
  await Coordinator.deleteMany({});
  await Coordinator.insertMany(coordinators);
  console.log("coordinators was initialized");
};

initCoordinators();