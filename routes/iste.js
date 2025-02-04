const express = require("express");
const router = express.Router();

const isteController=require("../contollers/isteController.js");

router.get("/", isteController.about);

router.get("/events", isteController.events);

router.get("/gallery", isteController.gallery);

router.get("/team", isteController.team);

router.get("/ecstasy", isteController.ecstasy);

module.exports=router;