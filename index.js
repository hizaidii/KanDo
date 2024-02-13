const express = require("express");
const app = express();
const path = require("path");
const PORT = 4444;
const bodyparser = require("body-parser");
const hbs = require("hbs");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const passport = require("passport");
const isLoggedIn = require("./middlewares/isLoggedIn");
require("dotenv").config();
const moment = require("moment");

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

// Session middleware configuration
app.use(
  session({
    secret: "hgsadjkhsa",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
  })
);
// --> Middlewares
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, "public")));
require("./utilities/passport");
app.use(passport.initialize());
app.use(passport.session());

// --> Routes
app.get("/", require("./routes/generalRoutes"));
app.get("/signup", require("./routes/generalRoutes"));
app.post("/signup", require("./routes/generalRoutes"));

// --> Passport Routes
app.post("/login", passport.authenticate("local", { failureRedirect: "/" }), require("./routes/generalRoutes"));
app.get("/auth/facebook", passport.authenticate("facebook"));
app.get("/auth/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/" }), function (req, res) {
  res.redirect("/app");
});
app.get("/auth/google", passport.authenticate("google", { scope: ["profile"] }));
app.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/" }), function (req, res) {
  res.redirect("/app");
});

// --> All APP routes mounted here
app.use("/app", isLoggedIn, require("./routes/appRoutes"));

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});
// --> Error Handling middleare
app.use((err, req, res, next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error", { error: err });
});

// --> HBS helper function
// Register a helper for date formatting
hbs.registerHelper("formatDate", function (dateString) {
  const date = moment(dateString);
  return date.format("MMM DD, YYYY - hh:mm A"); // Formats date as "Feb 06, 2024 - 11:47 PM"
});
// Defining a helper function to compare values
hbs.registerHelper("isEqual", function (a, b, options) {
  if (a === b) {
    return options.fn(this); // If values are equal, execute the block
  } else {
    return options.inverse(this); // If values are not equal, execute the else block
  }
});

// --> Database Connection
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    res.render("error");
  });

app.listen(PORT, () => {
  console.log(`http://localhost:` + PORT);
});
