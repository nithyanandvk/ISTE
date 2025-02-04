const YouTube = require("../models/youtube.js");
const NextEvent = require("../models/nextEvent.js");
const Gallery=require("../models/gallery.js");
const Poster=require("../models/poster.js");
const {Advisor} = require("../models/advisor.js");
const {Main} = require("../models/advisor.js");
const {Coordinator} = require("../models/advisor.js");

module.exports.about = (req, res) => {
  res.render("about.ejs");
};

module.exports.events = async (req, res) => {
  // const videos=await YouTube.find({});
  const videos = await YouTube.find().sort({ createdAt: -1 });
  const nextevent = await NextEvent.find({});
  const posters=await Poster.find({}).sort({ createdAt: -1 });;
  // console.log(nextevent);
  // console.log(videos);
  res.render("events.ejs", { videos, nextevent ,posters});
};

module.exports.gallery = async(req, res) => {
  const gallery=await Gallery.find({});  
  res.render("gallery.ejs",{gallery});
};

module.exports.ecstasy = async(req, res) => { 
  res.render("ecstasy.ejs");
};

module.exports.team = async (req, res) => {
  const advisors=await Advisor.find({});
  const mainMembers=await Main.find({});
  const coordinators=await Coordinator.find({});
  res.render("team.ejs",{advisors,mainMembers,coordinators});
};