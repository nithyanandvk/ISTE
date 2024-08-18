const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");

const adminController = require("../contollers/adminController.js");

const {upload} = require("../cloudConfig.js");

const {
    isLoggedIn,
    validatePoster,
    validateNextEvent,
    validateYouTube,
  } = require("../middleware.js");

router
    .route("/login")
    .get(adminController.getLoginForm)
    .post(
        passport.authenticate("local", {
            failureRedirect: "/login",
        }),
        adminController.submitLogin
    );

router
    .route("/addPoster")
    .get(isLoggedIn, adminController.getPosterForm)
    .post(
        isLoggedIn,
        upload.single("poster[image]"),
        validatePoster,
        wrapAsync(adminController.submitPoster)
    )

router
    .route("/addNextEvent")
    .get(isLoggedIn, adminController.getNextEventForm)
    .put(
        isLoggedIn,
        upload.single("nextEvent[image]"),
        validateNextEvent,
        wrapAsync(adminController.submitNextEvent)
    )

router
    .route("/addYouTubeVideo")
    .get(isLoggedIn, adminController.getYouTubeForm)
    .post(
        isLoggedIn,
        validateYouTube,
        wrapAsync(adminController.submitYouTube)
    )

module.exports = router;