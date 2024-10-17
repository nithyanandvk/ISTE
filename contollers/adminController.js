const YouTube = require("../models/youtube.js");
const Poster = require("../models/poster.js");
const NextEvent = require("../models/nextEvent.js");

const { imagekit } = require("../cloudConfig.js");


module.exports.getLoginForm = (req, res) => {
  res.render("login.ejs");
};

module.exports.submitLogin = async (req, res) => {
  // res.send("I am admin");
  res.render("admin.ejs");
}

module.exports.getPosterForm = (req, res) => {
  res.render("poster.ejs");
};

module.exports.submitPoster = async (req, res, next) => {
  const result = await imagekit.upload({
    file: req.file.buffer,
    fileName: req.file.originalname,
    folder: '/posters',
  });
  
  req.file.imageKitResult = result;
  const poster = new Poster({
    image: {
      url: result.url,
      filename: req.file.originalname,
    }
  });

  await poster.save();
  res.redirect("/events");
};

module.exports.getNextEventForm = (req, res) => {
  res.render("nextevent.ejs");
};

module.exports.submitNextEvent = async (req, res, next) => {
  // const nextEvent = req.body;
  // console.log(nextEvent);
  // const event = await NextEvent.find({ _id: "6696a0b4b944aa84f1f04266" });
  const result = await imagekit.upload({
    file: req.file.buffer,
    fileName: req.file.originalname,
    folder: '/next',
  });

  let id = "6696a0b4b944aa84f1f04266";
  let nextEvent = await NextEvent.findByIdAndUpdate(id, {
    ...req.body.nextEvent,
  });
  await nextEvent.save();
  let url = result.url;
  let filename = req.file.originalname;
  nextEvent.image = { url, filename };
  await nextEvent.save();
  res.redirect("/events");
};

module.exports.getYouTubeForm = (req, res) => {
  res.render("youtube.ejs");
};

module.exports.submitYouTube = async (req, res, next) => {
  const newLink = new YouTube(req.body.youtube);
  await newLink.save();
  res.redirect("/events");
};

const newEvent = new NextEvent({
  title: "Poster Presentationnn",
  description:
    "Poster Presentation event is very very awesome event to be conducted at mohan babu university",
  image:
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  link: "https://docs.google.com/forms/d/e/1FAIpQLSdRZlWsNFMudw09vMzH5ydJERfMqDvXLHnBbU3hYEi9f-UCZA/closedform?pli=1",
  date: "2024-07-20",
  time: "10:00 AM",
  venue:"MNS"
});

// newEvent.save();