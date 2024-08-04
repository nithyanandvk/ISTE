const { posterSchema, nextEventSchema, youtubeSchema } = require("./Schema.js");

const ExpressError = require("./utils/ExpressError.js");

module.exports.isLoggedIn = (req, res, next) => {
  console.log(req.user);
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be logged in to ISTE");
    return res.redirect("/login");
  }
  next();
};

// module.exports.validatePoster = (req, res, next) => {
//   let { error } = posterSchema.validate(req.body);
//   if (error) {
//     let errMsg = error.details.map((el) => el.message).join(",");
//     throw new ExpressError(400, errMsg);
//   } else {
//     next();
//   }
// };

module.exports.validatePoster = (req, res, next) => {
  if (!req.file) {
    throw new ExpressError(400, "Image file is required");
  }
  next();
};

module.exports.validateNextEvent = (req, res, next) => {
  let { error } = nextEventSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.validateYouTube = (req, res, next) => {
  let { error } = youtubeSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};
