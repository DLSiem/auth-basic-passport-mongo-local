const mongoose = require("mongoose");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  try {
    const { username, password } = req.body;
    const ifExist = await User.findOne({
      username: username,
    });
    if (ifExist) {
      return res.send(
        '<h1>Username already exists.</h1><p>Please <a href="/register">register</a> with another username</p>'
      );
    }
    const user = new User({
      username: username,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    });
    await user.save();
    return res.redirect("/login");
  } catch (error) {
    console.log(error);
    return res.send(
      '<h1>Something went wrong</h1><p>Please <a href="/register">register</a> again</p>'
    );
  }
};
