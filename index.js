if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = 3000;

const path = require("path");
const methodOverride = require("method-override");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const ExpressError = require("./utils/ExpressError.js");

const passport = require("passport");
const LocalStrategy = require("passport-local");

const mongoose = require("mongoose");
// const MONGO_URL = "mongodb://127.0.0.1:27017/iste";
const MONGO_URL = process.env.ATLASDB_URL;

const admin = require("./models/admin.js");

const isteRouter = require("./routes/iste.js");
const adminRouter = require("./routes/admin.js");

const flash = require("connect-flash");

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

const session = require("express-session");
const MongoStore=require("connect-mongo");

const store = MongoStore.create({
  mongoUrl: MONGO_URL,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("ERROR IN MONGO SESSION STORE", err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, 
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(admin.authenticate()));

passport.serializeUser(admin.serializeUser());
passport.deserializeUser(admin.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use(function(req, res, next) {
  res.locals.currentRoute = req.path;
  next();
});

app.use("/", isteRouter);
app.use("/",adminRouter);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went Wrong!" } = err;
  console.log(message);
  res.status(statusCode).render("error.ejs", { message });
});

app.listen(port, () => {
  console.log(`listening on port number : ${port}`);
});
