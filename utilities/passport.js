const User = require("../models/users");
const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const FacebookStrategy = require("passport-facebook");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Local Strategy
passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      let user = await User.findOne({ username: username });
      if (!user) return done(null, false);
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) return done(err);
        if (result) return done(null, user);
        return done(null, false);
      });
    } catch (err) {
      if (err) return done(err);
    }
  })
);

// Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: "https://kan-do-rose.vercel.app/auth/facebook/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      console.log("Facebook Profile:", profile);
      try {
        let existingUser = await User.findOne({ FB_ID: profile.id });
        if (existingUser) return cb(null, existingUser);

        let user = await User.create({
          name: profile.displayName,
          FB_AccessToken: accessToken,
          FB_Name: profile.displayName,
          FB_ID: profile.id,
          boards: [
            {
              title: "First Board",
              swimlanes: [
                { title: "To Do", statusColor: "#ffbd61" },
                { title: "In Progress", statusColor: "#61d7ff" },
                { title: "Done", statusColor: "#98ff61" },
              ],
            },
          ],
        });
        return cb(null, user);
      } catch (err) {
        return cb(err);
      }
    }
  )
);

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.Google_ClientID,
      clientSecret: process.env.Google_SecretID,
      callbackURL: "https://kan-do-rose.vercel.app/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      // console.log(accessToken);
      // console.log(refreshToken);
      // console.log(profile);
      let user = await User.findOne({ Google_ID: profile.id });
      try {
        if (user) return cb(null, user);

        user = await User.create({
          name: profile.displayName,
          image_URL: profile.photos[0].value,
          Google_ID: profile.id,
          Google_Photo: profile.photos[0].value,
          Google_AccessToken: accessToken,
          Google_Name: profile.displayName,
          boards: [
            {
              title: "First Board",
              swimlanes: [
                { title: "To Do", statusColor: "#ffbd61" },
                { title: "In Progress", statusColor: "#61d7ff" },
                { title: "Done", statusColor: "#98ff61" },
              ],
            },
          ],
        });

        return cb(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    let user = await User.findOne({ _id: id });
    // console.log("User", user);
    if (!user) return done(null, false);
    return done(null, user);
  } catch (err) {
    done(err);
  }
});
