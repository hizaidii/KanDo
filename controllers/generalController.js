const User = require("../models/users");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

module.exports.getIndex = (req, res, next) => {
  if (req.user) return res.redirect("/app");
  res.render("index");
};

module.exports.getSignup = (req, res, next) => {
  if (req.user) return res.redirect("/app");
  res.render("signup");
};

module.exports.postSignup = async (req, res, next) => {
  const { name, username, password } = req.body;
  try {
    let user = await User.findOne({ username });
    if (!user) {
      let saltRounds = 10;
      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          // Store hash in your password DB.
          User.create({
            name,
            username,
            password: hash,
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
        });
      });
      res.redirect("/");
    } else {
      res.render("signup", {
        msg: "username already exists",
        name,
        username,
        password,
      });
    }
  } catch (err) {
    res.render("error", {
      err,
    });
  }
};

module.exports.postLogin = (req, res, next) => {
  res.redirect("/app");
};
