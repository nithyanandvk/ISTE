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

const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");

const passport = require("passport");
const LocalStrategy = require("passport-local");

const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/iste";
// const MONGO_URL = process.env.ATLASDB_URL;


const admin = require("./models/admin.js");

const isteRouter = require("./routes/iste.js");
const {
  isLoggedIn,
  validatePoster,
  validateNextEvent,
  validateYouTube,
} = require("./middleware.js");

const YouTube = require("./models/youtube.js");
const Poster = require("./models/poster.js");
const NextEvent = require("./models/nextEvent.js");

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

const multer = require("multer");
const { storage } = require("./cloudConfig.js");
const { url } = require("inspector");
const upload = multer({ storage });

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

const newEvent = new NextEvent({
  title: "Poster Presentationnn",
  description:
    "Poster Presentation event is very very awesome event to be conducted at mohan babu university",
  image:
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  link: "https://docs.google.com/forms/d/e/1FAIpQLSdRZlWsNFMudw09vMzH5ydJERfMqDvXLHnBbU3hYEi9f-UCZA/closedform?pli=1",
  date: "2024-07-20",
  time: "10:00 AM",
});

// newEvent.save();

app.use("/iste", isteRouter);

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/iste",
  }),
  async (req, res) => {
    // res.send("I am admin");
    res.render("admin.ejs");
  }
);

// app.get("/carousel", async(req, res) => {
//   let posters=await Poster.find({});
//   //console.log(posters);
//   res.render("carousel.ejs",{posters});
// });

app.get("/addPoster", isLoggedIn, (req, res) => {
  res.render("poster.ejs");
});

app.get("/addNextEvent", isLoggedIn, (req, res) => {
  res.render("nextevent.ejs");
});

app.get("/addYouTubeVideo", isLoggedIn, (req, res) => {
  res.render("youtube.ejs");
});

app.post(
  "/addPoster",
  isLoggedIn,
  upload.single("poster[image]"),
  validatePoster,
  wrapAsync(async (req, res, next) => {
    const poster=new Poster({image:{url:req.file.path,filename:req.file.originalname}});
    await poster.save();
    res.redirect("/addPoster");
  })
);

app.post(
  "/addYouTubeVideo",
  isLoggedIn,
  validateYouTube,
  wrapAsync(async (req, res, next) => {
    const newLink = new YouTube(req.body.youtube);
    await newLink.save();
    res.redirect("/iste/events");
  })
);

app.put(
  "/addNextEvent",
  isLoggedIn,
  upload.single("nextEvent[image]"),
  validateNextEvent,
  wrapAsync(async (req, res, next) => {
    // const nextEvent = req.body;
    // console.log(nextEvent);
    // const event = await NextEvent.find({ _id: "6696a0b4b944aa84f1f04266" });

    let id = "6696a0b4b944aa84f1f04266";
    let nextEvent = await NextEvent.findByIdAndUpdate(id, {
      ...req.body.nextEvent,
    });
    await nextEvent.save();
    let url = req.file.path;
    let filename = req.file.filename;
    nextEvent.image = { url, filename };
    await nextEvent.save();
    res.redirect("/iste/events");
  })
);



app.get("/images", async (req, res) => {
  try {
    const images = await Image.find();
    // res.json(images);
    res.render("images.ejs", { images });
    // res.redirect("/addPoster");
  } catch (error) {
    res.status(500).send(error);
  }
});

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went Wrong!" } = err;
  console.log(message);
  res.status(statusCode).render("error.ejs", { message });
});

app.listen(port, () => {
  console.log(`listening on port number ${port}`);
});
